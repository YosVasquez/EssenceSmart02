import React, { useState, useEffect } from 'react';
import { Bell, X, Package, Star, Tag, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'order' | 'stock' | 'promotion' | 'review';
  title: string;
  message: string;
  date: string;
  read: boolean;
  iconName: string;
}

const iconMap = {
  tag: Tag,
  package: Package,
  star: Star,
  alertCircle: AlertCircle,
};

const NotificationSystem: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      let loadedNotifications: Notification[] = [];
      
      try {
        const saved = localStorage.getItem(`notifications_${user.id}`);
        if (saved) {
          loadedNotifications = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
        loadedNotifications = [];
      }

      // Simulate new notifications if none exist
      if (loadedNotifications.length === 0) {
        const sampleNotifications: Notification[] = [
          {
            id: '1',
            type: 'promotion',
            title: '¡Nuevos Productos!',
            message: 'Descubre los últimos perfumes que llegaron',
            date: new Date().toISOString(),
            read: false,
            iconName: 'tag'
          },
          {
            id: '2',
            type: 'stock',
            title: 'Producto Disponible',
            message: 'Galaxy está en stock',
            date: new Date(Date.now() - 86400000).toISOString(),
            read: false,
            iconName: 'package'
          },
          {
            id: '3',
            type: 'review',
            title: 'Califica tu compra',
            message: 'Ayuda a otros clientes con tu opinión',
            date: new Date(Date.now() - 172800000).toISOString(),
            read: true,
            iconName: 'star'
          }
        ];
        
        loadedNotifications = sampleNotifications;
        try {
          localStorage.setItem(`notifications_${user.id}`, JSON.stringify(sampleNotifications));
        } catch (error) {
          console.error('Error saving notifications:', error);
        }
      }
      
      setNotifications(loadedNotifications);
    }
  }, [user]);

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    if (user) {
      try {
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updatedNotifications));
      } catch (error) {
        console.error('Error saving notifications:', error);
      }
    }
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    if (user) {
      try {
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updatedNotifications));
      } catch (error) {
        console.error('Error saving notifications:', error);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-essence-pink transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notificaciones</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              notifications.map(notification => {
                const IconComponent = iconMap[notification.iconName as keyof typeof iconMap] || AlertCircle;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <IconComponent className={`w-5 h-5 ${
                          notification.iconName === 'tag' ? 'text-essence-pink' :
                          notification.iconName === 'package' ? 'text-gray-600' :
                          notification.iconName === 'star' ? 'text-essence-pink' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-essence-pink hover:text-essence-pink-dark"
                              >
                                Marcar leída
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const allRead = notifications.map(n => ({ ...n, read: true }));
                  setNotifications(allRead);
                  if (user) {
                    try {
                      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(allRead));
                    } catch (error) {
                      console.error('Error saving notifications:', error);
                    }
                  }
                }}
                className="w-full text-sm text-essence-pink hover:text-essence-pink-dark transition-colors"
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
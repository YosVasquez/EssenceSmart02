import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  userHelpful: string[];
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    try {
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
      setReviews(savedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    }
  }, [productId]);

  const saveReviews = (updatedReviews: Review[]) => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  const submitReview = () => {
    if (!user || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
      userHelpful: []
    };

    const updatedReviews = [review, ...reviews];
    saveReviews(updatedReviews);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const markHelpful = (reviewId: string) => {
    if (!user) return;

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        const hasMarked = review.userHelpful.includes(user.id);
        return {
          ...review,
          helpful: hasMarked ? review.helpful - 1 : review.helpful + 1,
          userHelpful: hasMarked 
            ? review.userHelpful.filter(id => id !== user.id)
            : [...review.userHelpful, user.id]
        };
      }
      return review;
    });

    saveReviews(updatedReviews);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="w-6 h-6 mr-2 text-essence-pink" />
          Reseñas y Calificaciones
        </h3>
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-essence-pink text-white px-4 py-2 rounded-lg hover:bg-essence-pink-dark transition-colors"
          >
            Escribir Reseña
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-essence-pink mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <p className="text-gray-600">{reviews.length} reseña{reviews.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm font-medium w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && user && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-4">Escribir una reseña</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className={`p-1 ${newReview.rating >= rating ? 'text-essence-pink' : 'text-gray-300'}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentario
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essence-pink focus:border-transparent resize-none"
                placeholder="Comparte tu experiencia con este producto..."
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={submitReview}
                className="bg-essence-pink text-white px-4 py-2 rounded-lg hover:bg-essence-pink-dark transition-colors"
              >
                Publicar Reseña
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay reseñas aún. ¡Sé el primero en escribir una!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-essence-pink/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-essence-pink" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.userName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-essence-pink fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => markHelpful(review.id)}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    user && review.userHelpful.includes(user.id)
                      ? 'text-essence-pink'
                      : 'text-gray-500 hover:text-essence-pink'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
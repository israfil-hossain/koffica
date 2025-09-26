'use client';

import { useState } from 'react';
import { LuStar } from 'react-icons/lu';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

// Mock reviews data - in real app, fetch from backend
const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely love this coffee! The flavor notes are exactly as described - bright and floral with a clean finish. Perfect for my morning pour-over routine.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    author: 'Mike R.',
    rating: 4,
    comment: 'Great quality beans. The roast level is perfect and the aroma is amazing. Slightly pricey but worth it for special occasions.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    author: 'Emma L.',
    rating: 5,
    comment: 'This has become my go-to coffee. The packaging keeps it fresh and the flavor is consistently excellent. Highly recommend!',
    date: '2024-01-08',
    verified: false,
  },
  {
    id: '4',
    author: 'David K.',
    rating: 4,
    comment: 'Smooth and well-balanced. Great for both espresso and drip coffee. Will definitely order again.',
    date: '2024-01-05',
    verified: true,
  },
];

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: '',
  });

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    mockReviews.filter(review => review.rating === rating).length
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, submit to backend
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', author: '' });
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <LuStar
            key={index}
            fill={index < rating ? "#e7d393" : "transparent"}
            className={`${index < rating ? "text-yellow-400" : "text-gray-500"} ${sizeClasses[size]}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Customer Reviews</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), 'lg')}
            <p className="text-gray-400 mt-2">
              Based on {mockReviews.length} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-8">{rating}★</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${mockReviews.length > 0 ? (ratingCounts[index] / mockReviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8">
                  {ratingCounts[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="mt-6 bg-yellow-600 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="p-1"
                  >
                    <LuStar
                      fill={rating <= newReview.rating ? "#e7d393" : "transparent"}
                      className={`w-6 h-6 ${rating <= newReview.rating ? "text-yellow-400" : "text-gray-500"} hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Share your thoughts about this coffee..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-yellow-600 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-700 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Reviews ({mockReviews.length})</h4>
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium text-white">{review.author}</span>
                  {review.verified && (
                    <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                      Verified Purchase
                    </span>
                  )}
                </div>
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Icon } from './Icon';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
  }

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Icon key={`full-${i}`} name="star" className={`${sizeClasses[size]} text-yellow-400`} />
      ))}
      {/* Note: Half star icon is not available, so we'll skip it for simplicity */}
      {[...Array(emptyStars + (halfStar ? 1: 0))].map((_, i) => (
        <Icon key={`empty-${i}`} name="star" className={`${sizeClasses[size]} text-gray-500`} />
      ))}
    </div>
  );
};

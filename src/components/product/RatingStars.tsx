import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  interactive = false,
  onRate,
  className
}: RatingStarsProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;
          
          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate?.(starValue)}
              className={cn(
                'relative transition-all duration-200',
                interactive && 'hover:scale-110 cursor-pointer',
                !interactive && 'cursor-default'
              )}
              aria-label={`Rate ${starValue} out of ${maxRating}`}
            >
              {isPartial ? (
                <div className="relative">
                  <Star className={cn(sizeClasses[size], 'text-muted-foreground/30')} />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                    <Star className={cn(sizeClasses[size], 'fill-yellow-400 text-yellow-400')} />
                  </div>
                </div>
              ) : (
                <Star
                  className={cn(
                    sizeClasses[size],
                    isFilled
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30',
                    interactive && 'hover:text-yellow-300'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={cn('font-medium text-foreground', textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;

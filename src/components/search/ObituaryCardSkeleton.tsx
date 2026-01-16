import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ObituaryCardSkeletonProps {
  index?: number;
}

const ObituaryCardSkeleton = ({ index = 0 }: ObituaryCardSkeletonProps) => {
  return (
    <Card
      className="flex flex-col bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-lg border border-border/40 shadow-md rounded-2xl overflow-hidden animate-fade-in"
      style={{ 
        animationDelay: `${index * 0.05}s`,
        minHeight: '520px',
        maxHeight: '520px',
      }}
    >
      {/* Image skeleton - 240px height */}
      <Skeleton className="h-[240px] w-full rounded-none" />
      
      {/* Content skeleton */}
      <div className="flex-1 flex flex-col p-5 space-y-3">
        {/* Name skeleton */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Date badge skeleton */}
        <Skeleton className="h-7 w-32 rounded-full" />
        
        {/* Location badge skeleton */}
        <Skeleton className="h-7 w-40 rounded-full" />
        
        {/* Source badge skeleton */}
        <Skeleton className="h-6 w-28 rounded-md" />
        
        {/* Biography skeleton - multiple lines */}
        <div className="flex-1 space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* Button skeleton */}
        <div className="pt-4 mt-auto border-t border-primary/10">
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </Card>
  );
};

export default ObituaryCardSkeleton;

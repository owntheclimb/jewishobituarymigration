import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  );
}

export function ObituaryCardSkeleton() {
  return (
    <div className="flex flex-col bg-background border border-border/40 rounded-2xl overflow-hidden" style={{ minHeight: '760px' }}>
      {/* Image skeleton */}
      <Skeleton className="h-[480px] w-full rounded-none" />

      {/* Content skeleton */}
      <div className="flex-1 flex flex-col p-5 space-y-3">
        {/* Name */}
        <Skeleton className="h-6 w-3/4" />

        {/* Date badge */}
        <Skeleton className="h-8 w-40 rounded-full" />

        {/* Location badge */}
        <Skeleton className="h-8 w-32 rounded-full" />

        {/* Source badge */}
        <Skeleton className="h-6 w-24" />

        {/* Biography */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Button */}
        <div className="pt-4 border-t border-border/20">
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ObituaryCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-background border border-border/40 rounded-xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-5 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-background border border-border/40 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

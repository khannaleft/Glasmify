import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/10 animate-pulse"></div>
      <div className="mt-4">
        <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse mb-2"></div>
        <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse"></div>
        <div className="mt-4 flex items-center justify-between">
            <div className="h-8 w-1/3 rounded bg-white/10 animate-pulse"></div>
            <div className="h-4 w-1/4 rounded bg-white/10 animate-pulse"></div>
        </div>
        <div className="mt-4 h-10 w-full rounded-full bg-white/10 animate-pulse"></div>
      </div>
    </div>
  );
};

import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import type { Product } from '../../lib/types';
import { Icon } from './Icon';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-dashed border-white/20 bg-white/5">
        <Icon name="search" className="h-16 w-16 text-gray-500 mb-4" />
        <h3 className="text-2xl font-semibold text-white">No Products Found</h3>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

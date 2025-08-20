
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../lib/types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

import React from 'react';
import type { Product } from '../lib/types';
import { Icon } from './Icon';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onAddToCart }) => {
    
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };
    
  return (
    <div 
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:-translate-y-2"
        onClick={() => onProductClick(product)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-white">${product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCartClick}
            className="flex items-center justify-center rounded-full bg-brand-accent p-3 text-white transition-transform duration-300 hover:scale-110 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon name="cartPlus" className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};
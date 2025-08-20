
import React from 'react';
import type { Product } from '../lib/types';
import { Icon } from './Icon';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-full max-w-4xl rounded-2xl border border-white/20 bg-slate-800/50 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/20 hover:text-white"
          aria-label="Close product details"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full rounded-t-2xl object-cover md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <span className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-accent">{product.category}</span>
            <h2 className="mb-4 text-3xl font-bold text-white">{product.name}</h2>
            <p className="mb-6 flex-grow text-gray-300">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
              <button 
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                <Icon name="cartPlus" className="h-5 w-5"/>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
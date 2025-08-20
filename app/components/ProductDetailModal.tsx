import React from 'react';
import Image from 'next/image';
import type { Product } from '../../lib/types';
import { Icon } from './Icon';
import { StarRating } from './StarRating';
import { useCart, useToast } from '../../lib/hooks';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (!product) return null;
  
  const handleAddToCart = () => {
    addToCart(product);
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-slate-800/80 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/20 hover:text-white"
          aria-label="Close product details"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>

        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>
        </div>
        
        <div className="flex flex-col p-6 sm:p-8">
            <span className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-accent">{product.category}</span>
            <h2 className="mb-2 text-3xl font-bold text-white">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-400">{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
            </div>

            <p className="mb-6 text-gray-300">{product.description}</p>
            
            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <Icon name="cartPlus" className="h-5 w-5"/>
                    <span>Add to Cart</span>
                  </button>
                </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Reviews</h3>
              <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                {product.reviews.map(review => (
                  <div key={review.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                       <h4 className="font-semibold text-white">{review.author}</h4>
                       <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-400">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2 text-right">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import Image from 'next/image';
import type { Product } from '../../lib/types';
import { Icon } from './Icon';
import { StarRating } from './StarRating';
import { useCart, useUser, useToast } from '../../lib/hooks';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, currentUser, openLoginModal } = useUser();
  const { addToast } = useToast();

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.name} added to cart!`, 'success');
  };
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
        openLoginModal();
        return;
    }
    toggleWishlist(product);
    addToast(isInWishlist(product.id) ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist!`, 'info');
  };
    
  return (
    <div 
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:-translate-y-2"
        onClick={() => onProductClick(product)}
    >
      <button 
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 rounded-full p-2 transition-colors duration-300 ${isInWishlist(product.id) ? 'text-red-500 bg-white/20' : 'text-white bg-black/30 hover:bg-white/20'}`}
        aria-label="Add to wishlist"
      >
        <Icon name="heart" className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
      </button>

      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-white">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviews.length})</span>
          </div>
        </div>
        <button 
            onClick={handleAddToCartClick}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent/80 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon name="cartPlus" className="h-5 w-5"/>
            <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

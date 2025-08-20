'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Cart } from '../components/Cart';
import { Icon } from '../components/Icon';
import { useCart } from '../../lib/hooks';
import type { Product } from '../../lib/types';


export default function WishlistPage() {
  const { wishlist, currentUser } = useUser();
  const { isCartOpen, toggleCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Dummy state for Header

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Your Wishlist</h1>
        
        {!currentUser ? (
             <div className="text-center py-20 rounded-2xl border border-dashed border-white/20 bg-white/5">
                <Icon name="heart" className="h-16 w-16 text-gray-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-white">Login to see your wishlist</h3>
                <p className="text-gray-400 mt-2">Create an account to save your favorite items.</p>
             </div>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/20 bg-white/5">
                <Icon name="heart" className="h-16 w-16 text-gray-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-white">Your wishlist is empty</h3>
                <p className="text-gray-400 mt-2">Click the heart icon on a product to save it here.</p>
                <Link href="/" className="mt-6 inline-block rounded-full bg-brand-accent px-6 py-2 font-semibold text-white transition-transform duration-300 hover:scale-105">
                    Find new favorites
                </Link>
            </div>
        )}
      </main>
      
       {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={toggleCart} 
      />

      <Footer />
    </div>
  );
}

// components/LoginModal.tsx
import React from 'react';
import { useUser } from '../../lib/hooks';
import { Icon } from './Icon';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useUser();

  if (!isLoginModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeLoginModal}
    >
      <div
        className="relative m-4 w-full max-w-sm rounded-2xl border border-white/20 bg-slate-800/80 p-8 shadow-2xl backdrop-blur-xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/20 hover:text-white"
          aria-label="Close login modal"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
        
        <Icon name="logo" className="h-16 w-16 text-brand-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Glasmify</h2>
        <p className="text-gray-400 mb-6">Sign in to save your cart, wishlist, and see your orders.</p>
        
        <button 
          onClick={login}
          className="w-full flex items-center justify-center gap-3 rounded-full bg-white py-3 text-lg font-bold text-slate-800 transition-transform duration-300 hover:scale-105"
        >
          <Icon name="google" className="h-6 w-6" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};
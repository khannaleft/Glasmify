
import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, searchQuery, setSearchQuery }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2 text-xl font-bold text-white">
              <Icon name="logo" className="h-8 w-8 text-brand-accent" />
              <span>Glasmify</span>
            </a>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-white/20 bg-white/10 py-2 pl-10 pr-4 text-white placeholder-gray-300 transition-all duration-300 focus:border-brand-accent/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon name="search" className="h-5 w-5 text-gray-300" />
                </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={onCartClick}
              className="relative rounded-full p-2 text-gray-200 transition-colors duration-300 hover:bg-white/20 hover:text-white"
              aria-label="Open shopping cart"
            >
              <Icon name="cart" className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

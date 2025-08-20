import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './Icon';
import { useCart } from '../../lib/hooks';
import { useUser } from '../../lib/hooks';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { cartItemCount, toggleCart } = useCart();
  const { currentUser, logout, openLoginModal } = useUser();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white">
              <Icon name="logo" className="h-8 w-8 text-brand-accent" />
              <span>Glasmify</span>
            </Link>
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
          
          <div className="flex items-center space-x-2">
            <Link href="/wishlist" className="relative rounded-full p-2 text-gray-200 transition-colors duration-300 hover:bg-white/20 hover:text-white" aria-label="View your wishlist">
                <Icon name="heart" className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleCart}
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

            <div className="relative">
              {currentUser ? (
                <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="rounded-full h-9 w-9 overflow-hidden border-2 border-transparent hover:border-brand-accent">
                    <Image src={currentUser.avatarUrl} alt={currentUser.name} width={36} height={36} className="object-cover"/>
                </button>
              ) : (
                <button onClick={openLoginModal} className="rounded-full p-2 text-gray-200 transition-colors duration-300 hover:bg-white/20 hover:text-white" aria-label="Login">
                    <Icon name="user" className="h-6 w-6" />
                </button>
              )}

              {isProfileMenuOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/20 bg-slate-800/80 backdrop-blur-lg shadow-xl"
                  onMouseLeave={() => setProfileMenuOpen(false)}>
                  <div className="p-2">
                    <p className="text-sm font-semibold text-white px-2 py-1">{currentUser.name}</p>
                    <p className="text-xs text-gray-400 px-2 mb-2">{currentUser.email}</p>
                    <div className="h-px bg-white/20 my-1"></div>
                    <button onClick={() => { logout(); setProfileMenuOpen(false); }} className="w-full text-left rounded-md px-2 py-1 text-sm text-red-400 hover:bg-white/10">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

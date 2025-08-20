import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '../../lib/types';
import { Icon } from './Icon';
import { useCart } from '../../lib/hooks';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image src={item.imageUrl} alt={item.name} fill sizes="80px" className="rounded-lg object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{item.name}</h4>
        <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-md border border-white/20 p-1 text-gray-300 hover:bg-white/10">-</button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-md border border-white/20 p-1 text-gray-300 hover:bg-white/10">+</button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.id)} className="mt-2 text-xs text-red-400 hover:text-red-300">Remove</button>
      </div>
    </div>
  );
}


export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, subtotal } = useCart();
  
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col border-l border-white/20 bg-slate-900/80 shadow-2xl backdrop-blur-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/20 p-6">
          <h2 id="cart-heading" className="text-2xl font-bold text-white">Your Cart</h2>
          <button onClick={onClose} className="rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/20 hover:text-white" aria-label="Close cart">
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <Icon name="cart" className="h-24 w-24 text-gray-600"/>
                <h3 className="mt-4 text-xl font-semibold text-white">Your cart is empty</h3>
                <p className="mt-2 text-gray-400">Looks like you haven't added anything yet.</p>
                <button 
                  onClick={onClose} 
                  className="mt-6 rounded-full bg-brand-accent px-6 py-2 font-semibold text-white transition-transform duration-300 hover:scale-105"
                >
                  Start Shopping
                </button>
            </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="divide-y divide-white/10">
                    {cartItems.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="border-t border-white/20 p-6">
                <div className="flex justify-between text-lg text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
                <Link href="/checkout" passHref>
                  <button onClick={onClose} className="mt-6 w-full rounded-full bg-brand-accent py-3 text-lg font-bold text-white transition-transform duration-300 hover:scale-105">
                      Proceed to Checkout
                  </button>
                </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

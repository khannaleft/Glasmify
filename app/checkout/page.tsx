'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart, useUser, useToast } from '../../lib/hooks';
import { Icon } from '../components/Icon';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { currentUser } = useUser();
  const { addToast } = useToast();
  const router = useRouter();

  const shippingCost = subtotal > 0 ? 5.00 : 0;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('You must be logged in to place an order.', 'error');
      return;
    }

    try {
      const orderData = {
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        items: cartItems,
        subtotal,
        shipping: shippingCost,
        taxes,
        total,
        status: 'placed'
      };

      // Store order in the user's subcollection for easy retrieval
      await addDoc(collection(db, 'users', currentUser.uid, 'orders'), orderData);
      
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error("Error placing order: ", error);
      addToast('There was an error placing your order.', 'error');
    }
  };

  return (
    <div className="min-h-screen">
       <header className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white w-fit">
              <Icon name="logo" className="h-8 w-8 text-brand-accent" />
              <span>Glasmify</span>
            </Link>
        </div>
       </header>
       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Checkout</h1>
        {cartItems.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/20 bg-white/5">
                <h2 className="text-2xl font-semibold text-white">Your cart is empty.</h2>
                <Link href="/" className="mt-4 inline-block rounded-full bg-brand-accent px-6 py-2 font-semibold text-white transition-transform duration-300 hover:scale-105">
                    Continue Shopping
                </Link>
            </div>
        ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="input-field" />
                <input type="text" placeholder="Last Name" required className="input-field" />
                <input type="email" placeholder="Email Address" defaultValue={currentUser?.email ?? ''} required className="input-field sm:col-span-2" />
                <input type="text" placeholder="Address" required className="input-field sm:col-span-2" />
                <input type="text" placeholder="City" required className="input-field" />
                <input type="text" placeholder="State / Province" required className="input-field" />
                <input type="text" placeholder="Zip / Postal Code" required className="input-field" />
              </div>
            </div>

            {/* Payment Details */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Payment Details</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Card Number" required className="input-field" />
                <input type="text" placeholder="Name on Card" defaultValue={currentUser?.name ?? ''} required className="input-field" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" required className="input-field" />
                  <input type="text" placeholder="CVC" required className="input-field" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4 border-b border-white/10 pb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                        <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md" />
                        <div>
                            <p className="text-white">{item.name} <span className="text-gray-400">x{item.quantity}</span></p>
                            <p className="text-gray-400">${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-white">${shippingCost.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span className="text-white">${taxes.toFixed(2)}</span></div>
              </div>
              <div className="h-px bg-white/20 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button type="submit" className="mt-6 w-full rounded-full bg-brand-accent py-3 text-lg font-bold text-white transition-transform duration-300 hover:scale-105">
                Place Order
              </button>
            </div>
          </div>
        </form>
        )}
      </main>
    </div>
  );
}

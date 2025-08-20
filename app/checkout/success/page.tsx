'use client';
import React from 'react';
import Link from 'next/link';
import { Icon } from '../../components/Icon';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="max-w-md mx-auto rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-xl">
            <Icon name="checkCircle" className="h-24 w-24 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white">Thank You!</h1>
            <p className="text-lg text-gray-300 mt-4">Your order has been placed successfully.</p>
            <p className="text-gray-400 mt-2">We've sent a confirmation email to your address. You can check the status of your order in your profile.</p>
            <Link href="/" passHref>
                <button className="mt-8 w-full rounded-full bg-brand-accent py-3 text-lg font-bold text-white transition-transform duration-300 hover:scale-105">
                    Continue Shopping
                </button>
            </Link>
        </div>
      </main>
    </div>
  );
}

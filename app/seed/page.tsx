'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { PRODUCTS } from '../../lib/constants';
import { useToast } from '../../lib/hooks';
import { Icon } from '../components/Icon';

export default function SeedPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSeeded, setIsSeeded] = useState(false);
    const { addToast } = useToast();

    const handleSeedDatabase = async () => {
        setIsLoading(true);
        try {
            const batch = db.batch();
            const productsCollection = db.collection('products');

            PRODUCTS.forEach((product) => {
                const docRef = productsCollection.doc(product.id);
                batch.set(docRef, product);
            });

            await batch.commit();
            
            addToast('Database seeded successfully!', 'success');
            setIsSeeded(true);
        } catch (error) {
            console.error("Error seeding database: ", error);
            addToast('Error seeding database. Check console.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
             <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="max-w-md mx-auto rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-xl">
                    <Icon name="logo" className="h-24 w-24 text-brand-accent mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white">Database Seeder</h1>
                    <p className="text-gray-300 mt-4 mb-6">
                        Click the button below to populate your Firestore database with the initial set of products. This is a one-time action.
                    </p>
                    <button
                        onClick={handleSeedDatabase}
                        disabled={isLoading || isSeeded}
                        className="w-full rounded-full bg-brand-accent py-3 text-lg font-bold text-white transition-transform duration-300 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? 'Seeding...' : (isSeeded ? 'Database Seeded!' : 'Seed Product Data')}
                    </button>
                    {isSeeded && (
                         <Link href="/" className="mt-4 inline-block w-full rounded-full bg-transparent border border-white/50 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-white/10">
                            Go to Homepage
                         </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
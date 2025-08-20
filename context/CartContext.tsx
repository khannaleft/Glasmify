// context/CartContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { Product, CartItem } from '../lib/types';
import { useUser } from '../lib/hooks';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, runTransaction } from 'firebase/firestore';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItemCount: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, openLoginModal } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ ...doc.data() as CartItem, id: doc.id }));
        setCartItems(items);
      });
      return () => unsubscribe();
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  const addToCart = async (productToAdd: Product) => {
    if (!currentUser) {
      openLoginModal();
      return;
    }
    const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productToAdd.id);
    
    try {
        await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(cartItemRef);
            if (!sfDoc.exists()) {
                transaction.set(cartItemRef, { ...productToAdd, quantity: 1 });
            } else {
                const newQuantity = sfDoc.data().quantity + 1;
                transaction.update(cartItemRef, { quantity: newQuantity });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!currentUser) return;
    const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productId);
    await deleteDoc(cartItemRef);
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!currentUser) return;
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productId);
      await setDoc(cartItemRef, { quantity: newQuantity }, { merge: true });
    }
  };
  
  const clearCart = () => {
    if (!currentUser) return;
    // This requires a batch write to delete all items, which is more advanced.
    // For simplicity, we'll delete one by one.
    cartItems.forEach(item => {
        const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', item.id);
        deleteDoc(cartItemRef);
    });
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart, cartItemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

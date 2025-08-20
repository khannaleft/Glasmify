// context/CartContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import type { Product, CartItem } from '../lib/types';
import { UserContext } from './UserContext';
import { db } from '../lib/firebase';

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
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('CartProvider must be used inside a UserProvider');
  }
  const { currentUser, openLoginModal } = userContext;
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const cartRef = db.collection('users').doc(currentUser.uid).collection('cart');
      const unsubscribe = cartRef.onSnapshot((snapshot) => {
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
    const cartItemRef = db.collection('users').doc(currentUser.uid).collection('cart').doc(productToAdd.id);
    
    try {
        await db.runTransaction(async (transaction) => {
            const sfDoc = await transaction.get(cartItemRef);
            if (!sfDoc.exists) {
                transaction.set(cartItemRef, { ...productToAdd, quantity: 1 });
            } else {
                const newQuantity = (sfDoc.data()?.quantity || 0) + 1;
                transaction.update(cartItemRef, { quantity: newQuantity });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!currentUser) return;
    const cartItemRef = db.collection('users').doc(currentUser.uid).collection('cart').doc(productId);
    await cartItemRef.delete();
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!currentUser) return;
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      const cartItemRef = db.collection('users').doc(currentUser.uid).collection('cart').doc(productId);
      await cartItemRef.set({ quantity: newQuantity }, { merge: true });
    }
  };
  
  const clearCart = () => {
    if (!currentUser) return;
    // This requires a batch write to delete all items, which is more advanced.
    // For simplicity, we'll delete one by one.
    cartItems.forEach(item => {
        const cartItemRef = db.collection('users').doc(currentUser.uid).collection('cart').doc(item.id);
        cartItemRef.delete();
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
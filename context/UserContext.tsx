// context/UserContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { User, Product } from '../lib/types';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';


interface UserContextType {
  currentUser: User | null;
  login: () => void;
  logout: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatarUrl: firebaseUser.photoURL,
        };
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
        const wishlistRef = db.collection('users').doc(currentUser.uid).collection('wishlist');
        const unsubscribe = wishlistRef.onSnapshot((snapshot) => {
            const items = snapshot.docs.map(doc => ({ ...doc.data() as Product, id: doc.id }));
            setWishlist(items);
        });
        return () => unsubscribe();
    } else {
        setWishlist([]);
    }
  }, [currentUser]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        closeLoginModal();
    } catch (error) {
        console.error("Authentication Error: ", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const toggleWishlist = async (product: Product) => {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    const wishlistItemRef = db.collection('users').doc(currentUser.uid).collection('wishlist').doc(product.id);
    if (isInWishlist(product.id)) {
        await wishlistItemRef.delete();
    } else {
        await wishlistItemRef.set(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };
  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <UserContext.Provider value={{ currentUser, login, logout, wishlist, toggleWishlist, isInWishlist, isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
    </UserContext.Provider>
  );
};
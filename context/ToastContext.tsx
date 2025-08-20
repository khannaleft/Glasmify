// context/ToastContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Toast } from '../app/components/Toast';

type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
};

interface ToastContextType {
  addToast: (message: string, type?: ToastMessage['type']) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(t => t.filter(t_ => t_.id !== toast.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

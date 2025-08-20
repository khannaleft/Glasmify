// components/Toast.tsx
import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 2700);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: { bg: 'bg-green-500/80', icon: <Icon name="checkCircle" className="h-6 w-6 text-white" /> },
    error: { bg: 'bg-red-500/80', icon: <Icon name="close" className="h-6 w-6 text-white" /> },
    info: { bg: 'bg-blue-500/80', icon: <Icon name="cart" className="h-6 w-6 text-white" /> },
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-xl text-white transform transition-all duration-300 ${typeStyles[type].bg} ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
      {typeStyles[type].icon}
      <span>{message}</span>
    </div>
  );
};

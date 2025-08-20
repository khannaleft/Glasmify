
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons: { [key: string]: React.ReactNode } = {
    logo: (
        <svg fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M236,128a108.3,108.3,0,0,1-95.2,107.2,8,8,0,0,1-8.8-8.8V154.5a8,8,0,0,1,5.1-7.5,40,40,0,1,0-54.2,0,8,8,0,0,1,5.1,7.5v71.9a8,8,0,0,1-8.8,8.8A108,108,0,1,1,236,128Z"></path></svg>
    ),
    search: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    cart: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    cartPlus: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0zM12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    close: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return <>{icons[name] || null}</>;
};

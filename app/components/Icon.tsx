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
    heart: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
      </svg>
    ),
    star: (
      <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    user: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    checkCircle: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    google: (
      <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.83 2.17-4.82 2.17-5.82 0-9.5-4.82-9.5-9.8s3.68-9.8 9.5-9.8c3.33 0 5.39 1.48 6.58 2.58l-2.5 2.5c-.83-.79-1.9-1.58-3.99-1.58-3.67 0-6.23 3-6.23 6.23s2.56 6.23 6.23 6.23c2.48 0 3.99-1.12 4.28-2.96h-4.28v-3.28z" fill="currentColor"/>
      </svg>
    )
  };

  return <>{icons[name] || null}</>;
};
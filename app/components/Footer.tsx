import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center border-t border-white/10 pt-8">
          <p>&copy; {new Date().getFullYear()} Glasmify. All rights reserved.</p>
          <p className="text-sm mt-2">A modern ecommerce experience designed with Glass Morphism.</p>
        </div>
      </div>
    </footer>
  );
};

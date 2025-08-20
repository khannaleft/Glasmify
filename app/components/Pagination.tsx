import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-12">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-400 bg-white/5 border border-white/20 rounded-s-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-white/20 ${
                currentPage === page
                  ? 'text-white bg-brand-accent/80 border-brand-accent'
                  : 'text-gray-400 bg-white/5 hover:bg-white/10'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-white/5 border border-white/20 rounded-e-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

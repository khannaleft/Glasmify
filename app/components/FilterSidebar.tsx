import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, activeCategory, setActiveCategory, sortOption, setSortOption }) => {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="sticky top-24 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-3 py-1.5 rounded-md transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-brand-accent/80 text-white font-semibold'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Sort By</h3>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full appearance-none rounded-md border border-white/20 bg-white/10 py-2 px-3 text-white placeholder-gray-300 focus:border-brand-accent/50 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};

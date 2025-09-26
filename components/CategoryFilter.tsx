'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}

export default function CategoryFilter({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch || '');

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (categorySlug: string | undefined) => {
    updateFilters({ category: categorySlug });
  };

  const handleSortChange = (sort: string) => {
    updateFilters({ sort });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput || undefined });
  };

  const clearFilters = () => {
    setSearchInput('');
    router.push('/products');
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Search</h3>
        <form onSubmit={handleSearch} className="space-y-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search coffee..."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-600 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange(undefined)}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              !currentCategory
                ? 'bg-yellow-600 text-black'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category.slug.current)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                currentCategory === category.slug.current
                  ? 'bg-yellow-600 text-black'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
        <select
          value={currentSort || ''}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Default</option>
          <option value="name">Name A-Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Clear Filters */}
      {(currentCategory || currentSort || currentSearch) && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

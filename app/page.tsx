"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { FilterSidebar } from './components/FilterSidebar';
import { Pagination } from './components/Pagination';
import { LoginModal } from './components/LoginModal';
import type { Product } from '../lib/types';
import { useCart } from '../lib/hooks';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const { isCartOpen, toggleCart } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter and Sort State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('default');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]; // Create a new array to avoid mutating state

    // Filter by search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, products, activeCategory, sortOption]);
  
  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [activeCategory, sortOption, searchQuery]);


  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <main className="flex-1">
            <h1 className="text-4xl font-bold mb-8 text-white text-center lg:text-left">Modern Wears</h1>
            <ProductGrid 
              products={paginatedProducts} 
              onProductClick={handleProductClick}
              isLoading={isLoading}
            />
            {!isLoading && totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </main>
        </div>
      </div>
      
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={toggleCart} 
      />
      
      <LoginModal />
      
      <Footer />
    </div>
  );
};

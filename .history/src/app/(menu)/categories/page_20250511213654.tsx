'use client'
import React, { JSX, useState } from 'react';
import { categories } from '@/types/categories.enum';
import Link from 'next/link';

// Type definitions
type CategoryGroup = {
  letter: string;
  categories: string[];
};

const Categories = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Group categories alphabetically
  const groupedCategories = categories.reduce<Record<string, string[]>>((acc, category) => {
    // Get first letter of category (uppercase)
    const firstLetter = category.charAt(0).toUpperCase();
    
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    
    acc[firstLetter].push(category);
    return acc;
  }, {});

  // Convert to array and sort by letter
  const alphabeticalGroups: CategoryGroup[] = Object.keys(groupedCategories).sort().map(letter => ({
    letter,
    categories: groupedCategories[letter].sort()
  }));

  // Filter categories based on search term
  const filteredGroups: CategoryGroup[] = searchTerm 
    ? alphabeticalGroups.map(group => ({
        letter: group.letter,
        categories: group.categories.filter(cat => 
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(group => group.categories.length > 0)
    : alphabeticalGroups;

  // Toggle group expansion
  const toggleGroup = (letter: string): void => {
    if (expandedGroup === letter) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(letter);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">Categories</h1>
        <p className="text-center mt-2 text-gray-600 mb-8">Explore our wide range of categories</p>
        
        {/* Search input */}
        <div className="mb-8">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <div key={group.letter} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center px-4 py-5 sm:px-6 bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
                  onClick={() => toggleGroup(group.letter)}
                >
                  <h2 className="text-xl font-medium text-gray-900">{group.letter}</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">{group.categories.length} categories</span>
                    <svg 
                      className={`h-5 w-5 text-gray-500 transform ${expandedGroup === group.letter ? 'rotate-180' : ''} transition-transform duration-200`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {expandedGroup === group.letter && (
                  <ul className="divide-y divide-gray-200">
                    {group.categories.map((category, index) => (
                      <li key={index}>
                        <Link 
                          href={`/product/${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}
                          className="block hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <p className="text-sm font-medium text-blue-600 truncate">{category}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              No categories found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
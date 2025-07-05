import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import JustForYou from '../components/home/JustForYou';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const products = useSelector(store => store.productStore.products);

    // Get search term from URL
    const searchTerm = searchParams.get('search') || '';

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        priceRange: '',
        rating: '',
        sortBy: 'featured',
        searchTerm: searchTerm // Add search term to filters
    });

    const [filterOptions, setFilterOptions] = useState({
        categories: [],
        priceRanges: [],
        ratings: []
    });

    const [showAllCategories, setShowAllCategories] = useState(false);

    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = [...new Set(products.map(product => product.category))];
            const maxPrice = Math.max(...products.map(p => p.price));
            const priceRanges = generatePriceRanges(maxPrice);
            const ratings = ['4', '3', '2', '1'];

            setFilterOptions({
                categories: uniqueCategories,
                priceRanges,
                ratings
            });
        }
    }, [products]);

    useEffect(() => {
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.priceRange) params.priceRange = filters.priceRange;
        if (filters.rating) params.rating = filters.rating;
        if (filters.sortBy !== 'featured') params.sortBy = filters.sortBy;
        if (filters.searchTerm) params.search = filters.searchTerm;
        setSearchParams(params);
    }, [filters, setSearchParams]);

    // Update filters when search term changes in URL
    useEffect(() => {
        const newSearchTerm = searchParams.get('search') || '';
        if (newSearchTerm !== filters.searchTerm) {
            setFilters(prev => ({ ...prev, searchTerm: newSearchTerm }));
        }
    }, [searchParams.get('search')]);

    const generatePriceRanges = (maxPrice) => {
        const ranges = [];
        if (maxPrice > 200) ranges.push('Over $200');
        if (maxPrice > 100) ranges.push('$100 to $200');
        if (maxPrice > 50) ranges.push('$50 to $100');
        if (maxPrice > 25) ranges.push('$25 to $50');
        ranges.push('Under $25');
        return ranges.reverse();
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: '',
            rating: '',
            sortBy: 'featured',
            searchTerm: '' // Also clear search term
        });
        setShowAllCategories(false);
    };

    const toggleCategoryView = () => {
        setShowAllCategories(!showAllCategories);
    };

    const visibleCategories = showAllCategories
        ? filterOptions.categories
        : filterOptions.categories.slice(0, 5);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-72 shrink-0">
                    <div className="bg-base-100 p-6 rounded-lg shadow-sm sticky top-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary hover:underline"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* Search term display */}
                        {filters.searchTerm && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Search Results For:</h3>
                                <div className="bg-gray-100 px-3 py-2 rounded-md">
                                    "{filters.searchTerm}"
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Categories</h3>
                            <div className="space-y-2">
                                {visibleCategories.map(category => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`cat-${category}`}
                                            name="category"
                                            value={category}
                                            checked={filters.category === category}
                                            onChange={handleFilterChange}
                                            className="radio radio-primary radio-sm"
                                        />
                                        <label htmlFor={`cat-${category}`} className="ml-2 capitalize">
                                            {category.replace(/-/g, ' ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {filterOptions.categories.length > 5 && (
                                <button
                                    onClick={toggleCategoryView}
                                    className="text-primary mt-2 text-sm font-medium hover:underline"
                                >
                                    {showAllCategories ? 'See Less' : 'See More'}
                                </button>
                            )}
                        </div>

                        {/* Rest of your filter sections remain the same */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Price Range</h3>
                            <div className="space-y-2">
                                {filterOptions.priceRanges.map(range => (
                                    <div key={range} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`price-${range}`}
                                            name="priceRange"
                                            value={range}
                                            checked={filters.priceRange === range}
                                            onChange={handleFilterChange}
                                            className="radio radio-primary radio-sm"
                                        />
                                        <label htmlFor={`price-${range}`} className="ml-2">
                                            {range}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Customer Rating</h3>
                            <div className="space-y-2">
                                {filterOptions.ratings.map(rating => (
                                    <div key={rating} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`rating-${rating}`}
                                            name="rating"
                                            value={rating}
                                            checked={filters.rating === rating}
                                            onChange={handleFilterChange}
                                            className="radio radio-primary radio-sm"
                                        />
                                        <label htmlFor={`rating-${rating}`} className="ml-2">
                                            {rating} & Up
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    {/* Pass both filters and searchTerm to JustForYou */}
                    <JustForYou filters={filters} searchTerm={filters.searchTerm} />
                </main>
            </div>
        </div>
    );
};

export default Shop;
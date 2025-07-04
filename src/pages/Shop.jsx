import React, { useState, useEffect } from 'react';
import JustForYou from '../components/home/JustForYou';
import { useSelector } from 'react-redux';

const Shop = () => {
    const products = useSelector(store => store.productStore.products);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        rating: '',
        sortBy: 'featured',
    });

    const [filterOptions, setFilterOptions] = useState({
        categories: [],
        priceRanges: [],
        ratings: []
    });

    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = [...new Set(products.map(product => product.category))];
            const maxPrice = Math.max(...products.map(p => p.price));
            const priceRanges = generatePriceRanges(maxPrice);
            const ratings = ['4 & Up', '3 & Up', '2 & Up', '1 & Up'];

            setFilterOptions({
                categories: uniqueCategories,
                priceRanges,
                ratings
            });
        }
    }, [products]);

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
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-72 shrink-0">
                    <div className="bg-base-100 p-6 rounded-lg shadow-sm sticky top-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                                Clear all
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Categories</h3>
                            <div className="space-y-2">
                                {filterOptions.categories.map(category => (
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
                        </div>

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
                                            {rating}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            {filters.category ?
                                `${filters.category.replace(/-/g, ' ')} Products` :
                                'All Products'
                            }
                        </h1>
                        <div className="flex items-center">
                            <label htmlFor="sort" className="mr-2">Sort by:</label>
                            <select
                                id="sort"
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={handleFilterChange}
                                className="select select-bordered select-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Customer Rating</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>
                    </div>

                    <JustForYou filters={filters} />
                </main>
            </div>
        </div>
    );
};

export default Shop;
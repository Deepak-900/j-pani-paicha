import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const JustForYou = ({ filters = {} }) => {
    const navigate = useNavigate();
    const { products, loading } = useSelector(store => store.productStore);
    const [displayCount, setDisplayCount] = useState(10);
    const [localLoading, setLocalLoading] = useState(false);
    const dispatch = useDispatch();

    const parsePriceRange = (range) => {
        if (!range) return [0, Infinity];
        if (range === 'Under $25') return [0, 25];
        if (range === '$25 to $50') return [25, 50];
        if (range === '$50 to $100') return [50, 100];
        if (range === '$100 to $200') return [100, 200];
        if (range === 'Over $200') return [200, Infinity];
        return [0, Infinity];
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (filters.category) {
            result = result.filter(product =>
                product.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        // Price range filter
        if (filters.priceRange) {
            const [min, max] = parsePriceRange(filters.priceRange);
            result = result.filter(product => {
                const price = product.price || 0;
                return price >= min && (max === Infinity || price <= max);
            });
        }

        // Rating filter
        if (filters.rating) {
            const minRating = parseInt(filters.rating);
            result = result.filter(product => product.rating >= minRating);
        }

        // Sorting
        switch (filters.sortBy) {
            case 'price-low':
                return [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'price-high':
                return [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'rating':
                return [...result].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...result].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            default:
                return result;
        }
    }, [products, filters]);

    useEffect(() => {
        if (products.length === 0 && !loading) {
            setLocalLoading(true);
            dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
            fetch('https://dummyjson.com/products')
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products });
                })
                .catch(error => {
                    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
                })
                .finally(() => {
                    setLocalLoading(false);
                });
        }
    }, [dispatch, products.length, loading]);

    // Only reset display count when essential filters change
    useEffect(() => {
        setDisplayCount(10);
    }, [filters.category, filters.priceRange, filters.rating]);

    const handleCardClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handleLoadMore = () => {
        setDisplayCount(prev => {
            const newCount = prev + 10;
            return Math.min(newCount, filteredProducts.length);
        });
    };

    const handleShowLess = () => {
        setDisplayCount(10);
    };

    const visibleProducts = filteredProducts.slice(0, displayCount);

    return (
        <div className='bg-white py-4'>
            <div className='px-4 sm:px-6 py-2 flex flex-row justify-between items-center'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-800'>
                    {filters.category ?
                        `${filters.category
                            .replace(/-/g, ' ') // First replace hyphens with spaces
                            .split(' ')         // Split into words
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) //capitalized each word
                            .join(' ')} Products` : // join back with spaces
                        'Featured Products'
                    }
                </h1>

                <button type='button' onClick={() => navigate('/shop')} className=" btn btn-outline btn-primary text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4">
                    VIEW ALL
                </button>

            </div>

            {
                (localLoading || loading) ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-4 sm:gap-4 sm:px-6'>
                            {visibleProducts.length > 0 ? (
                                visibleProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="w-full overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                        onClick={() => handleCardClick(product.id)}
                                    >
                                        <div className="relative pb-[100%]">
                                            <img
                                                src={product.thumbnail || product.images?.[0]}
                                                alt={product.title}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {product.discountPercentage > 5 && (
                                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    {Math.round(product.discountPercentage)}% OFF
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-3">
                                            <div className="flex items-center mb-1">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg
                                                            key={star}
                                                            className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-gray-600 text-xs ml-1">
                                                    ({product.rating?.toFixed(1) || 0})
                                                </span>
                                            </div>

                                            <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                                                {product.title}
                                            </h3>

                                            <div className="flex flex-row items-center gap-2 flex-wrap">
                                                {product.discountPercentage && (
                                                    <span className="text-gray-500 line-through text-xs">
                                                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                                    </span>
                                                )}
                                                <span className="text-base font-bold text-gray-900">
                                                    ${product.price?.toFixed(2) || 'N/A'}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500">No products match your filters.</p>
                                </div>
                            )}
                        </div>

                        {filteredProducts.length > 0 && (
                            <div className='flex justify-center gap-3 my-5'>
                                {displayCount < filteredProducts.length ? (
                                    <button
                                        type='button'
                                        outline
                                        className="btn btn-outline btn-primary  text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4"
                                        onClick={handleLoadMore}
                                        disabled={localLoading}
                                    >
                                        {localLoading ? (
                                            <span className="loading loading-spinner loading-xs"></span>
                                        ) : (
                                            <>
                                                <FaChevronDown className='me-2' /> Load More
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        type='button'
                                        className="btn btn-outline btn-primary text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 bg-gray-300 text-gray-600 cursor-not-allowed"
                                        disabled
                                    >
                                        No More Products
                                    </button>
                                )}

                                {displayCount > 10 && (
                                    <Button
                                        type='button'
                                        outline
                                        className="btn btn-outline btn-primary text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4"
                                        onClick={handleShowLess}
                                    >
                                        <FaChevronUp className='me-2' /> SHOW LESS
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                )
            }
        </div >
    );
};

export default JustForYou;
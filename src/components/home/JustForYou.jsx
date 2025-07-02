import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const JustForYou = () => {
    const navigate = useNavigate();

    // const products = [
    //     {
    //         id: 1,
    //         title: "Running Shoes",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    //         price: 89.99,
    //         originalPrice: 120.00,
    //         rating: 5,
    //         reviews: 24,
    //         isNew: true
    //     },
    //     {
    //         id: 2,
    //         title: "Wireless Earbuds",
    //         image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117",
    //         price: 59.99,
    //         originalPrice: 79.99,
    //         rating: 4,
    //         reviews: 36,
    //         isNew: false
    //     },
    //     {
    //         id: 3,
    //         title: "Yoga Mat",
    //         image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
    //         price: 29.99,
    //         originalPrice: 39.99,
    //         rating: 4,
    //         reviews: 18,
    //         isNew: true
    //     },
    //     {
    //         id: 4,
    //         title: "Water Bottle",
    //         image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    //         price: 19.99,
    //         originalPrice: 24.99,
    //         rating: 5,
    //         reviews: 42,
    //         isNew: false
    //     },
    //     {
    //         id: 5,
    //         title: "Fitness Tracker",
    //         image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         rating: 4,
    //         reviews: 31,
    //         isNew: true
    //     },
    //     {
    //         id: 5,
    //         title: "Fitness Tracker",
    //         image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         rating: 4,
    //         reviews: 31,
    //         isNew: true
    //     },
    //     {
    //         id: 5,
    //         title: "Fitness Tracker",
    //         image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         rating: 4,
    //         reviews: 31,
    //         isNew: true
    //     },
    //     {
    //         id: 5,
    //         title: "Fitness Tracker",
    //         image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         rating: 4,
    //         reviews: 31,
    //         isNew: true
    //     }
    // ];


    const products = useSelector(store => store.productStore.products);
    const [length, setLength] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        if (products.length <= 0) {
            const url = 'https://dummyjson.com/products';
            const options = {
                method: 'GET',
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'SET_PRODUCTS', payload: data.products });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [dispatch, products.length]);
    console.log("Products in JustForYou:", products[8]);

    const handleCardClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className='bg-white py-4'>
            {/* Header Section */}
            <div className='px-4 sm:px-6 py-2 flex flex-row justify-between items-center'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-800'>Featured Products</h1>
                <Button
                    type='button'
                    outline
                    className="text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4"
                >
                    VIEW ALL
                </Button>
            </div>

            {/* Responsive Product Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-4 sm:gap-4 sm:px-6'>
                {products.length > 0 && products.slice(0, length).map((product) => (
                    <div
                        key={product.id}
                        className="w-full overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleCardClick(product.id)}
                    >
                        {/* Card Image */}
                        <div className="relative pb-[100%]">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            {product.isNew && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    New
                                </span>
                            )}
                        </div>

                        {/* Card Content */}
                        <div className="p-3">
                            <div className="flex items-center mb-1">
                                {/* Star Ratings */}
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

                                {/* Review Count */}
                                <span className="text-gray-600 text-xs ml-1">
                                    ({product.rating.toFixed(1) || 0})
                                </span>
                            </div>

                            <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                                {product.title}
                            </h3>

                            <div className="flex flex-row items-center gap-2">
                                {product.price && (
                                    <span className="text-gray-500 line-through text-xs">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-base font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center gap-3 my-5'>
                {length < products.length ? (
                    <Button
                        type='button'
                        outline
                        className="text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4"
                        onClick={() => setLength(length + 10)}
                    >
                        <FaChevronDown className='me-2' /> Load More
                    </Button>
                ) : (
                    <Button
                        type='button'
                        className="text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 bg-gray-300 text-gray-600 cursor-not-allowed"
                        disabled
                    >
                        No More Products
                    </Button>
                )}

                {length > 10 && (
                    <Button
                        type='button'
                        outline
                        className="text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4"
                        onClick={() => setLength(length - 10)}
                    >
                        <FaChevronUp className='me-2' /> SHOW LESS
                    </Button>
                )}
            </div>
        </div>
    );
};

export default JustForYou;
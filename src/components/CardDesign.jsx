import React from 'react';
import Button from './Button';

const CardDesign = () => {
    const products = [
        {
            id: 1,
            title: "Premium Running Shoes",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            price: 89.99,
            originalPrice: 120.00,
            rating: 5,
            reviews: 24,
            isNew: true
        },
        {
            id: 2,
            title: "Wireless Headphones",
            image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 149.99,
            originalPrice: 199.99,
            rating: 4,
            reviews: 36,
            isNew: false
        },
        // Add more products as needed
    ];

    return (
        <div className='bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-sm py-4'>
            {/* Header Section */}
            <div className='sticky top-0 z-10 bg-white px-3 py-3 flex flex-row justify-between items-center sm:border-none sm:relative sm:px-6 sm:py-4'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-800 items-center'>On Sale Now</h1>
                <Button
                    type='button'
                    outline
                    className="text-center py-2 text-sm sm:text-base whitespace-nowrap"
                >
                    SHOW ALL PRODUCTS
                </Button>
            </div>
            {/* Products Grid - Full width on mobile */}
            <div className='grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:p-6'>
                {products.map((product) => (
                    <div key={product.id} className="w-full overflow-hidden rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
                        {/* Card Image */}
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
                                }}
                            />
                            {product.isNew && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    New
                                </span>
                            )}
                        </div>

                        {/* Card Content - Compact on mobile */}
                        <div className="p-3 sm:p-4 flex-grow flex flex-col">
                            <div className="flex items-center mb-1 sm:mb-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < product.rating ? 'fill-current' : 'fill-gray-300'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-2xs sm:text-xs ml-1">({product.reviews})</span>
                            </div>

                            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                                {product.title}
                            </h3>

                            <div className="mt-auto pt-1 sm:pt-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        {product.originalPrice && (
                                            <span className="text-gray-500 line-through mr-1 sm:mr-2 text-2xs sm:text-sm">
                                                ${product.originalPrice.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-base sm:text-lg font-bold text-gray-900">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <Button
                                        className="  text-2xs sm:text-sm font-medium rounded-full px-2 py-1 sm:px-3 sm:py-1.5 transition-colors duration-300" outline
                                        aria-label={`Add ${product.title} to cart`}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardDesign;
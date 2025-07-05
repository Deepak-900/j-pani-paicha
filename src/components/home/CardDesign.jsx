import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CardDesign = () => {
    // Get products from Redux store
    const productState = useSelector(state => state.productStore || {});
    const { products = [], loading = false, error = null } = productState;

    const [randomProducts, setRandomProducts] = useState([]);
    const navigate = useNavigate();

    // console.log(randomProducts)

    // Function to shuffle array with Fisher-Yates algorithm
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Get or generate random products
    useEffect(() => {
        if (products.length > 0) {
            // Check if we have cached random products
            const cachedSelection = localStorage.getItem('cachedRandomProducts');
            const cachedTimestamp = localStorage.getItem('cachedRandomProductsTimestamp');
            const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours cache duration

            if (cachedSelection && cachedTimestamp) {
                const isCacheValid = (Date.now() - parseInt(cachedTimestamp)) < cacheDuration;

                if (isCacheValid) {
                    // Use cached products
                    setRandomProducts(JSON.parse(cachedSelection));
                    return;
                }
            }

            // Generate new random selection
            const shuffledProducts = shuffleArray(products);
            const selectedProducts = shuffledProducts.slice(0, 5);

            // Cache the new selection
            localStorage.setItem('cachedRandomProducts', JSON.stringify(selectedProducts));
            localStorage.setItem('cachedRandomProductsTimestamp', Date.now().toString());

            setRandomProducts(selectedProducts);
        }
    }, [products]);

    const handleCardClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Loading and error states
    if (loading) return <div className="text-center py-8">Loading products...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    if (!randomProducts.length && !loading) {
        return <div className="text-center py-8">No products available</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {
                randomProducts.map((product) => (
                    <div
                        key={product.id}
                        className="w-full overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleCardClick(product.id)}
                    >
                        {/* Product Image */}
                        <div className="relative pb-[100%]">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            {product.discountPercentage > 0 && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {Math.round(product.discountPercentage)}% OFF
                                </span>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="p-3">
                            <div className="flex items-center mb-1">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-xs ml-1">({product.rating.toFixed(1)})</span>
                            </div>

                            <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                                {product.title}
                            </h3>

                            <div className="flex flex-row items-center gap-2">
                                <span className="text-gray-500 line-through text-xs">
                                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                                </span>
                                <span className="text-base font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default CardDesign;
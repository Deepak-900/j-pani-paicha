import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategoryDesign = () => {
    const navigate = useNavigate();
    const products = useSelector((state) => state.productStore.products || []);

    const staticImages = [
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
    ];

    const uniqueCategories = [...new Set(products.map(product => product.category))]
        .slice(0, 6)
        .map(category => ({
            displayName: category.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            originalName: category
        }));

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className='bg-white mx-auto px-4 py-6 m-8 max-w-7xl'>
            <h1 className='text-lg sm:text-xl font-bold text-gray-800 mb-6'>Shop by categories</h1>

            {uniqueCategories.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6'>
                    {uniqueCategories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => handleCategoryClick(category.originalName)}
                            className="group relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden 
                                      transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer"
                        >
                            <figure className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                                <img
                                    src={staticImages[index % staticImages.length]}
                                    alt={category.displayName}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Available";
                                    }}
                                />
                            </figure>
                            <div className="p-3 text-center">
                                <h3 className="font-medium text-gray-800 text-sm sm:text-base">{category.displayName}</h3>
                                <p className="text-xs text-gray-500 mt-1">Shop Now</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No categories available</p>
                </div>
            )}
        </div>
    );
};

export default CategoryDesign;
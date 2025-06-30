import React from 'react';

const CategoryDesign = () => {
    const categories = [
        { id: 1, name: "Shoes", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 2, name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
        { id: 3, name: "Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" },
        { id: 4, name: "Home Decor", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba" },
        { id: 5, name: "Accessories", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" },
        { id: 6, name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" }
    ];

    return (
        <div className='bg-white mx-auto px-4 py-6 m-8'>
            <h1 className='text-lg sm:text-xl font-bold text-gray-800'>Shop by categories</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden 
                                  transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer"
                    >
                        <figure className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Available";
                                }}
                            />
                        </figure>
                        <div className="p-3 text-center">
                            <h3 className="font-medium text-gray-800 text-sm sm:text-base">{category.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">Shop Now</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDesign;
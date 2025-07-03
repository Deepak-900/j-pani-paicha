import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const ProductDetails = () => {

    const [selectedImage, setSelectedImage] = useState(0);


    let { id } = useParams()

    let product = useSelector(state => state.productStore.products.find(product => product.id === parseInt(id)))
    console.log(product)


    const dispatch = useDispatch();

    // handle cart addition
    const handleCartAddition = () => {
        let cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0], // Use the first image as the default
            quantity: 1,
            discountPercentage: product.discountPercentage,
        }
        dispatch({ type: 'ADD_TO_CART', payload: cartItem });
        console.log("Added to cart:", cartItem);
        Swal.fire({
            title: 'Added to Cart',
            text: `${product.title} has been added to your cart.`,
            icon: 'success',
        })
    }


    // Calculate discount properly
    const discountDecimal = Number(product.discountPercentage); // Ensure it's a number
    const discountedPrice = product.price * (1 - discountDecimal / 100);

    const stars = Array(5).fill(0).map((_, i) => (
        <input
            key={i}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            disabled
            checked={i < Math.round(product.rating)}
        />
    ));
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Product Images */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-96 object-contain rounded-lg"
                            />
                            <div className="flex mt-4 space-x-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-gray-200'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-sm text-gray-500">{product.brand}</span>
                                    <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
                                </div>

                                {
                                    Number(product.stock) > 0 ? (
                                        <div className="badge badge-primary badge-lg">
                                            In stock
                                        </div>
                                    ) : (
                                        <div className="badge badge-error badge-lg">
                                            Out of Stock
                                        </div>
                                    )
                                }

                            </div>

                            <div className="mt-4 flex items-center">
                                <div className="rating rating-sm">
                                    {stars}
                                </div>
                                <span className="text-gray-500 ml-2">{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
                            </div>

                            {/* Display pricing */}
                            <div className="mt-6">
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                    {product.discountPercentage > 0 && (
                                        <>
                                            <span className="ml-2 text-lg text-gray-500 line-through">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="ml-2 text-lg font-semibold text-green-600">
                                                {product.discountPercentage}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                            </div>

                            <div className="divider"></div>

                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Description</h2>
                                <p className="text-gray-600 mt-2">{product.description}</p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold">Key Features</h2>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                                    <li>Fruity fragrance with mango and jasmine notes</li>
                                    <li>Youthful and vibrant scent</li>
                                    <li>3 year warranty</li>
                                    <li>Eau de parfum concentration</li>
                                </ul>
                            </div>


                            <div className="mt-8">
                                <button className="btn btn-primary flex-1 w-contain" onClick={handleCartAddition}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>

                            <div className="mt-6 text-sm text-gray-500">
                                <p><span className="font-medium">SKU:</span> {product.sku}</p>
                                <p><span className="font-medium">Category:</span> {product.category}</p>
                                <p><span className="font-medium">Shipping:</span> {product.shippingInformation}</p>
                                <p><span className="font-medium">Return Policy:</span> {product.returnPolicy}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="tabs">
                        <a className="tab tab-lifted tab-active">Details</a>
                        <a className="tab tab-lifted">Specifications</a>
                        <a className="tab tab-lifted">Reviews</a>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Product Information</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Brand:</span> {product.brand}</p>
                                    <p><span className="font-medium">Weight:</span> {product.weight} oz</p>
                                    <p><span className="font-medium">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm</p>
                                    <p><span className="font-medium">Warranty:</span> {product.warrantyInformation}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Fragrance Notes</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                                        <span>Top Notes: Mango, Mandarin Orange</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-pink-300 mr-2"></div>
                                        <span>Middle Notes: Jasmine, Orange Blossom</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-amber-700 mr-2"></div>
                                        <span>Base Notes: Blonde Woods, Musk</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails
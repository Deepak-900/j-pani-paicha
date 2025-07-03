import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {

    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cartStore.card_items)

    // State to track quantities
    const [items, setItems] = useState(
        cartItems.reduce((acc, item) => {
            const existingItem = acc.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.total = existingItem.quantity * existingItem.price;
            } else {
                acc.push({
                    ...item, total: item.quantity * item.price
                })
            } return acc;
        }, [])
    )

    // Handle quantity increase
    const handleIncreaseQuantity = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        total: item.price * (item.quantity + 1)
                    }
                    : item
            )
        );
    };

    // Handle quantity decrease
    const handleDecreaseQuantity = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                        total: item.price * (item.quantity - 1)
                    }
                    : item
            )
        );
    };

    // Calculate grand total
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg">Your cart is empty</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="p-4">
                        <table className="w-full mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden">
                            <thead className="bg-gradient-to-r from-gray-900 to-black text-white">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium">S.No</th>
                                    <th className="text-left py-4 px-6 font-medium">Image</th>
                                    <th className="text-left py-4 px-6 font-medium">Product</th>
                                    <th className="text-right py-4 px-6 font-medium">Price</th>
                                    <th className="text-center py-4 px-6 font-medium">Qty</th>
                                    <th className="text-right py-4 px-6 font-medium">Total</th>
                                    <th className="text-center py-4 px-6 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/30"
                                    >
                                        <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                        <td className="py-4 px-6">
                                            <div className="h-20 w-20 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full object-contain object-center"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-800">
                                            <p className="line-clamp-2">{item.title}</p>
                                            {item.color && (
                                                <span className="text-xs text-gray-500 mt-1 flex items-center">
                                                    <span
                                                        className="w-3 h-3 rounded-full mr-1 border border-gray-200"
                                                        style={{ backgroundColor: item.color }}
                                                    ></span>
                                                    {item.color}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right font-medium text-gray-800">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden w-fit mx-auto">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                    disabled={item.quantity <= 1}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:text-gray-300 transition-colors duration-200"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FiMinus className="text-sm" />
                                                </button>
                                                <span className="px-3 py-1 text-base font-medium text-gray-700 min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                                                    aria-label="Increase quantity"
                                                >
                                                    <FiPlus className="text-sm" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right font-medium text-gray-800">
                                            ${item.total.toFixed(2)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="p-2 rounded-full text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                                                    aria-label="Edit item"
                                                >
                                                    <FaEdit className="text-lg" />
                                                </button>
                                                <button
                                                    className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                    aria-label="Remove item"
                                                >
                                                    <FaTrashAlt className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                                <tr>
                                    <td colSpan="6" className="py-4 px-6 text-right text-lg font-medium text-gray-600">
                                        Subtotal:
                                    </td>
                                    <td className="py-4 px-6 text-right text-lg font-bold text-gray-900">
                                        ${items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td colSpan="6" className="py-4 px-6 text-right text-xl font-bold text-gray-800">
                                        Grand Total:
                                    </td>
                                    <td className="py-4 px-6 text-right text-xl font-bold text-gray-900">
                                        ${grandTotal.toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>


                </div>
            )
            }
        </div >
    )
}

export default Cart
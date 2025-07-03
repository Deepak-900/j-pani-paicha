import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Cart = () => {
    const cartItems = useSelector((state) => state.cartStore.card_items)

    // Combine items with the same product ID
    const combinedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id)
        if (existingItem) {
            existingItem.quantity += item.quantity
            existingItem.total = existingItem.price * existingItem.quantity
        } else {
            acc.push({ ...item, total: item.price * item.quantity })
        }
        return acc
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Shopping Cart</h1>

            {combinedItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg">Your cart is empty</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full mx-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left">S.No</th>
                                <th className="text-left">Image</th>
                                <th className="text-left">Product</th>
                                <th className="text-right">Price</th>
                                <th className="text-center">Qty</th>
                                <th className="text-right">Total</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {combinedItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-20 object-contain"
                                        />
                                    </td>
                                    <td className="font-medium">{item.title}</td>
                                    <td className="text-right">${item.price.toFixed(2)}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-right">${item.total.toFixed(2)}</td>
                                    <td className="flex justify-center space-x-2">
                                        <button
                                            className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                            onClick={() => console.log("Edit item", item.id)}
                                            aria-label="Edit item"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                            onClick={() => console.log("Remove item", item.id)}
                                            aria-label="Remove item"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-4">
                        <div className="text-xl font-bold">
                            Grand Total: $
                            {combinedItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
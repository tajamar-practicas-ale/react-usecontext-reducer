import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const Cart = ({ ref }) => {
    const { cart, addItem, removeItem, clearCart, decrementItem } = useContext(CartContext)

    // Calcular el total del carrito
    const totalPrice = cart.items.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    // Eliminar producto
    const handleRemove = (id) => {
        removeItem(id);
    };

    return (
        <div ref={ref} className="fixed top-20 right-0 mt-2 w-100 bg-white shadow-lg rounded p-4 z-50 border animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl text-black font-bold">Tu carrito</h2>
            </div>

            {cart.items.length === 0 ? (
                <p className="text-center text-gray-600">El carrito está vacío</p>
            ) : (
                <>
                    <ul className="max-h-64 overflow-y-auto space-y-3">
                        {cart.items.map((item) => (
                            <li key={item.id} className="flex gap-3 items-center">
                                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover" />
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm">Precio unitario: {item.precio.toFixed(2)} €</p>
                                    <p className="text-sm">Cantidad: {item.quantity}</p>
                                    <p className="text-sm font-semibold">Subtotal: {item.precio * item.quantity}.00 €</p>
                                </div>

                                <div className="flex gap-2">
                                    {/* Disminuir cantidad */}
                                    <button
                                        onClick={() => decrementItem(item.id)}
                                        className="px-2 py-1 cursor-pointer bg-yellow-500 text-white rounded"
                                    >
                                        −
                                    </button>

                                    {/* Aumentar cantidad */}
                                    <button
                                        onClick={() => {
                                            addItem(item);
                                        }}
                                        className="px-2 py-1 cursor-pointer bg-green-600 text-white rounded"
                                    >
                                        +
                                    </button>

                                    {/* Eliminar el producto */}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="px-2 py-1 cursor-pointer bg-red-500 text-white rounded"
                                    >
                                        {/* Eliminar */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="24" stroke-dashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" /></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M4 5h16"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M10 4h4M10 9v7M14 9v7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" /></path></g></svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 border-t mt-2">

                        {/* Total del carrito */}
                        <p className="font-bold text-right">Total: {totalPrice.toFixed(2)} €</p>

                        {/* Vaciar carrito */}
                        <button
                            onClick={() => {
                                clearCart();
                            }}
                            className="mt-2 w-full cursor-pointer bg-red-700 text-white py-2 rounded"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

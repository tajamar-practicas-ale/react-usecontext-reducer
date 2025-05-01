import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const Cart = () => {
    const { cart, addItem, removeItem, clearCart, decrementItem } = useContext(CartContext)

    // Calcular el total de precios
    const totalPrice = cart.items.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    // Eliminar producto
    const handleRemove = (id) => {
        removeItem(id);
    };

    return (
        <div className="absolute right-0 mt-2 w-100 bg-white shadow-lg rounded p-4 z-50 border animate-fade-in">
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
                                <img src={item.img} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm">Precio unitario: €{item.precio}</p>
                                    <p className="text-sm">Cantidad: {item.quantity}</p>
                                    <p className="text-sm font-semibold">Subtotal: €{item.precio * item.quantity}</p>
                                </div>

                                <div className="flex gap-2">
                                    {/* Aumentar cantidad */}
                                    <button
                                        onClick={() => {
                                            addItem(item);
                                        }}
                                        className="px-2 cursor-pointer bg-green-600 text-white rounded"
                                    >
                                        +
                                    </button>

                                    {/* Disminuir cantidad */}
                                    <button
                                        onClick={() => decrementItem(item.id)}
                                        className="px-2 cursor-pointer bg-yellow-500 text-white rounded"
                                    >
                                        −
                                    </button>

                                    {/* Eliminar el producto */}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="px-2 cursor-pointer bg-red-500 text-white rounded"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Total del carrito */}
                    <div className="pt-4 border-t mt-2">
                        <p className="font-bold text-right">Total: €{totalPrice.toFixed(2)}</p>
                        <button
                            onClick={() => {
                                clearCart();
                            }}
                            className="mt-2 w-full bg-red-700 text-white py-2 rounded"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

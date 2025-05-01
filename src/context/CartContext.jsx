import React, { createContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Estado inicial del carrito (sin localStorage)
// const initialState = {
//     items: [],
// };

// Estado inicial del carrito con localStorage
const getInitialCart = () => {
    const storedCart = localStorage.getItem('cart');

    // Si hay un carrito guardado en localStorage, lo parseamos y lo devolvemos. Si no, devolvemos un carrito vacío
    return storedCart ? JSON.parse(storedCart) : { items: [] };
};

// Reducer para manejar las acciones del carrito
function cartReducer(state, action) {
    switch (action.type) {
        // payload es el producto
        case 'ADD_ITEM':

            // Si el producto ya está en el carrito, incrementa cantidad
            {
                const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
                if (existingIndex !== -1) {
                    const updatedItems = [...state.items];
                    updatedItems[existingIndex].quantity += 1;
                    return { ...state, items: updatedItems };
                }
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };

        case 'DECREMENT_ITEM': {

            const index = state.items.findIndex(item => item.id === action.payload.id);

            // Si el producto está en el carrito, disminuye la cantidad
            if (index !== -1) {
                const updatedItems = [...state.items];
                if (updatedItems[index].quantity > 1) {
                    updatedItems[index].quantity -= 1;
                } else {
                    updatedItems.splice(index, 1); // elimina si la cantidad llega a 0
                    toast.error(`Producto eliminado del carrito`) // muestra la notificación cuando se elimina el producto al disminuir la cantidad
                }
                return { ...state, items: updatedItems };
            }
            return state;
        }

        case 'CLEAR_CART':
            localStorage.removeItem('cart'); // Elimina el carrito del localStorage
            return { items: [] }; // Retornar un carrito vacío
        // return initialState; // Reestablece el carrito a su estado inicial (sin localStorage)

        default:
            return state;
    }
}

// Crear el contexto
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCart); // No uses un valor inicial estático (undefined está bien). Ejecuta esta función para obtener el estado inicial.
    //const [state, dispatch] = useReducer(cartReducer, initialState); // Sin localStorage

    // Efecto para guardar el carrito en localStorage cada vez que cambia el estado
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(state));
        } catch (error) {
            console.error("Error guardando carrito:", error);
        }
    }, [state]);

    // Acciones disponibles
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
        // toast.success(`${item.name} agregado al carrito`) // Lo comento para que no muestre la notificación cuando aumento la cantidad desde el carrito
    }
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
        toast.error(`Producto eliminado del carrito`)
    }
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        toast.error(`Carrito vaciado`)
    }
    const decrementItem = (id) => dispatch({ type: 'DECREMENT_ITEM', payload: { id } });

    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart, decrementItem }}>
            {children}
        </CartContext.Provider>
    );
};

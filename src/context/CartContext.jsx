import React, { createContext, useReducer } from 'react';

// Estado inicial del carrito
const initialState = {
    items: [],
};

// Reducer para manejar las acciones del carrito
function cartReducer(state, action) {
    switch (action.type) {
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
                }
                return { ...state, items: updatedItems };
            }
            return state;
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
}

// Crear el contexto
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Acciones disponibles
    const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });
    const decrementItem = (id) => dispatch({ type: 'DECREMENT_ITEM', payload: { id } });

    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart, decrementItem }}>
            {children}
        </CartContext.Provider>
    );
};

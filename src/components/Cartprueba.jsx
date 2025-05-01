import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'

export const Cartprueba = () => {

    const { cart } = useContext(CartContext)

    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0); // acc se crea como argumento de reduce y tiene el valor inicial de 0

    useEffect(() => {
        localStorage.setItem('totalItems', JSON.stringify(totalItems))
    }, [totalItems])

    return (
        <div>
            <h1>{totalItems}</h1>
        </div>
    )
}

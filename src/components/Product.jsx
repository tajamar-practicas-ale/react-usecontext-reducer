import React, { useContext } from 'react';
import { CartContext } from './../context/CartContext';

const Product = ({ product }) => {
    const { addItem } = useContext(CartContext);

    return (
        <div>
            <h3>{product.name}</h3>
            <h5>{product.precio}</h5>
            <button onClick={() => addItem(product)}>Agregar al carrito</button>
        </div>
    );
};

export default Product;
import React, { useContext } from 'react';
import { CartContext } from './../context/CartContext';
import { toast } from 'react-hot-toast';

const Product = ({ product }) => {
    const { addItem } = useContext(CartContext);

    const addBtn = () => {
        addItem(product);
        toast.success(`${product.name} añadido al carrito`); // Notificación solo cuando se agrega el producto al carrito
    };

    return (
        <div className='border-2 border-red-700 rounded-lg p-4 flex flex-col'>
            <img src={product.img} alt="" />
            <div className='flex flex-col gap-2 pb-4'>
                <h3 className='font-bold text-xl text-center'>{product.name}</h3>
                <h5 className='text-center font-bold text-xl'>{product.precio}.00 €</h5>
            </div>
            <button
                className='bg-red-700 hover:bg-red-600 cursor-pointer p-4 text-white font-bold transition-all duration-200 ease-in-out'
                onClick={addBtn}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default Product;
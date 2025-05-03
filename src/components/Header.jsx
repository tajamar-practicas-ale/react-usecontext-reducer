import React, { useState, useEffect, useRef } from 'react'
import { Cart } from './Cart';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    // useRef(null) hacer que el dropdownRef sea un objeto mutable que se puede usar para referenciar el elemento del DOM del dropdown. 
    // Se inicializa como null porque aún no hay un elemento asociado a él.
    // useRef se usa para acceder a un elemento del DOM directamente sin necesidad de usar el estado de React. 
    // Esto es útil para manejar eventos como clics fuera del dropdown.
    const dropdownRef = useRef(null);

    // Cierra el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) { // current.contains es para verificar si el elemento está dentro del dropdown
                setIsOpen(false); // Cierra el dropdown
            }
        };
        // 'mousedown' puede ser reemplazado por "click" si se desea, es solo una referencia
        document.addEventListener('mousedown', handleClickOutside); // Agrega el evento al hacer click 
        return () => document.removeEventListener('mousedown', handleClickOutside); // Limpia el evento al desmontar el componente
    }, []);

    return (
        <>
            <header className='fixed top-0 w-full bg-red-700 text-amber-100 flex text-4xl font-bold p-4 shadow-md shadow-amber-900'>
                <div className='w-full flex justify-start'>
                    <a href="https://github.com/tajamar-practicas-ale/react-usecontext-reducer" className='flex items-center' target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" /></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="10;0" /></path></g></svg>
                    </a>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-3xl lg:text-4xl text-center shrink-0 font-bold'>
                        La casa del ajedrez
                    </h1>
                </div>
                <div className='w-full flex justify-end items-center' >
                    <span onClick={() => setIsOpen((prev) => !prev)} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fff" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z" /></svg>
                    </span>
                </div>
            </header>
            {isOpen && <Cart ref={dropdownRef} />}
        </>
    )
}

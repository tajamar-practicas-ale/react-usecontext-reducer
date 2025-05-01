import React from 'react'
import { Cartprueba } from './Cartprueba'

export const Header = () => {
    return (
        <header className='bg-red-700 text-amber-100 text-4xl font-bold text-center py-4 shadow-md shadow-amber-900'>
            <h1>
                La casa del ajedrez
            </h1>
            <Cartprueba />
        </header>
    )
}

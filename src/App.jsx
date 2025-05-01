import { useState } from 'react'
import './App.css'
import Product from './components/Product'
// import { Cart } from './components/Cart'
import { productos } from './data/productos'
import { Header } from './components/Header'

function App() {
  const [product, setProduct] = useState(productos)

  return (
    <>
      <Header />
      <main className='w-full pt-20 '>
        <h1 className='text-center font-bold text-3xl my-12'>Productos</h1>
        <section className='flex flex-col lg:grid lg:grid-cols-3 gap-4 w-[80%] mx-auto pb-10'>
          {
            product.map((item) => {
              return <Product key={item.id} product={item}></Product>
            }
            )
          }
        </section>
      </main>
    </>
  )
}

export default App

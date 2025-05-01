import { useState } from 'react'
import './App.css'
import Product from './components/Product'
// import { Cartprueba } from './components/Cartprueba'
import { productos } from './data/productos'
import { Header } from './components/Header'

function App() {
  const [product, setProduct] = useState(productos)

  return (
    <>
      <Header />
      <main className='w-full'>
        <h1 className='text-center font-bold text-3xl my-12'>Productos</h1>
        <section className='grid grid-cols-3 gap-4 w-full lg:w-[80%] mx-auto pb-10'>
          {
            product.map((item) => {
              return <Product key={item.id} product={item}></Product>
            }
            )
          }
        </section>
        {/* <Cartprueba /> */}
      </main>
    </>
  )
}

export default App

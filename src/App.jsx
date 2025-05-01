import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './components/Product'
import { Cartprueba } from './components/Cartprueba'
import { productos } from './data/productos'

function App() {
  const [count, setCount] = useState(0)
  const [product, setProduct] = useState(productos)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Prueba de cambios
      </p>
      {
        product.map((item) => {
          return <Product key={item.id} product={item}></Product>
        }
        )
      }
      <Cartprueba />
    </>
  )
}

export default App

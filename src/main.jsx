import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  // Comentar el modo estricto para evitar el doble renderizado de los componentes
  // <StrictMode>
  <CartProvider>
    <Toaster position="bottom-right" />
    <App />
  </CartProvider>
  // </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'  // ← Comenta esta línea
import FarfallaStore from './components/FarfallaStore'  // ← Usa tu componente

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <FarfallaStore />
  </StrictMode>,
)
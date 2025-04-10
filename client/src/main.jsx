import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./Pages/Cart/CartContext"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider> 
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);

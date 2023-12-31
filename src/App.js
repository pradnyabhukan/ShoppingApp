import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import { createContext, useState } from 'react';
import Cart from './components/Cart';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={{cart, setCart}}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products/:id" element={<Products/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;

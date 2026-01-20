//library
import { useState, useEffect } from "react";
import {Route, Routes, BrowserRouter } from "react-router";
import "react-awesome-button/dist/styles.css";
import confetti from "canvas-confetti";
//components
import "./App.css";
import Home from "./components/Pages/Home";
import Cart from "./components/Pages/Cart";
import Header from "./components/layout/Header";
import Logo from "./components/Pages/Logo";
import Footer from "./components/layout/Footer";

function App() {

  const [, setRefresh] = useState(false); // omitting first value beacuse we dont use it 
  // any where but need that just for react to re-render
  const[order, setOrder] = useState(false);
  const [totalCart, setTotalCart] = useState(() => {
    let count = 0;
    Object.keys(sessionStorage).forEach(key =>{
      if (key.startsWith('cartCount')){
        count += Number(sessionStorage.getItem(key)) || 0
      }  
    })
    return count;
  });
  const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cartItems')) || [])

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))

  }, [cartItems])

  useEffect(() => {
    if(order){
      const timer = setTimeout(() => {
        setOrder(false)
      },3000);
      return ()=> clearTimeout(timer)
    }
  }, [order])

  const addToCart = (itemId, name) => {
    let count = Number(sessionStorage.getItem(`cartCount${itemId}`)) || 0;
    window.sessionStorage.setItem(`cartCount${itemId}`, count + 1);

    setTotalCart(prev => prev + 1);
    setCartItems(prev => [...prev, name]);
    setRefresh((x) => !x);
  };

  const placeOrder = () => {
      Object.keys(sessionStorage).forEach(key => {
        if(key.startsWith('cartCount')){
          sessionStorage.setItem(key, 0)
        }
      })
    confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          shapes: ["text"],
          scalar: 1.5,
          ticks: 200,
          emojis: ["🎉"],
        });
    setCartItems([])
    setOrder(true);
    setTotalCart(0)
    setRefresh((x) => !x);
    }


  const removeFromCart = (itemId, name) => {
    let count = Number(sessionStorage.getItem(`cartCount${itemId}`)) || 0;
    {
      count > 0 &&
        window.sessionStorage.setItem(`cartCount${itemId}`, count - 1);
    }
    {totalCart>0 && setTotalCart(prev => prev - 1)}

    setCartItems(prev => {
    const index = prev.indexOf(name);
    if (index === -1) return prev; // important!

    return [
      ...prev.slice(0, index),
      ...prev.slice(index + 1)
    ];
  });

    setRefresh((x) => !x);
  };

  return (
      <div>
        <div className="app">
          <Header totalCart={totalCart}/>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Logo />}></Route>
              <Route path="/home" element={<Home addToCart={addToCart} removeFromCart={removeFromCart}/>}></Route>
              <Route path="/about" element={<Cart order = {order} cartItems={cartItems} placeOrder={placeOrder}/>}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
        </div>
  );
}

export default App;

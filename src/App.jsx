import "./App.css";
import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes, BrowserRouter } from "react-router";
import Home from "./components/Pages/Home";
import Cart from "./components/Pages/Cart";
import Contact from "./components/Pages/Contact";
import Header from "./components/layout/Header";
import Logo from "./components/Pages/Logo";
import "react-awesome-button/dist/styles.css";
import Footer from "./components/layout/Footer";
import { useState} from "react";
import confetti from "canvas-confetti";



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

    // if(!cartItems.includes(name)){
    setCartItems(prev => [...prev, name]);


    setRefresh((x) => !x);
  };
    console.log(cartItems, 'carttitems');

    const placeOrder = () => {

      Object.keys(sessionStorage).forEach(key => {
        if(key.startsWith('cartCount')){
          sessionStorage.setItem(key, 0)
        }
      })
      setCartItems([])

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          shapes: ["text"],
          scalar: 1.5,
          ticks: 200,
          emojis: ["🎉"],
        });
setOrder(true);
    setRefresh((x) => !x);
    setTotalCart(0)


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
  console.log(totalCart, "carttt");

  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Header totalCart={totalCart}/>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Logo />}></Route>

              <Route path="/home" element={<Home addToCart={addToCart} removeFromCart={removeFromCart}/>}></Route>
              <Route path="/about" element={<Cart order = {order} cartItems={cartItems} placeOrder={placeOrder}/>}></Route>
              <Route path="/contact" element={<Contact />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

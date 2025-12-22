
import hero from '../../assets/hero/hero-1.jpg'
import hero2 from '../../assets/hero/hero-2.png'
import price from '../../assets/hero/price-badge-yellow.png'
import Button from 'react-bootstrap/Button';
import { Link, NavLink, Route, Routes, BrowserRouter } from "react-router";




import '../../App.css'


const Logo = () => {
    return(
        <>
        <div className='hero-wrapper'>
        <img className='hero1' src={hero}></img>
        <img className='hero2' src={hero2}></img>
        <img className='price' src={price}></img>
        <p className='rate'>now at just 9.9$!</p>

  <Link to='/home'><Button className='button' variant="warning">Order now!</Button></Link>
  
      


</div>
        </>

        
    )
}

export default Logo;
import { Link, NavLink, Route, Routes, BrowserRouter } from "react-router";
import "../../styles/HeaderStyle.css";
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo/logo.png'
// import cart from '../../assets/cart.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';



const Header = ({totalCart}) => {
  return (
    <>
      <div className="navbar my-navbar">
        <Link className="navbar-brand" to="/"><img className = 'logo' src={logo}></img></Link>
        <Link className="navbar-brand" to="/home"> HOME </Link>
        <Link className="navbar-brand" to="/about"> <FontAwesomeIcon icon={faCartArrowDown} /> <p>{(totalCart >0) ? totalCart : null}</p></Link>
        {/* <Link className="navbar-brand" to="/contact"> <img src={cart}></img> </Link> */}
      </div>
    </>
  );
};

export default Header;

import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <ul className="navbar-menu">
        <Link href="#">Home</Link>
        <Link>About us</Link>
        <Link to="#" onClick={() => { setShowLogin(true); }}>Signin/Signup</Link>
        <Link>Admin Login</Link>
      </ul>
      
    </div>
  )
}

export default Navbar

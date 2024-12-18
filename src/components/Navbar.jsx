import React from 'react'
import logo from './logo.png'
import { Link } from 'react-router-dom'


export default function Navbar(){
  return (
    <div className='navbar'>
        <ul>
            <li><img className='logo' src={logo}/><Link to="/" className="nav-link">FavMovie</Link></li>
            <li><Link to="/list" className="nav-link">My List</Link></li>
        </ul>
    </div>  
  )
}

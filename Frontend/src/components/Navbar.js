import React, { memo, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../images/icon1.png';

const Navbar = ({isUserLogIn, handleLogIn}) => {
  useEffect(()=>{
    console.log('isUserLogIn :: '+isUserLogIn);
  },[]);
  return (
    <div className='nav-mainContainer'>
        <div className='nav-logoContainer'><img className='nav-logoImg' src={logo} alt="logo" /></div>
        <nav className={isUserLogIn ? 'nav-navbar' : 'nav-disableContent'}>
            <div className='nav-navItem'>Tracker</div>
            <div className='nav-navItem'>Categories</div>
            <div className='nav-navItem'>Roles</div>
        </nav>
        <div className='nav-buttonContainer'>
            <Link to="/" ><button className={isUserLogIn ? 'nav-disableContent' : 'nav-signinButton'}>Sign In</button></Link>
            <Link to="/registration" ><button className={isUserLogIn ? 'nav-disableContent' : 'nav-signupButton'}>Sign Up</button></Link>
            <Link to="/" ><button onClick={(e)=>{handleLogIn(false)}} className={!isUserLogIn ? 'nav-disableContent' : 'nav-logoutButton' }>Logout</button></Link>
        </div>
    </div>
    
  )
}

export default memo(Navbar);
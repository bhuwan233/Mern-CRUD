import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterationForm from '../components/Form';
import Login from '../components/Login';
import '../css/Home.css';
import Tracker from '../components/Tracker';

const Home = () => {

  const [isUserLogIn, setIsUserLogIn] = useState(false);
  
  function handleLogIn(param){
    if(param == false){
      window.sessionStorage.clear();
    }
    setIsUserLogIn(param);
  }

  useEffect(()=>{
    const jwt = window.sessionStorage.getItem('jwt');
    if(jwt){

      handleLogIn(true);
    }
  },[])
  return (
    
    <div className="homeContainer">
    <BrowserRouter>
    <Navbar isUserLogIn={isUserLogIn} handleLogIn={handleLogIn} />
        <Routes >
            <Route path="/registration" element={<RegisterationForm />}/>
            <Route index path="/" element={<Login handleLogIn={handleLogIn} />}/>
            <Route path="/tracker" element={<Tracker/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import '../css/Form.css';
import headerImg from '../images/heading-img.png';
import axios from 'axios';

const RegisterationForm = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const {data} = await axios.post(`http://localhost:5001/api/users`, {username, email, password});
        console.log(data);
        if(data.status == 'Success'){
            console.log(data);
            navigate("/");
        }
    }
return (
    <>
        <div className='form-maincontainer'>
            <div className='form-contianer'>
                <div className='form-col1'>
                    <div className='form-heading-row'>
                        <h1>Welcome to this website!</h1>
                    </div>
                    <div className='form-heading-img-container'>
                        <img className='form-heading-img' src={headerImg} alt="img" />
                    </div>
                </div>
                <div className='form-col'>
                    <form className='form' onSubmit={(event)=>{handleSubmit(event)}} >
                        <div className='form-heading'>Registeration Form</div>
                        <label htmlFor="username">User Name : </label> 
                        <input type='text' id='username' value={username} onChange={(event)=> setUserName(event.target.value)} placeholder='Username..'/>
                        <label htmlFor="email"> Email : </label> 
                        <input type='text' id='email' value={email} onChange={(event)=> setEmail(event.target.value)} placeholder='Email..'/>
                        <label htmlFor="password"> Password : </label> 
                        <input type='password' id='password' value={password} onChange={(event)=> setPassword(event.target.value)} placeholder='Password..'/>
                        <button className='form-button' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

export default RegisterationForm
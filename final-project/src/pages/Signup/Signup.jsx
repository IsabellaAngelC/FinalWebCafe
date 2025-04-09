import './Signup.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('datos enviados:', {username, password});
    };


  return (
    <div className='signup-container'>
      <h1>Signup Now</h1>
   

    <form onSubmit={handleSubmit} className = "signup-form">
        <div className='form-group'>
            <h2>Username</h2>
            <input
            type="text"
            placeholder='Ingresa tu usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />

        <div className='form-group'>
            <h2>Password</h2>
            <input
            type="password"
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        <div className='divider'></div>

        <button type='submit' className='signup-button'>Sign Up</button>
        </div>
        </div>
    </form> 

    <div className='signup-link'>
  <p>Already have an account? <span className='login-link' onClick={() => navigate('/')}>Login now</span></p>  
</div>

    </div>
  );
}

export default Signup;
import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui checo a ver si se envió esta wea
    console.log('datos enviados:', {username, password, rememberMe});

    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify({username, password}));
    }
    navigate('/home');
  };


    return (
      <div className='login-container'>
        <h1>Login Now</h1>



        <form onSubmit={handleSubmit} className = "login-form">
          <div className='form-group'>
            <h2>Username</h2>
            <input
            type="text"
            placeholder='Ingresa tu usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
          </div>

          <div className='form-group'>
            <h2>Password</h2>
            <input
            type="password"
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            </div>


            <div className='remember-me'>
              <input
              type="checkbox"
              id='remember'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor='remember-me'>Remember me</label>
              </div>

             
              <div className='divider'></div>

              <button type="submit" className='login-button' onClick={() => navigate('./home')}>Login</button>
        </form>


<div className='signup-link'>
  <p className='no-account'>Don't have an account? <span className='signup-link' onClick={() => navigate('/signup')}>Sign up now</span></p>  
</div>

 
      </div>
    );
};
  
export default Login; 
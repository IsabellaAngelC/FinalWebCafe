import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        alert('Usuario no encontrado');
        return;
      }

      
      if (rememberMe) {
        localStorage.setItem('userData', JSON.stringify({ email, password }));
      }

     
      if (email.endsWith('@icesi.edu.co')) {
        navigate('/home-admin'); 
      } else {
        navigate('/home'); 
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Now</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <h2>Email</h2>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="signup-link">
        <p className="no-account">
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/signup')}>
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
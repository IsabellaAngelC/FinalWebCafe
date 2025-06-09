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
    <div className="signup-wrapper">
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1580584126903-c17d4183043b?auto=format&fit=crop&w=600&q=80"
          alt="Login visual"
        />
        <div className="signup-caption">
          <h3>¡Bienvenido de nuevo!</h3>
          <p>Ingresa y sigue disfrutando de nuestro delicioso café.</p>
        </div>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <input
            type="email"
            placeholder="Correo institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Recordarme</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-button">Entrar</button>

          <p className="login-link">
            ¿No tienes cuenta?{' '}
            <span onClick={() => navigate('/signup')}>Regístrate</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

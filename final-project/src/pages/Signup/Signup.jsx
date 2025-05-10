import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        username: username,
      });

      console.log('Usuario registrado y datos guardados en Firestore');
      navigate('/'); // Redirigir al login o página principal
    } catch (err) {
      console.error('Error al registrar usuario:', err.message);
      setError(err.message); // Mostrar error al usuario
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign up Now</h1>

      <form onSubmit={handleSubmit} className="signup-form">
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
          <h2>Username</h2>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <div className="signup-link">
        <p className="si-account">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/')}>
            Login now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
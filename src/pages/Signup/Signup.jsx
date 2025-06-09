import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, 'users', user.uid), { uid: user.uid, email, username });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1510626176961-4bfb7d1fc6b0?auto=format&fit=crop&w=600&q=80"
          alt="Signup visual"
        />
        <div className="signup-caption">
          <h3>¡Únete a nuestra cafetería!</h3>
          <p>Disfruta del mejor café universitario todos los días.</p>
        </div>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Crear cuenta</h1>
          <input
            type="email"
            placeholder="Correo institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">Registrarme</button>
          <p className="login-link">¿Ya tienes cuenta? <span onClick={() => navigate('/')}>Inicia sesión</span></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

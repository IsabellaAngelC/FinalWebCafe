import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setUserData({
          username: user.displayName || "Usuario",
          email: user.email,
        });
      } else {
       
        setUserData(null);
      }
      setLoading(false);
    });

    
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      navigate('/'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (!userData) {
    return (
      <div className="container">
        <Navbar />
        <h1 className="not-logged-title">No hay una cuenta logueada</h1>
        <div className="auth-options">
          <p>Por favor inicia sesión o regístrate para acceder a tu perfil</p>
          <div className="auth-buttons">
            <button 
              onClick={() => navigate('/')}
              className="auth-button login-button"
            >
              Iniciar sesión
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="auth-button signup-button"
            >
              Registrarse
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Mi Perfil</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userData.username.charAt(0).toUpperCase()}
          </div>
          <h2>{userData.username}</h2>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Nombre de usuario:</span>
            <span className="detail-value">{userData.username}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Correo electrónico:</span>
            <span className="detail-value">{userData.email}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Cerrar sesión
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
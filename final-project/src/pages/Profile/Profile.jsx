import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './Profile.css'; // Archivo de estilos

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (!userData) {
    return (
      <div className="profile-container">
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
    <div className="profile-container">
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
          
          {/* No muestres la contraseña en producción */}
          <div className="detail-item">
            <span className="detail-label">Contraseña:</span>
            <span className="detail-value">••••••••</span>
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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css'; // Archivo de estilos

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del localStorage al cargar el componente
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      // Redirigir si no hay datos de usuario
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar localStorage y redirigir
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>; // O algún spinner
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
    </div>
  );
};

export default Profile;
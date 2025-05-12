import './NavBar.css';
import Logo from '../../assets/LogoBites.png';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email.endsWith('@icesi.edu.co')) {
        setIsAdmin(true); // Usuario con email de administrador
      } else {
        setIsAdmin(false); // Usuario normal o no logueado
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="Bites Logo" />
        </div>

        <div className="navbar-links">
          
          <a href={isAdmin ? '/home-admin' : '/home'}>Home</a>
          
          <a href={isAdmin ? '/solicitudes' : '/mispedidos'}>
            {isAdmin ? 'Solicitudes' : 'Mis pedidos'}
          </a>
          <a href="https://www.icesi.edu.co/servicios/contactenos/">Ayuda</a>
          <a href="/profile">Mi perfil</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
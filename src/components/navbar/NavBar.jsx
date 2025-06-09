import './NavBar.css';
import { FaHome, FaClipboardList, FaQuestionCircle, FaUserCircle, FaBars } from 'react-icons/fa';
import Logo from '../../assets/LogoBites.png';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email.endsWith('@icesi.edu.co')) {
        setIsAdmin(true); 
      } else {
        setIsAdmin(false); 
      }
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="Bites Logo" />
        </div>

        {/* Botón hamburguesa para mobile */}
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <a href={isAdmin ? '/home-admin' : '/home'}>
            <FaHome className="navbar-icon" /> Home
          </a>

          <a href={isAdmin ? '/solicitudes' : '/mispedidos'}>
            <FaClipboardList className="navbar-icon" />
            {isAdmin ? 'Solicitudes' : 'Mis pedidos'}
          </a>

          <a href="https://www.icesi.edu.co/servicios/contactenos/" target="_blank" rel="noopener noreferrer">
            <FaQuestionCircle className="navbar-icon" /> Ayuda
          </a>

          <a href="/profile">
            <FaUserCircle className="navbar-icon" /> Mi perfil
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

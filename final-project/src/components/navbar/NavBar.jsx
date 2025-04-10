import './NavBar.css'
import Logo from '../../assets/LogoBites.png'

function Navbar (){
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={Logo} alt="Bites Logo" />
          </div>
          
          <div className="navbar-links">
            <a href="/home">Home</a>
            <a href="/mispedidos">Mis pedidos</a>
            <a href="https://www.icesi.edu.co/servicios/contactenos/">Ayuda</a>
            <a href="/profile">Mi perfil</a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
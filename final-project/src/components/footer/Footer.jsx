import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <a href="#">Home</a>
        <a href="#">Nosotros</a>
        <a href="#">Políticas de Privacidad</a>
        <a href="#">Términos de Servicio</a>
        <a href="#">Ayuda</a>
      </nav>

      

      <p className="copyright">
        Copyright ©ICESI. All Rights Reserved.
      </p>

      <div className="language-selector">
        🌍
      </div>
    </footer>
  );
};

export default Footer;
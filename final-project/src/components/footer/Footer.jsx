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

      <div className="footer-logo">
        <img src="https://www.icesi.edu.co/calipostalessonoras/images/logo_icesi-01.png" alt="Bites Logo" />
      </div>

      <p className="copyright">
        Copyright © COGNOSPHERE. All Rights Reserved.
      </p>

      <div className="language-selector">
        🌍
      </div>
    </footer>
  );
};

export default Footer;
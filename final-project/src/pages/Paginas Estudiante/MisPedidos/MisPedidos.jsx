import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import './MisPedidos.css'

const MisPedidos = () => {
    const pedidosRedux = useSelector((state) => state.pedidos);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Combinar pedidos del estado global y localStorage
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
        setPedidos([...pedidosRedux, ...pedidosGuardados]);
      }, [pedidosRedux]); // Escucha cambios en pedidosRedux
    
    return (
        <div className="container">
      <Navbar />
      <h1>Mis Pedidos</h1>
      <div className="pedidos-container">
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <div key={index} className="pedido-item">
              <h2>{pedido.type}</h2>
              <p>Estudiante: {pedido.estudiante}</p>
              <p>Método de pago: {pedido.metodoPago}</p>
              {pedido.comprobante && (
                <img
                  src={pedido.comprobante}
                  alt="Comprobante"
                  className="pedido-imagen"
                />
              )}
            </div>
          ))
        ) : (
          <p>No tienes pedidos aún.</p>
        )}
      </div>
      <Footer />
    </div>
    );
}
export default MisPedidos;
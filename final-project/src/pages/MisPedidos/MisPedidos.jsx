import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './MisPedidos.css'

const MisPedidos = () => {
    const pedidos = useSelector((state) => state.pedidos);
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
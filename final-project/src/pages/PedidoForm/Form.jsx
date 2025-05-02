import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { agregarPedido } from '../../redux/pedidosSlice';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './Form.css';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pedido = location.state?.item || {}; // Recibe los datos del pedido

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el pedido con los detalles adicionales
    const nuevoPedido = {
      ...pedido,
      estudiante: e.target.estudiante.value,
      metodoPago: e.target.metodoPago.value,
      comprobante: e.target.comprobante.files[0], // Archivo subido
    };

    // Agregar el pedido al estado global
    dispatch(agregarPedido(nuevoPedido));

    // Redirigir a la página de "Mis Pedidos"
    navigate('/mispedidos');
  };

  return (
   
    <div className="form-container"> 
    <div className='nav-container'><Navbar /></div>
        
      <h1>Nuevo pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Almuerzo
          <input type="text" value={pedido.type || ''} readOnly />
        </label>
        <label>
          Estudiante
          <input type="text" name="estudiante" placeholder="Nombre del estudiante" required />
        </label>
        <label>
          Método de pago
          <select name="metodoPago" required>
            <option value="Efectivo">Efectivo</option>
            <option value="Nequi">Nequi</option>
          </select>
        </label>
        <label>
          Comprobante
          <input type="file" name="comprobante" />
        </label>
        <button type="submit">Confirmar Pedido</button>
      </form>
      <Footer />
    </div>
  );
}

export default Form;
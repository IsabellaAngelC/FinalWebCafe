import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import './Form.css';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state?.item || {}; // Recibe los datos del pedido

  // Obtener el usuario actualmente logueado desde Firebase Authentication
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pedido.adminEmail) {
    alert("No se pudo identificar la cafetería o administrador responsable del pedido.");
    return;
  }

    try {
      // Crear el pedido con los detalles adicionales
      const nuevoPedido = {
        ...pedido,
        estudiante: currentUser?.displayName || 'Usuario Anónimo', // Nombre del usuario logueado
        metodoPago: e.target.metodoPago.value,
        horaEntrega: e.target.horaEntrega.value, // Nueva hora seleccionada
        comprobante: e.target.comprobante.files[0]
          ? URL.createObjectURL(e.target.comprobante.files[0]) // Convertir archivo a URL
          : null,
        estado: 'Recibido', // Estado inicial del pedido
        createdAt: serverTimestamp(), // Marca de tiempo del pedido
        adminEmail: pedido.adminEmail,
      };

      // Guardar el pedido en Firebase
      const pedidosRef = collection(db, 'pedidos');
      await addDoc(pedidosRef, nuevoPedido);

      alert('Pedido enviado con éxito');
      navigate('/mispedidos'); // Redirigir a la página de "Mis Pedidos"
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error al enviar el pedido.');
    }
  };

  return (
    <div className="form-container">
      <div className="nav-container">
        <Navbar />
      </div>

      <h1>Nuevo pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Almuerzo
          <input type="text" value={pedido.type || ''} readOnly />
        </label>
        <label>
          Estudiante
          <input
            type="text"
            name="estudiante"
            value={currentUser?.displayName || 'Usuario Anónimo'}
            readOnly
          />
        </label>
        <label>
          Método de pago
          <select name="metodoPago" required>
            <option value="Efectivo">Efectivo</option>
            <option value="Nequi">Nequi</option>
          </select>
        </label>
        <label>
          Hora de entrega
          <select name="horaEntrega" required>
            <option value="11:00">11:00 a.m.</option>
            <option value="11:30">11:30 a.m.</option>
            <option value="12:00">12:00 p.m.</option>
            <option value="12:30">12:30 p.m.</option>
            <option value="13:00">1:00 p.m.</option>
            <option value="13:30">1:30 p.m.</option>
            <option value="14:00">2:00 p.m.</option>
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
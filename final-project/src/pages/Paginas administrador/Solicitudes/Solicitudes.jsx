import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import './Solicitudes.css';

const Solicitudes = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosRef = collection(db, 'pedidos');

    const unsubscribe = onSnapshot(pedidosRef, (querySnapshot) => {
      const fetchedPedidos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(fetchedPedidos);
    });

    return () => unsubscribe();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const pedidoRef = doc(db, 'pedidos', id);
      await updateDoc(pedidoRef, { estado: nuevoEstado });
      alert(`Estado actualizado a: ${nuevoEstado}`);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Solicitudes</h1>
      <div className="pedidos-container">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <h2>{pedido.type}</h2>
              <p>Estudiante: {pedido.estudiante}</p>
              <p>Estado: {pedido.estado}</p>
              <p>Método de pago: {pedido.metodoPago}</p>
              {pedido.comprobante && (
                <img
                  src={pedido.comprobante}
                  alt="Comprobante"
                  className="pedido-imagen"
                />
              )}
              <div className="estado-buttons">
                <button onClick={() => actualizarEstado(pedido.id, 'En preparación')}>
                  En preparación
                </button>
                <button onClick={() => actualizarEstado(pedido.id, 'Listo para entrega')}>
                  Listo para entrega
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay solicitudes aún.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Solicitudes;
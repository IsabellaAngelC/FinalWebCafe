import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../services/firebaseConfig';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import './MisPedidos.css';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const pedidosRef = collection(db, 'pedidos');
        const q = query(pedidosRef, where('estudiante', '==', user.displayName || user.email)); 

        const unsubscribePedidos = onSnapshot(q, (querySnapshot) => {
          const fetchedPedidos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPedidos(fetchedPedidos);
          setLoading(false); 
        });

        return () => unsubscribePedidos();
      } else {
        setPedidos([]);
        setLoading(false); 
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  if (loading) {
    return <p>Cargando...</p>; 
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Mis Pedidos</h1>
      <div className="pedidos-container">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <h2>{pedido.type}</h2>
              <p>Estado: {pedido.estado}</p>
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
};

export default MisPedidos;
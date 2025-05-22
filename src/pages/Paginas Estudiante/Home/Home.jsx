import './Home.css';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  
  const fetchMenus = async () => {
    try {
      const menusRef = collection(db, 'menus'); 
      const querySnapshot = await getDocs(menusRef);
      const fetchedMenus = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenus(fetchedMenus); 
    } catch (error) {
      console.error('Error al obtener los menús:', error);
    }
  };

  useEffect(() => {
    fetchMenus(); 
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="cafeterias">
        {menus.map((menu) => (
          <div key={menu.id} className="menu-card">
            <h3>{menu.menuName}</h3>
            <p><strong>Descripción:</strong> {menu.description}</p>
            <p><strong>Precio:</strong> ${menu.price}</p>
            <p><strong>Publicado por:</strong> {menu.username}</p>
            <button
              className="buy-button"
              onClick={() =>
  navigate('/nuevo-pedido', { state: { item: { 
    type: menu.menuName,
    adminEmail: menu.adminEmail 
  } } })
}
  >
              Comprar
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
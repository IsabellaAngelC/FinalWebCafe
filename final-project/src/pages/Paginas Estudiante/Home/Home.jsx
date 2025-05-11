import './Home.css';
import Navbar from '../../../components/navbar/NavBar';
import Footer from '../../../components/footer/Footer';
import { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [menus, setMenus] = useState([]);

  // Función para obtener los menús desde Firebase
  const fetchMenus = async () => {
    try {
      const menusRef = collection(db, 'menus'); // Conecta con la colección "menus"
      const querySnapshot = await getDocs(menusRef);
      const fetchedMenus = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenus(fetchedMenus); // Actualiza el estado con los menús obtenidos
    } catch (error) {
      console.error('Error al obtener los menús:', error);
    }
  };

  useEffect(() => {
    fetchMenus(); // Llama a la función al montar el componente
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="cafeterias">
        {menus.map((menu) => (
          <div key={menu.id} className="menu-card">
            <h3>{menu.menuName}</h3>
            <p><strong>Descripción:</strong> {menu.description}</p>
            <p><strong>Precio:</strong> {menu.price}</p>
            <p><strong>Publicado por:</strong> {menu.username}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
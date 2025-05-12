import Navbar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import MenuForm from "../../../components/MenuForm/MenuForm";
import { useState, useEffect } from "react";
import { db } from "../../../services/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "./HomeAdmin.css";

const HomeAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([]);
  const [user] = useState({ username: "Cafetería Bristo" }); // Simulación del usuario actual

  // Función para escuchar los cambios en tiempo real desde Firebase
  useEffect(() => {
    const menusRef = collection(db, "menus");
    const q = query(menusRef, where("username", "==", user.username));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMenus = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenus(fetchedMenus);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [user.username]);

  return (
    <div className="home-admin-container">
  <Navbar />
  <div className="content">
    <h2 className="title">Publicaciones</h2> {/* Título centrado */}
    <button className="publish-button" onClick={() => setShowForm(!showForm)}>
      {showForm ? "Cerrar formulario" : "Publicar nuevo menú"}
    </button>

    {showForm && <MenuForm user={user} />}

    <div className="menu-posts">
      {menus.map((menu) => (
        <div key={menu.id} className="menu-post">
          <h3>{menu.menuName}</h3>
          <p><strong>Publicado por:</strong> {menu.username}</p>
          <p><strong>Descripción:</strong> {menu.description}</p>
          <p><strong>Precio:</strong> {menu.price}</p>
        </div>
      ))}
    </div>
  </div>
  <Footer />
</div>
  );
};

export default HomeAdmin;
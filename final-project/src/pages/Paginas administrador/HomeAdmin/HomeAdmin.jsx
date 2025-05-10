import Navbar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import MenuForm from "../../../components/MenuForm/MenuForm";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../../services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./HomeAdmin.css";

const HomeAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([]);
  const [user] = useState({ username: "Cafetería Bristo" }); // Simulación del usuario actual

  // Función para obtener las publicaciones de Firebase
  const fetchMenus = useCallback(async () => {
    try {
      const menusRef = collection(db, "menus");
      const q = query(menusRef, where("username", "==", user.username));
      const querySnapshot = await getDocs(q);

      // Depuración: Imprime los documentos obtenidos
      console.log("Documentos obtenidos:", querySnapshot.docs.map((doc) => doc.data()));

      const fetchedMenus = querySnapshot.docs.map((doc) => doc.data());
      setMenus(fetchedMenus);
    } catch (error) {
      console.error("Error al obtener los menús:", error);
    }
  }, [user.username]);

  useEffect(() => {
    console.log("usuario actual:", user.username);
    fetchMenus();
  }, [fetchMenus, user.username]);

  return (
    <div className="home-admin-container">
      <Navbar />
      <div className="content">
        <button className="publish-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar formulario" : "Publicar nuevo menú"}
        </button>

        {showForm && <MenuForm user={user} fetchMenus={fetchMenus} />}

        <div className="menu-posts">
          <h2>Publicaciones</h2>
          {menus.map((menu, index) => (
            <div key={index} className="menu-post">
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
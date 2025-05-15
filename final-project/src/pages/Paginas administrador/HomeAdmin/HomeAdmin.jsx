import Navbar from "../../../components/navbar/NavBar";
import Footer from "../../../components/footer/Footer";
import MenuForm from "../../../components/MenuForm/MenuForm";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../../../services/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "./HomeAdmin.css";

const HomeAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([]);
  const [user, setUser] = useState(null);

  // Obtener usuario autenticado y escuchar menús propios
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const menusRef = collection(db, "menus");
        const q = query(menusRef, where("adminEmail", "==", firebaseUser.email));
        const unsubscribeMenus = onSnapshot(q, (querySnapshot) => {
          const fetchedMenus = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMenus(fetchedMenus);
        });
        // Limpia el listener de menús al cambiar de usuario o desmontar
        return () => unsubscribeMenus();
      } else {
        setMenus([]);
      }
    });
    // Limpia el listener de auth al desmontar
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="home-admin-container">
      <Navbar />
      <div className="content">
        <h2 className="title">Publicaciones</h2>
        <button className="publish-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar formulario" : "Publicar nuevo menú"}
        </button>

        {showForm && user && <MenuForm user={user} />}

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
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import "./MenuForm.css";

const MenuForm = ({ user }) => {
  const [menuName, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const menusRef = collection(db, "menus");
      await addDoc(menusRef, {
        menuName,
        description,
        price,
        username: user.username, // Se asegura de guardar el nombre del usuario actual
        createdAt: new Date(),
      });

      alert("Menú publicado con éxito");
      setMenuName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error al publicar el menú:", error);
      alert("Hubo un error al publicar el menú.");
    }
  };

  return (
    <form className="menu-form" onSubmit={handleSubmit}>
      <h2>Publicar Nuevo Menú</h2>
      <input
        type="text"
        placeholder="Nombre del menú"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción del menú"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
};

export default MenuForm;
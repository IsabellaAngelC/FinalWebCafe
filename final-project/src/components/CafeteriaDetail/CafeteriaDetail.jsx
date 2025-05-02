import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importa useDispatch
import { agregarPedido } from '../../redux/pedidosSlice'; // Importa la acción
import { useNavigate } from 'react-router-dom';
import { cardsinfo } from '../../data/data';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import './CafeteriaDetail.css'; 

function CafeteriaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch(); // Inicializa dispatch
  const cafeteria = cardsinfo.find(item => item.id === Number(id));
  const handleComprar = (item) => {
    navigate('/nuevo-pedido', { state: { item } }); // Navega al formulario con los datos del pedido
  };

  if (!cafeteria) {
    return <div>Cafetería no encontrada</div>;
  }

  

  return (
    <div className='container'>
      <Navbar />
      <div className="cafeteria-detail">
        <h1 className="cafeteria-title">{cafeteria.title}</h1>
        
        <div className="menu-section">
          {cafeteria.menu.lunchItems.map(item => (
            <div key={item.id} className="menu-item">
              <h2 className="item-type">{item.type}</h2>
              <p className="item-description">{item.description}</p>
              <div className="item-footer">
                <span className="item-price">{item.price}</span>
                <button
              className="buy-button"
              onClick={() => handleComprar(item)} // Navega al formulario
            >
              Comprar
            </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="extras-section">
          <h2 className="extras-title">Extras</h2>
          <div className="extras-grid">
            {cafeteria.menu.extras.map(extra => (
              <div key={extra.id} className="extra-item">
                <span>{extra.name}</span>
                <button
                  className="buy-button small"
                  onClick={() => handleComprar(extra)} // También para extras
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CafeteriaDetail;
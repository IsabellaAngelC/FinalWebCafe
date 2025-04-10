import { useParams } from 'react-router-dom';
import { cardsinfo } from '../../data/data';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import './CafeteriaDetail.css'; 

function CafeteriaDetail() {
  const { id } = useParams();
  const cafeteria = cardsinfo.find(item => item.id === Number(id));

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
              <button className="buy-button">Comprar</button>
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
              <button className="buy-button small">+</button>
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
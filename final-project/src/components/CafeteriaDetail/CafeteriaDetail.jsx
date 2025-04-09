import { useParams } from 'react-router-dom';
import { cardsinfo } from '../../data/data';

function CafeteriaDetail() {
  const { id } = useParams();
  const cafeteria = cardsinfo.find(item => item.id === Number(id));

  if (!cafeteria) {
    return <div>Cafetería no encontrada</div>;
  }

  return (
    <div className="cafeteria-detail">
      <h1>{cafeteria.title}</h1>
      <img src={cafeteria.image} alt={cafeteria.title} className="cafeteria-image" />
      
      <h2>Menú</h2>
      <div className="menu-section">
        <h3>Almuerzos</h3>
        {cafeteria.menu.lunchItems.map(item => (
          <div key={item.id} className="menu-item">
            <h4>{item.type}</h4>
            <p>{item.description}</p>
            <span className="price">{item.price}</span>
          </div>
        ))}
      </div>
      
      <div className="extras-section">
        <h3>Extras</h3>
        <ul>
          {cafeteria.menu.extras.map(extra => (
            <li key={extra.id}>{extra.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CafeteriaDetail;
import { useNavigate } from 'react-router-dom';
import { cardsinfo } from "../../data/data";
import "./CardsHome.css";

function Cards() {
  const navigate = useNavigate();
  
  return (
    <div className="latest-updates"> 
      <div className="two-top">
        <h2 className="title">Cafeterías Disponibles</h2>
      </div>

      <div className="cards-container">
        {cardsinfo.map((card) => (
          <div 
            key={card.id} 
            className="card" 
            onClick={() => navigate(`/cafeteria/${card.id}`)}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
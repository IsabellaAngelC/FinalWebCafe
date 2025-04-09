import { useParams } from 'react-router-dom';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import { cardsinfo } from '../../data/data';
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
       
      <h1>{cafeteria.title}</h1>
      
      <h2>Menú</h2>
      <div className="menu-section">
        

        {cafeteria.menu.lunchItems.map(item => (
          <div key={item.id} className="menu-item">
            <h4>{item.type}</h4>
            <p>{item.description}</p>
            <span className="price">{item.price}</span>


       </div>
        ))}

    <div className="extras-section">
        <h3>Extras</h3>
        <ul>
          {cafeteria.menu.extras.map(extra => (
            <li key={extra.id}>{extra.name}</li>
          ))}
        </ul>
    </div>

      </div>
      
      
    
    </div>
    <Footer />
    </div>
  );
}

export default CafeteriaDetail;
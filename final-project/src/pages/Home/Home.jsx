import './Home.css';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import Cards from '../../components/CardsHome/CardsHome';

const Home = () => {
  return (
    
        <div className='home-container'>
             <Navbar />

             <div className='cafeterias'>
              <Cards />
             </div>
      
             <Footer /> 
      
      </div>
    
  );
}

export  default Home;
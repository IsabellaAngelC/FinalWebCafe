import './Bristo.css';
import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import MenuList from '../../components/MenuList';

const Bristo = () => {
    return (
        <div>
            <Navbar />
            
            <div className='bristo-container'>
                <MenuList />
            </div>

            <Footer />
        </div>
    )
}
export default Bristo;
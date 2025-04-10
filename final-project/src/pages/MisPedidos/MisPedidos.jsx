import Navbar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './MisPedidos.css'

const MisPedidos = () => {
    return (
        <div className="container">
            <Navbar />

            <h1>Mis Pedidos</h1>
            <div className="pedidos-container">

            <p>Todavía no tienes pedidos</p>

            </div>
            
            <Footer />
        </div>
    );
}
export default MisPedidos;
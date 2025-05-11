import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Paginas Estudiante/Home/Home';
import Profile from './pages/Profile/Profile';
import Form from './pages/Paginas Estudiante/PedidoForm/Form';
import MisPedidos from './pages/Paginas Estudiante/MisPedidos/MisPedidos';
import HomeAdmin from './pages/Paginas administrador/HomeAdmin/HomeAdmin';
import Solicitudes from './pages/Paginas administrador/Solicitudes/Solicitudes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
		    <Route path="/profile" element={<Profile />} />
        <Route path="/nuevo-pedido" element={<Form />} />
		    <Route path="/mispedidos" element={<MisPedidos />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
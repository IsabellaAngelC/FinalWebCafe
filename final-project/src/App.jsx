import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import CafeteriaDetail from './components/CafeteriaDetail/CafeteriaDetail';
import Profile from './pages/Profile/Profile';
import Form from './pages/PedidoForm/Form';
import MisPedidos from './pages/MisPedidos/MisPedidos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cafeteria/:id" element={<CafeteriaDetail />} />
		    <Route path="/profile" element={<Profile />} />
        <Route path="/nuevo-pedido" element={<Form />} />
		    <Route path="/mispedidos" element={<MisPedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
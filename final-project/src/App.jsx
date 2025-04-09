import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Bristo from './pages/Cafeteria Bristo/Bristo';
import CafeteriaDetail from './pages/Cafeteria Detail/CafeteriaDetail';
//import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
        
        <Route path="/" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />
		<Route path ="/home" element={<Home />} />
		<Route path ="/home/bristo" element={<Bristo />} />
		<Route path="/cafeteria/:id" element={<CafeteriaDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simulador from './pages/Simulador';
import Solicitar from './pages/Solicitar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/solicitar" element={<Solicitar />} />
        </Routes>
        <footer className="bg-brand-800 text-white text-center py-6 mt-10">
          <p>&copy; 2025 CrediAntioquia. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Desarrollado con React + Vite</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PolizaList from './components/Poliza/PolizaList';
import ProveedorList from './components/Proveedor/ProveedorList';
import SiniestroList from './components/Siniestro/SiniestroList';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <Link to="/">Inicio</Link>
            <Link to="/polizas">Pólizas</Link>
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/siniestros">Siniestros</Link>
          </div>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/polizas" element={<PolizaList />} />
            <Route path="/proveedores" element={<ProveedorList />} />
            <Route path="/siniestros" element={<SiniestroList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

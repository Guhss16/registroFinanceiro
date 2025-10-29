import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// Importando as páginas
import Gastos from './pages/gastos';
import Dashboard from './pages/dashboard';
import Entradas from './pages/entradas';
import Categorias from './pages/categorias';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
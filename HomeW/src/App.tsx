import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PantallaCajero from './components/Challenge5/PantallaCajero';
import Biblioteca from './components/Challenge4/Biblioteca';
import './App.css';

const Navigation = () => {
  const { isAuthenticated, email, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/cajero" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Cajero (Reto 5)</Link>
        <Link to="/biblioteca" style={{ color: 'white', textDecoration: 'none' }}>Biblioteca (Reto 4)</Link>
      </div>
      <div>
        <span style={{ marginRight: '1rem' }}>Usuario: {email}</span>
        <button onClick={logout} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cajero" element={<PantallaCajero />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

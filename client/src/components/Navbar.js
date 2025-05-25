import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/global.css'; // Asegurate que los estilos globales estén importados

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Inicio
      </NavLink>
      <NavLink to="/mood" className={({ isActive }) => (isActive ? 'active' : '')}>
        Soltar
      </NavLink>
      <NavLink to="/feed" className={({ isActive }) => (isActive ? 'active' : '')}>
        MoodFeed
      </NavLink>
      <NavLink to="/historial" className={({ isActive }) => (isActive ? 'active' : '')}>
        Historial
      </NavLink>
      <NavLink to="/herramientas" className={({ isActive }) => (isActive ? 'active' : '')}>
        Herramientas
      </NavLink>
    </nav>
  );
};

export default Navbar;
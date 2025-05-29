import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isAuthenticated = !!token;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error al obtener perfil', error);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    alert('Sesión cerrada');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Inicio
      </NavLink>

      {isAuthenticated ? (
        <>
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

          {user && (
            <div
              className="profile-section"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={
                  user.profileImage
                    ? `http://localhost:3001/uploads/${user.profileImage}`
                    : '/default-profile.png'
                }
                alt="Perfil"
                className="profile-image"
              />
            </div>
          )}

          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
            Registrarse
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isAuthenticated = !!token;
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

          {user && (
            <div className="profile-section">
              <img
                src={
                  user.profileImage
                    ? `http://localhost:3001/uploads/${user.profileImage}`
                    : '/default-profile.png'
                }
                alt="Perfil"
                className="profile-image"
                onClick={toggleDropdown}
              />

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/profile')}>👤 Mi perfil</button>
                  <button onClick={() => navigate(`/usuario/${user?.id}`)}>🌍 Emociones públicas</button>
                  <button onClick={() => navigate('/historial')}>📖 Mi historial</button>
                  <button onClick={handleLogout} className="logout-button">🚪 Cerrar sesión</button>
                </div>
              )}
            </div>
          )}
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
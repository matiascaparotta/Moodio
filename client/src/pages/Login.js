import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      // Guardar token según toggle
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.token);

      navigate('/mood');
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="toggle-switch">
          <input
            type="checkbox"
            id="rememberMe"
            className="toggle-checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="toggle-label" htmlFor="rememberMe">
            <span className="toggle-inner" />
            <span className="toggle-switch-button" />
          </label>
          <span className="toggle-text">Recordarme</span>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-button">Entrar</button>
      </form>

      <p className="register-link">
        ¿No tenés una cuenta? <Link to="/register">Registrate acá</Link>
      </p>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthYear: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }

    if (!image) {
      return alert('Por favor sube una imagen de perfil');
    }

    const data = new FormData();
    data.append('fullName', `${form.firstName} ${form.lastName}`);
    data.append('lastName', form.lastName);
    data.append('username', form.username);
    data.append('birthYear', form.birthYear);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('image', image);

    try {
      await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="firstName" placeholder="Nombre" onChange={handleChange} required />
        <input name="lastName" placeholder="Apellido" onChange={handleChange} required />
        <input name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input name="birthYear" type="number" placeholder="Año de nacimiento" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
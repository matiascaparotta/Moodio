import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    username: '',
    birthYear: '',
  });
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          fullName: res.data.fullName || '',
          lastName: res.data.lastName || '',
          username: res.data.username || '',
          birthYear: res.data.birthYear || '',
        });
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put('/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...formData });
      setIsEditing(false);
      alert('Perfil actualizado ✅');
    } catch (err) {
      alert('Error al actualizar');
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      const res = await api.post('/profile/upload', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser({ ...user, profileImage: res.data.imageUrl });
    } catch (err) {
      alert('Error al subir imagen');
      console.error(err);
    }
  };

  if (!user) return <p className="container">Cargando perfil...</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Mi perfil</h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={
            user.profileImage
              ? `http://localhost:3001/uploads/${user.profileImage}`
              : '/default-profile.png'
          }
          alt="Perfil"
          className="profile-picture"
        />
        {isEditing && (
          <input type="file" onChange={handleImageUpload} style={{ margin: '1rem 0' }} />
        )}
      </div>

      <div className="profile-form">
        {!isEditing ? (
          <>
            <p><strong>Nombre:</strong> {user.fullName}</p>
            <p><strong>Apellido:</strong> {user.lastName}</p>
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Año de nacimiento:</strong> {user.birthYear}</p>

            <button onClick={() => setIsEditing(true)} className="button">Editar perfil</button>
          </>
        ) : (
          <>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
            <input
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              placeholder="Año de nacimiento"
              type="number"
            />

            <button onClick={handleSave} className="button">Guardar cambios</button>
            <button
              onClick={() => setIsEditing(false)}
              className="button"
              style={{ backgroundColor: '#ccc', color: '#333' }}
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => navigate('/historial')}
        className="button"
        style={{ marginTop: '1rem', backgroundColor: '#6c5ce7' }}
      >
        Ver historial de emociones
      </button>
    </div>
  );
};

export default Profile;
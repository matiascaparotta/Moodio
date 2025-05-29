import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/PublicProfile.css'; // opcional para estilos

const PublicProfile = () => {
  const { id } = useParams();
  const [emotions, setEmotions] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await api.get(`/emotions/user/${id}`);
        setEmotions(res.data);
        if (res.data.length > 0) setUsername(res.data[0].User.username);
      } catch (error) {
        console.error('❌ Error al obtener emociones:', error);
      }
    };

    fetchEmotions();
  }, [id]);

  return (
    <div className="user-profile-container">
      <h2>Perfil público de {username || 'usuario'}</h2>

      {emotions.length === 0 ? (
        <p>Este usuario aún no compartió emociones públicas.</p>
      ) : (
        emotions.map((emo) => (
          <div key={emo.id} className="emotion-card">
            <p className="emotion-feeling">🧠 {emo.feeling}</p>
            <p className="emotion-message">{emo.message}</p>
            <p className="emotion-time">{new Date(emo.timestamp).toLocaleString()}</p>
            <div className="reaction-counts">
              🤝 {emo.support} ‧ 👁️ {emo.seen}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicProfile;
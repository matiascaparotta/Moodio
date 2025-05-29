import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/MyHistory.css';

const MyHistory = () => {
  const [emotions, setEmotions] = useState([]);
  const [hasWrittenToday, setHasWrittenToday] = useState(false);
  const navigate = useNavigate();

  // Verificar si ya escribió hoy
  useEffect(() => {
    const checkToday = async () => {
      try {
        const response = await api.get('/emotions/check/today');
        setHasWrittenToday(response.data.hasWrittenToday);
      } catch (error) {
        console.error('❌ Error al verificar entrada de hoy:', error);
      }
    };

    checkToday();
  }, []);

  // Traer emociones personales
  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await api.get('/emotions/mine');
        setEmotions(response.data);
      } catch (error) {
        console.error('❌ Error al obtener emociones personales:', error);
      }
    };

    fetchEmotions();
  }, []);

  return (
    <div className="my-history-container">
      <h2>📖 Mi Diario Emocional</h2>

      {!hasWrittenToday && (
        <div className="write-today-box">
          
          <button className="write-button" onClick={() => navigate('/mood')}>
            ✍️ Escribí algo ahora
          </button>
        </div>
      )}

      <div className="entries">
        {emotions.map((emotion) => (
          <div key={emotion.id} className="emotion-entry">
            <div className="entry-header">
              <span className="entry-date">
                {new Date(emotion.timestamp).toLocaleDateString()}
              </span>
              <span className="entry-feeling">🧠 {emotion.feeling}</span>
            </div>
            <p className="entry-message">{emotion.message}</p>
            {emotion.isAnonymous ? (
              <span className="entry-anon">🕵️‍♀️ Entrada privada</span>
            ) : (
              <span className="entry-user">👤 {emotion.User?.username}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHistory;
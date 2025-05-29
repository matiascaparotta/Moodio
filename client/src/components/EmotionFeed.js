import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/EmotionFeed.css';

const EmotionFeed = () => {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    fetchEmotions();
  }, []);

  const fetchEmotions = async () => {
    try {
      const res = await api.get('/emotions');
      setEmotions(res.data);
    } catch (err) {
      console.error('Error al cargar emociones:', err);
    }
  };

  const handleReaction = async (id, action) => {
    try {
      await api.patch(`/emotions/${id}/react`, { type: action });
      setEmotions((prev) =>
        prev.map((emo) =>
          emo.id === id ? { ...emo, [action]: emo[action] + 1 } : emo
        )
      );
    } catch (err) {
      console.error('Error al reaccionar:', err);
    }
  };

  return (
    <div className="feed-container">
      <h2 className="feed-title">💬 MoodFeed</h2>
      {emotions.length === 0 ? (
        <p className="empty-feed">Aún no hay emociones publicadas.</p>
      ) : (
        emotions.map((emo) => (
          <div key={emo.id} className="emotion-card">
            <div className="emotion-header">
              <p className="emotion-feeling">{emo.feeling}</p>
              {emo.User && (
                <Link to={`/usuario/${emo.userId}`} className="emotion-username">
                  👤 {emo.User.username}
                </Link>
              )}
            </div>
            <p className="emotion-message">{emo.message}</p>
            <p className="emotion-time">
              {new Date(emo.timestamp).toLocaleString()}
            </p>
            <div className="reaction-buttons">
              <button onClick={() => handleReaction(emo.id, 'support')}>
                🤝 {emo.support}
              </button>
              <button onClick={() => handleReaction(emo.id, 'seen')}>
                👁️ {emo.seen}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmotionFeed;
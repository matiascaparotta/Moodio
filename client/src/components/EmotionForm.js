import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const EmotionForm = () => {
  const [message, setMessage] = useState('');
  const [feeling, setFeeling] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || !feeling) {
      alert('Por favor completá ambos campos');
      return;
    }

    try {
      await api.post('/emotions', { message, feeling });
      alert('Emoción enviada con éxito 💜');
      setMessage('');
      setFeeling('');
      navigate('/feed');
    } catch (error) {
      console.error('Error al enviar emoción:', error);
      alert('Hubo un error al enviar la emoción 😢');
    }
  };

  const feelings = [
    { emoji: '😢', label: 'Triste' },
    { emoji: '🙂', label: 'Feliz' },
    { emoji: '😨', label: 'Con miedo' },
    { emoji: '😰', label: 'Ansioso' },
    { emoji: '😌', label: 'En paz' },
  ];

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">¿Qué estás sintiendo hoy?</h2>

      <label htmlFor="emotion-message">Escribí tu emoción</label>
      <textarea
        id="emotion-message"
        placeholder="Por ejemplo: Me siento abrumado por todo lo que tengo que hacer."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        required
      />

      <label>Elegí una emoción</label>
      <div className="emoji-row">
        {feelings.map((item) => (
          <div
            key={item.label}
            className={`emoji-option ${feeling === item.label ? 'selected' : ''}`}
            onClick={() => setFeeling(item.label)}
          >
            <div>{item.emoji}</div>
            <div className="emoji-label">{item.label}</div>
          </div>
        ))}
      </div>

      <button type="submit" className="button">
        Soltar 💬
      </button>
    </form>
  );
};

export default EmotionForm;
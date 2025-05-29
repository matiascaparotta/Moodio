import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const EmotionForm = () => {
  const [message, setMessage] = useState('');
  const [feeling, setFeeling] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || !feeling) {
      alert('Por favor completá ambos campos');
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para enviar una emoción');
      navigate('/login');
      return;
    }

    try {
      // 👉 Mostrar datos enviados (para depurar)
      console.log('📤 Enviando emoción:', {
        message,
        feeling,
        isAnonymous,
      });

      await api.post(
        '/emotions',
        { message, feeling, isAnonymous },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Emoción enviada con éxito 💜');
      setMessage('');
      setFeeling('');
      setIsAnonymous(true);
      navigate('/feed');
    } catch (error) {
      console.error('❌ Error al enviar emoción:', error.response?.data || error);
      alert(
        error.response?.data?.error ||
          'Hubo un error al enviar la emoción 😢'
      );
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

      <div className="public-toggle">
        <label htmlFor="public-toggle">
          <input
            type="checkbox"
            id="public-toggle"
            checked={!isAnonymous}
            onChange={(e) => setIsAnonymous(!e.target.checked)}
          />
          Hacer pública la emoción
        </label>
      </div>

      <button type="submit" className="button">Soltar 💬</button>
    </form>
  );
};

export default EmotionForm;
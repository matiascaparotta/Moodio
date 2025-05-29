import React from 'react';
import '../styles/Welcome.css';

const Welcome = () => (
  <div className="welcome-container">
    <h1 className="welcome-title">Bienvenido a Moodio 💜</h1>
    <p className="welcome-subtitle">Soltá lo que sentís, sin juicios.</p>
    <a href="/mood">
      <button className="welcome-button">Empezar</button>
    </a>
  </div>
);

export default Welcome;
import React from 'react';
import EmotionForm from '../components/EmotionForm';
import EmotionFeed from '../components/EmotionFeed';
import './Home.css';
const Home = () => {
  return (
    <div className="homeContent-wrapper">
      <header className="homeContent-header">
        <h1 className="homeContent-title">Moodio 💜</h1>
        <p className="homeContent-subtitle">Expresá cómo te sentís y descubrí que no estás solo</p>
      </header>

      <section className="homeContent-formSection">
        <h2 className="homeContent-sectionTitle">📥 Compartí tu emoción</h2>
        <EmotionForm />
      </section>

      <hr className="homeContent-divider" />

      <section className="homeContent-feedSection">
        <h2 className="homeContent-sectionTitle">🌈 Emociones recientes</h2>
        <EmotionFeed />
      </section>
    </div>
  );
};

export default Home;
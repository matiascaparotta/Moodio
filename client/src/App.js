import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './routes/Welcome';
import Home from './routes/Home';
import MoodFeedPage from './routes/MoodFeedPage';
import MyHistory from './routes/MyHistory';
import Tools from './routes/Tools';
import Navbar from './components/Navbar';
// src/index.js o src/App.js
import './styles/global.css';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/mood" element={<Home />} />
        <Route path="/feed" element={<MoodFeedPage />} />
        <Route path="/historial" element={<MyHistory />} />
        <Route path="/herramientas" element={<Tools />} />
      </Routes>
    </Router>
  );
}

export default App;
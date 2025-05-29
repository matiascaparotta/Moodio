import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './routes/Welcome';
import Home from './routes/Home';
import MoodFeedPage from './routes/MoodFeedPage';
import MyHistory from './routes/MyHistory';
import Tools from './routes/Tools';
import Navbar from './components/Navbar';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import PublicProfile from './routes/PublicProfile'; // ✅ nuevo
import './styles/global.css';

// ✅ CORREGIDO: busca el token en localStorage o sessionStorage
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/mood"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <MoodFeedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <PrivateRoute>
              <MyHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/herramientas"
          element={
            <PrivateRoute>
              <Tools />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/:id"
          element={
            <PrivateRoute>
              <PublicProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
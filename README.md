# Moodio

**Moodio** es una aplicación web para la expresión emocional anónima. Los usuarios pueden compartir cómo se sienten, ver las emociones de otros y reaccionar con empatía. El objetivo es crear una comunidad segura y compasiva para el desahogo emocional.

## 🧠 Funcionalidades actuales

- Formulario para ingresar una emoción con un mensaje y categoría (representada por un emoji).
- Visualización de emociones en un feed ordenado por fecha.
- Reacciones a emociones: "🤝 Apoyo" y "👁️ Visto".
- Estilos empáticos y suaves con diseño responsive.
- Navegación entre vistas: bienvenida, ingresar emoción, historial, herramientas futuras.
- Backend conectado con base de datos MySQL usando Sequelize.

## 📁 Estructura del proyecto

```
Moodio/
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # EmotionForm, EmotionFeed, Navbar
│   │   ├── routes/        # Welcome, Home, MoodFeedPage, etc.
│   │   ├── services/      # api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── global.css     # Estilos globales
│   └── public/
├── server/                # Backend Node.js + Express
│   ├── config/            # Base de datos (db.js)
│   ├── models/            # Sequelize Models
│   ├── routes/            # Rutas API (emotions.js)
│   └── index.js           # Entrada principal del servidor
├── .env                   # Variables de entorno (DB config)
└── README.md              # Este archivo
```

## 🛠️ Tecnologías utilizadas

- **Frontend:** React.js, CSS, React Router DOM
- **Backend:** Node.js, Express.js, Sequelize
- **Base de datos:** MySQL
- **Dependencias útiles:** Axios, dotenv, nodemon

## 🌱 Futuro

- Autenticación de usuarios
- Comentarios anónimos
- Herramientas premium como estadísticas emocionales, audios guiados
- Versión móvil con React Native

## 🚀 Cómo ejecutar localmente

1. Clonar el repositorio:
```bash
git clone https://github.com/matiascaparotta/Moodio.git
```

2. Instalar dependencias:
```bash
cd Moodio/client
npm install

cd ../server
npm install
```

3. Configurar `.env` en la carpeta `server`:
```env
DB_NAME=moodio_db
DB_USER=root
DB_PASS=tu_contraseña
DB_HOST=localhost
PORT=3001
```

4. Ejecutar el servidor:
```bash
cd server
node index.js
```

5. Ejecutar el frontend:
```bash
cd client
npm start
```

---

*Actualizado:* 24/05/2025

# 💜 Moodio

**Moodio** es una aplicación web interactiva y empática enfocada en el bienestar emocional, diseñada para que los jóvenes puedan expresar sus emociones de forma segura, reflexiva y auténtica. 

Construida con **React.js**, **Node.js**, **Express**, **MySQL** y **Sequelize**, esta app permite escribir emociones, mantener un historial personal y compartir sentimientos públicos con otros usuarios de forma anónima o identificada.

---

## 🚀 Características principales

### ✍️ Publicación de emociones
- Etiqueta el sentimiento con emojis (`Triste`, `Feliz`, `Ansioso`, etc.).
- Publicaciones pueden ser **públicas** o **privadas**.
- Opción de publicar de forma **anónima** o con nombre de usuario.

### 📖 Historial personal
- Visualiza todas tus emociones escritas, tanto públicas como privadas.
- Estilo tipo “diario íntimo” para fomentar la reflexión.
- Solo el usuario puede ver su historial completo.

### 🌍 MoodFeed público
- Accede a un feed de emociones públicas escritas por otros usuarios.
- Reacciona con:
  - 🤝 Apoyo
  - 👁️ Lo vi

### 👤 Perfil de usuario
- Sección con datos personales y foto de perfil.
- Posibilidad de editar información y subir imagen.

### 🌐 Perfiles públicos
- Navegación al perfil público de otros usuarios.
- Visualización exclusiva de sus emociones **públicas**.

### 🔐 Autenticación segura
- Registro y login con email y contraseña.
- Protección de rutas privadas con JWT.
- Solo los usuarios logueados pueden escribir emociones o ver su historial.

### 🧰 Herramientas de apoyo (en progreso)
- Sección para incorporar herramientas de salud mental: audios, estadísticas, etc.

---

## 🧑‍💻 Tecnologías utilizadas

### Frontend:
- React.js
- React Router
- Axios
- CSS Modules + Poppins (Google Fonts)

### Backend:
- Node.js
- Express.js
- Sequelize ORM
- MySQL

### Autenticación:
- JWT (JSON Web Tokens)
- Middlewares personalizados

---

## 🛠️ Instalación y ejecución local

```bash
# Clonar el proyecto
git clone https://github.com/matiascaparotta/Moodio.git
cd Moodio

# Instalar dependencias del backend
cd server
npm install

# Instalar dependencias del frontend
cd ../client
npm install

# Ejecutar ambos servidores (usar nodemon y React)
cd ../server
npm run dev

cd ../client
npm start


# Moodio – App de Salud Emocional 🌱

Moodio es una aplicación full stack diseñada para ayudar a los usuarios a expresar y reflexionar sobre sus emociones. Está pensada para un público joven, con una interfaz amigable, moderna y centrada en el bienestar emocional.

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** React.js, React Router, CSS modular, diseño responsivo.
- **Backend:** Node.js, Express.js, Sequelize, MySQL.
- **Otros:** Multer (subida de imágenes), JSON Web Token (autenticación), Vite, Axios, Figma (diseño UI/UX).

---

## ✅ Funcionalidades principales

### 🔐 Autenticación
- Registro con email, contraseña y **foto obligatoria de perfil**.
- Login seguro con almacenamiento del token.
- Validaciones y manejo de errores claros para el usuario.

### 👤 Perfil de usuario
- Visualización de foto y datos.
- Edición de nombre, apellido, usuario y año de nacimiento.
- Botón para ir al historial de emociones.

### 🧠 Registro emocional
- Formulario para soltar emociones en texto libre.
- Selección de emojis como representación de estado emocional.
- Feed tipo red social con las emociones públicas de los demás.

### 🛠️ Herramientas de apoyo (en progreso)
- Audios de relajación, estadísticas, recursos premium.

---

## 🎨 Diseño visual
- Inspirado en apps de bienestar (colores lavanda, coral, azul claro).
- Tipografía suave (Poppins).
- Interfaz minimalista, limpia y accesible.

---

## 🚀 Cómo correrlo localmente

1. Clona el repositorio:
```bash
git clone https://github.com/matiascaparotta/Moodio.git
cd Moodio
```

2. Instala dependencias:
```bash
cd client
npm install
cd ../server
npm install
```

3. Crea el archivo `.env` en `/server` con:
```
PORT=3001
JWT_SECRET=tu_clave_secreta
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=moodio_db
```

4. Inicia el backend y frontend:
```bash
cd server
node index.js
# En otra terminal:
cd client
npm run dev
```

---

## 🧑‍💻 Autor

**Matías Caparotta** – Desarrollador full stack con background en liderazgo en hospitalidad. En transición profesional hacia el desarrollo de productos tecnológicos con impacto humano.

---

## 📸 Capturas de pantalla (opcional)

*Próximamente se pueden agregar para mostrar visualmente el perfil, feed y pantalla de registro.*

---

## 🌍 Estado actual del proyecto

Esta rama contiene todos los últimos avances hasta el 2025:
- ✅ Registro con imagen
- ✅ Sección de perfil
- ✅ Diseño visual consistente
- ✅ Manejo de errores
- ✅ Subida de imágenes al servidor
- ✅ Conexión completa entre frontend y backend


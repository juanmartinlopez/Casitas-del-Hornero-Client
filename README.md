# 🏨 Casita del Hornero - Sistema de Reserva Hotelera

Un sistema de reserva de hotelería moderno y elegante desarrollado con React y Vite, diseñado para ofrecer una experiencia de usuario fluida y intuitiva para la gestión de reservas de hospedaje.

## 📋 Descripción

**Casita del Hornero** es una aplicación web completa para la gestión de reservas hoteleras que permite a los usuarios:

- 🔍 Buscar y filtrar alojamientos disponibles
- 📅 Seleccionar fechas de check-in y check-out
- 💳 Gestionar reservas y pagos
- 👤 Autenticación de usuarios con Firebase
- 📊 Visualización de datos con gráficos interactivos
- 🗺️ Integración con mapas para ubicación de propiedades

## 🚀 Tecnologías Principales

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 4.1.10 + Bootstrap 5.3.7
- **State Management**: Redux 5.0.1 + Redux Toolkit
- **Routing**: React Router DOM 7.6.2
- **Backend Services**: Firebase 11.9.1
- **HTTP Client**: Axios 1.10.0

## 📦 Dependencias

### Dependencias de Producción

```json
{
  "@emotion/styled": "^11.14.0",
  "@fortawesome/free-solid-svg-icons": "^6.7.2",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "@popperjs/core": "^2.11.8",
  "axios": "^1.10.0",
  "bootstrap": "^5.3.7",
  "chart.js": "^4.5.0",
  "date-fns": "^4.1.0",
  "firebase": "^11.9.1",
  "mui-datatables": "^4.3.0",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.10",
  "react-chartjs-2": "^5.3.0",
  "react-data-table-component": "^7.7.0",
  "react-date-range": "^1.4.0",
  "react-datepicker": "^4.25.0",
  "react-dom": "^18.3.1",
  "react-glider": "^4.0.2",
  "react-leaflet": "^4.2.1",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.6.2",
  "react-slick": "^0.30.3",
  "redux": "^5.0.1",
  "redux-thunk": "^3.1.0",
  "slick-carousel": "^1.8.1",
  "sweetalert": "^2.1.2",
  "uuid": "^11.1.0"
}
```

### Dependencias de Desarrollo

```json
{
  "@tailwindcss/postcss": "^4.1.10",
  "@tailwindcss/vite": "^4.1.10",
  "@types/react": "^18.3.23",
  "@types/react-dom": "^18.3.7",
  "@vitejs/plugin-react": "^4.5.2",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.29.0",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "postcss": "^8.5.6",
  "tailwindcss": "^4.1.10",
  "vite": "^6.3.5"
}
```

## 🏗️ Estructura del Proyecto

```
Casita del Hornero/
├── public/                          # Archivos estáticos
├── src/                            # Código fuente principal
│   ├── App.jsx                     # Componente principal de la aplicación
│   ├── main.jsx                    # Punto de entrada de React
│   ├── index.css                   # Estilos globales
│   │
│   ├── assets/                     # Recursos estáticos (imágenes, iconos)
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── index.js               # Barrel exports
│   │   ├── Card/                  # Tarjetas de propiedades
│   │   │   └── Card.jsx
│   │   ├── Footer/                # Pie de página
│   │   │   └── Footer.jsx
│   │   ├── Loading/               # Indicadores de carga
│   │   │   └── Loading.jsx
│   │   └── NavBar/                # Barra de navegación
│   │       └── NavBar.jsx
│   │
│   ├── pages/                      # Páginas principales de la aplicación
│   │   ├── index.js               # Barrel exports
│   │   ├── Cart/                  # Carrito de reservas
│   │   ├── Detail/                # Detalles de propiedad
│   │   ├── Error404/              # Página de error
│   │   ├── ForgotPassword/        # Recuperación de contraseña
│   │   ├── Form/                  # Formularios
│   │   ├── Home/                  # Página principal
│   │   │   ├── Home.jsx
│   │   │   ├── Carousel/          # Carrusel de imágenes
│   │   │   │   └── Carousel.jsx
│   │   │   ├── Filter/            # Filtros de búsqueda
│   │   │   │   └── Filter.jsx
│   │   │   └── Pagination/        # Paginación de resultados
│   │   │       └── Pagination.jsx
│   │   ├── Login/                 # Inicio de sesión
│   │   │   ├── LogInForm/
│   │   │   │   ├── Validation.js
│   │   │   │   ├── LogInForm.jsx
│   │   │   └── Login.jsx
│   │   ├── Profile/               # Perfil de usuario
│   │   └── Register/              # Registro de usuarios
│   │       ├── Register.jsx
│   │       └── Validation.js
│   │
│   ├── firebase/                   # Configuración de Firebase
│   │   └── Firebase.js
│   │
│   ├── redux/                      # Gestión de estado global
│   │   ├── Actions/               # Acciones de Redux
│   │   │   ├── Actions.js
│   │   │   └── index.js
│   │   ├── Reducer/               # Reductores
│   │   │   └── Reducer.js
│   │   └── Store/                 # Configuración del store
│   │       └── Store.js
│   │
│   ├── services/                   # Servicios de autenticación
│   │   ├── AuthProvider.jsx       # Proveedor de autenticación
│   │   ├── BotonAuthGoogle.jsx    # Autenticación con Google
│   │   └── LogOut.jsx             # Cerrar sesión
│   │
│   └── utils/                      # Utilidades y helpers
│       ├── Divices.js             # Detección de dispositivos
│       └── LocalStorage/          # Gestión de localStorage
│           ├── index.js
│           ├── Check/             # Gestión de check-in/check-out
│           │   ├── CleanCheckinCheckout.js
│           │   ├── GuardarCheckInCheckOut.js
│           │   └── PedirCheckInCheckOut.js
│           ├── Money/             # Gestión de moneda
│           │   ├── GuardarMonedaLocalStorage.js
│           │   └── PedirMonedaLocalStorage.js
│           ├── PutPasswordLocalStorage/ # Gestión de contraseñas
│           │   ├── GuardarDatosParaCambiarPassword.js
│           │   └── PedirEmailLocalStorage.js
│           └── User/              # Gestión de usuarios
│               ├── CleanLocalStorage.js
│               ├── GuardarLocalStorage.js
│               └── PedirLocalStorage.js
│
├── eslint.config.js                # Configuración de ESLint
├── index.html                      # Plantilla HTML principal
├── package.json                    # Dependencias y scripts
├── postcss.config.js              # Configuración de PostCSS
├── tailwind.config.js             # Configuración de TailwindCSS
└── vite.config.js                 # Configuración de Vite
```

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase para servicios backend

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd "Casita del Hornero/Front2"
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar Firebase**

   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Configurar Authentication, Firestore y Storage
   - Actualizar el archivo `src/firebase/Firebase.js` con tu configuración

4. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   # ... otras configuraciones de Firebase
   ```

## 🚀 Scripts Disponibles

```bash
# Desarrollo - Inicia el servidor de desarrollo
npm run dev

# Construcción - Genera la versión de producción
npm run build

# Linting - Ejecuta el linter para verificar el código
npm run lint

# Preview - Previsualiza la versión de producción
npm run preview
```

## 🌟 Características Principales

### 🔐 Autenticación

- Registro e inicio de sesión con email/contraseña
- Autenticación con Google
- Recuperación de contraseña
- Gestión de perfiles de usuario

### 🏠 Gestión de Propiedades

- Listado de propiedades disponibles
- Filtros avanzados de búsqueda
- Detalles completos de cada propiedad
- Galería de imágenes con carrusel
- Integración con mapas (React Leaflet)

### 📅 Sistema de Reservas

- Selección de fechas con date picker
- Cálculo automático de precios
- Carrito de reservas
- Gestión de check-in y check-out

### 📊 Dashboard y Analytics

- Gráficos interactivos con Chart.js
- Tablas de datos con Material-UI
- Reportes de reservas y ocupación

### 💱 Gestión de Monedas

- Soporte para múltiples monedas
- Conversión automática de precios
- Persistencia en localStorage

## 🛠️ Tecnologías y Librerías Destacadas

- **UI/UX**: TailwindCSS, Bootstrap, Material-UI
- **Iconografía**: Font Awesome
- **Fechas**: date-fns, react-datepicker, react-date-range
- **Mapas**: React Leaflet
- **Carruseles**: React Slick, React Glider
- **Notificaciones**: SweetAlert
- **Tablas**: MUI DataTables, React Data Table Component
- **Gráficos**: Chart.js con React Chart.js 2

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para consultas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para ofrecer la mejor experiencia en reservas hoteleras**

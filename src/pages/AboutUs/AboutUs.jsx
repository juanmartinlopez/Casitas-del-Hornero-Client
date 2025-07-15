import { Footer, NavBar } from "../../components";
import { PedirLocalStorage } from "../../utils/LocalStorage";

const AboutUs = ({ countCarrito }) => {
  const User = PedirLocalStorage();

  // Datos del proyecto y desarrollador - PERSONALIZA ESTOS DATOS
  const projectData = {
    projectName: "Las Casitas del Hornero",
    year: "2025",
    description:
      "Proyecto Full Stack de reservas hoteleras - Portfolio de desarrollo web",
    mission:
      "Demostrar habilidades en desarrollo web moderno creando una plataforma completa de reservas hoteleras.",
    vision:
      "Crear aplicaciones web innovadoras que combinen funcionalidad, diseño elegante y experiencia de usuario excepcional.",
    technologies: [
      {
        category: "Frontend",
        techs: ["React", "Redux", "Tailwind CSS", "Vite"],
        icon: "⚛️",
      },
      {
        category: "Backend",
        techs: ["Node.js", "Express", "PostgreSQL", "Sequelize"],
        icon: "🔧",
      },
      {
        category: "Herramientas",
        techs: ["Git", "GitHub", "VS Code", "Postman"],
        icon: "🛠️",
      },
      {
        category: "Servicios",
        techs: ["Firebase Auth", "Cloudinary", "Deployment"],
        icon: "☁️",
      },
    ],
    developer: {
      name: "Juan Martín López",
      title: "Full Stack Developer - Proyecto Henry",
      description:
        "Soy estudiante de Ciencias de la Computación en la UNSJ y egresado de SoyHenry. Apasionado por el desarrollo web, disfruto construir soluciones útiles, funcionales y bien diseñadas.",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "Redux",
        "Tailwind CSS",
      ],
      image: "/images/juanmartin.jpg", // cambiá esto por tu ruta real o una URL pública
      experience:
        "Licenciatura en Ciencias de la Computación - Full Stack Developer.",
      learning:
        "Actualmente sigo perfeccionando mis conocimientos en React avanzado, testing, DevOps y metodologías ágiles.",
    },
    contact: {
      email: "juanmartinlopezfrau@gmail.com",
      github: "https://github.com/juanmartinlopez", // reemplazá por tu usuario real
      linkedin: "https://linkedin.com/in/juanmartinlopez", // reemplazá por tu perfil real
      portfolio: "https://juanmartinlopez.dev", // opcional, si tenés uno
    },

    features: [
      "🔐 Autenticación completa con Firebase",
      "🏨 Sistema de reservas en tiempo real",
      "💳 Carrito de compras funcional",
      "📱 Diseño completamente responsivo",
      "🎨 UI/UX moderno y elegante",
      "🔍 Sistema de búsqueda y filtros",
    ],
    stats: [
      { number: "React", label: "Frontend Framework" },
      { number: "Node.js", label: "Backend Runtime" },
      { number: "PostgreSQL", label: "Base de Datos" },
      { number: "Full Stack", label: "Tipo de Proyecto" },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar countCarrito={countCarrito} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-color via-secondary-color/30 to-primary-color py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/10 via-transparent to-deep-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-text-color mb-6">
              Sobre el Proyecto
            </h1>
            <div className="w-24 h-1 bg-important-color mx-auto mb-6"></div>
            <p className="text-xl text-secundary-text-color max-w-3xl mx-auto leading-relaxed">
              {projectData.description}
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-important-color/10 rounded-full border border-important-color/20">
              <span className="text-important-color font-semibold">
                💻 Proyecto de Desarrollo Web
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Historia del Proyecto */}
      <section className="py-16 bg-primary-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Historia */}
            <div className="order-2 lg:order-1">
              <div className="bg-secondary-color/20 rounded-2xl p-8 border border-important-color/10 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-text-color mb-6">
                  Historia del Proyecto
                </h2>
                <div className="w-16 h-0.5 bg-important-color mb-6"></div>
                <p className="text-secundary-text-color leading-relaxed mb-6">
                  Desarrollado en {projectData.year}, {projectData.projectName}{" "}
                  es un proyecto Full Stack que demuestra habilidades avanzadas
                  en desarrollo web moderno, combinando las mejores prácticas de
                  frontend y backend.
                </p>
                <p className="text-secundary-text-color leading-relaxed">
                  Este proyecto simula una plataforma real de reservas
                  hoteleras, implementando funcionalidades complejas como
                  autenticación, gestión de estado, bases de datos y una
                  experiencia de usuario excepcional.
                </p>
              </div>
            </div>

            {/* Imagen representativa */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                <img
                  src="/api/placeholder/600/400"
                  alt="Código del proyecto"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-important-color text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🚀 En Desarrollo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas del Stack */}
      <section className="py-16 bg-secondary-color/10 border-y border-important-color/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-color mb-4">
              Stack Tecnológico
            </h2>
            <div className="w-20 h-0.5 bg-important-color mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectData.stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary-color rounded-2xl p-6 shadow-lg border border-important-color/10 group-hover:shadow-xl group-hover:border-important-color/20 transition-all duration-300">
                  <div className="text-xl font-bold text-important-color mb-2">
                    {stat.number}
                  </div>
                  <div className="text-secundary-text-color font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-primary-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="bg-gradient-to-br from-secondary-color/20 to-transparent rounded-2xl p-8 border border-important-color/10 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-important-color/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-text-color">
                  Objetivo del Proyecto
                </h3>
              </div>
              <p className="text-secundary-text-color leading-relaxed text-center">
                {projectData.mission}
              </p>
            </div>

            {/* Visión */}
            <div className="bg-gradient-to-br from-secondary-color/20 to-transparent rounded-2xl p-8 border border-important-color/10 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-important-color/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-text-color">
                  Visión como Developer
                </h3>
              </div>
              <p className="text-secundary-text-color leading-relaxed text-center">
                {projectData.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-16 bg-secondary-color/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-color mb-4">
              Tecnologías Utilizadas
            </h2>
            <div className="w-20 h-0.5 bg-important-color mx-auto mb-6"></div>
            <p className="text-secundary-text-color max-w-2xl mx-auto">
              Stack completo de tecnologías modernas para desarrollo web
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectData.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-primary-color rounded-2xl p-6 border border-important-color/10 hover:shadow-xl hover:border-important-color/20 transition-all duration-300 group"
              >
                <div className="text-center mb-4">
                  <span className="text-3xl mb-2 block">{tech.icon}</span>
                  <h4 className="text-xl font-bold text-text-color group-hover:text-important-color transition-colors">
                    {tech.category}
                  </h4>
                </div>
                <div className="space-y-2">
                  {tech.techs.map((techName, techIndex) => (
                    <div
                      key={techIndex}
                      className="bg-secondary-color/20 rounded-lg px-3 py-1 text-sm text-secundary-text-color text-center"
                    >
                      {techName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características del Proyecto */}
      <section className="py-16 bg-primary-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-color mb-4">
              Características Implementadas
            </h2>
            <div className="w-20 h-0.5 bg-important-color mx-auto mb-6"></div>
            <p className="text-secundary-text-color max-w-2xl mx-auto">
              Funcionalidades desarrolladas que demuestran competencias técnicas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-secondary-color/20 rounded-xl p-6 border border-important-color/10 hover:shadow-xl transition-all duration-300 group"
              >
                <p className="text-secundary-text-color leading-relaxed group-hover:text-text-color transition-colors">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre el Desarrollador */}
      <section className="py-16 bg-secondary-color/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-color mb-4">
              Sobre el Desarrollador
            </h2>
            <div className="w-20 h-0.5 bg-important-color mx-auto"></div>
          </div>

          <div className="bg-primary-color rounded-2xl p-8 border border-important-color/10 hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Foto del desarrollador */}
              <div className="text-center">
                <img
                  src={projectData.developer.image}
                  alt={projectData.developer.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-important-color/20 hover:border-important-color/40 transition-all duration-300"
                />
                <h3 className="text-2xl font-bold text-text-color mt-4 mb-2">
                  {projectData.developer.name}
                </h3>
                <p className="text-important-color font-semibold mb-2">
                  {projectData.developer.title}
                </p>
                <p className="text-secundary-text-color text-sm">
                  {projectData.developer.experience}
                </p>
              </div>

              {/* Información del desarrollador */}
              <div className="lg:col-span-2">
                <p className="text-secundary-text-color leading-relaxed mb-6">
                  {projectData.developer.description}
                </p>
                <p className="text-secundary-text-color leading-relaxed mb-6">
                  {projectData.developer.learning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto y Enlaces */}
      <section className="py-16 bg-gradient-to-br from-secondary-color/20 to-transparent border-t border-important-color/10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${projectData.contact.email}`}
            className="bg-important-color hover:bg-important-color/80 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Contactar por Email
          </a>
          <a
            href={projectData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Ver en GitHub
          </a>
          <a
            href={projectData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

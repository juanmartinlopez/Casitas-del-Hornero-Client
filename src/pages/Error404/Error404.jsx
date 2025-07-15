//?---------------------------- IMPORTS --------------------------------
import { useNavigate } from "react-router-dom";
import { Footer, NavBar } from "../../components";

//?----------------- COMPONENTE ERROR404 ------------------------------------
const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-primary-color flex flex-col">
      <NavBar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Número 404 grande */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-important-color/20 leading-none">
              404
            </h1>
          </div>

          {/* Icono de casa perdida */}
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce">🏨</div>
          </div>

          {/* Título principal */}
          <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4">
            ¡Oops! Casita no encontrada
          </h2>

          {/* Descripción */}
          <p className="text-lg text-secundary-text-color mb-8 leading-relaxed">
            Parece que esta página se fue de vacaciones. <br />
            No te preocupes, tenemos muchas otras casitas esperándote.
          </p>

          {/* Línea decorativa */}
          <div className="w-20 h-0.5 bg-important-color mx-auto mb-8"></div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="px-8 py-3 bg-important-color text-white font-semibold rounded-lg 
                       hover:bg-important-color/90 transform hover:scale-105 
                       transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🏠 Volver al Inicio
            </button>

            <button
              onClick={handleGoBack}
              className="px-8 py-3 border-2 border-important-color text-important-color font-semibold rounded-lg 
                       hover:bg-important-color hover:text-white transform hover:scale-105 
                       transition-all duration-300"
            >
              ← Página Anterior
            </button>
          </div>

          {/* Sugerencias adicionales */}
          <div className="mt-12 p-6 bg-secondary-color/10 rounded-xl border border-important-color/20">
            <h3 className="text-lg font-semibold text-text-color mb-3">
              ¿Qué puedes hacer?
            </h3>
            <ul className="text-secundary-text-color space-y-2">
              <li>✨ Explorar nuestras casitas disponibles</li>
              <li>🔍 Usar el buscador para encontrar tu alojamiento ideal</li>
              <li>📞 Contactar a nuestro equipo si necesitas ayuda</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Error404;

//?---------------------------- IMPORTS --------------------------------
//?----------------- COMPONENTE LOADING ------------------------------------
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Spinner principal */}
      <div className="relative">
        {/* Anillo exterior */}
        <div className="w-16 h-16 border-4 border-secundary-text-color/30 rounded-full animate-pulse"></div>
        {/* Anillo giratorio */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-important-color rounded-full animate-spin"></div>
        {/* Punto central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-important-color rounded-full animate-ping"></div>
      </div>

      {/* Texto de carga */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-text-color mb-2">
          Cargando...
        </h3>
        <p className="text-sm text-secundary-text-color animate-pulse">
          Preparando tu experiencia perfecta
        </p>
      </div>

      {/* Puntos animados */}
      <div className="flex space-x-1 mt-4">
        <div
          className="w-2 h-2 bg-important-color rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-important-color rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-important-color rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;

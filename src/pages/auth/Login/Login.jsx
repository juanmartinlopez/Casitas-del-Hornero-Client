//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//components
import { Footer, NavBar } from "../../../components/index";
import { PedirLocalStorage } from "../../../utils/LocalStorage";
import FormularioIngresa from "./LogInForm/LogInForm";

//?----------------- COMPONENTE Login ------------------------------------
const Login = () => {
  const User = PedirLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, [User, navigate]);

  if (User) {
    return null;
  }

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="min-h-screen bg-primary-color flex flex-col">
      <NavBar />

      {/* Main Login Section */}
      <main className="mt-5 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Background Card with Gradient */}
          <div className="relative bg-secondary-color/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-deep-black/50 border border-important-color/20 overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-important-color/10 via-transparent to-deep-black/20"></div>

            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-color mb-2">
                  Bienvenido de vuelta
                </h1>
                <p className="text-secundary-text-color">
                  Ingresa a tu cuenta para continuar
                </p>
                <div className="w-16 h-1 bg-important-color mx-auto mt-4"></div>
              </div>

              {/* Login Form */}
              <FormularioIngresa />

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-secundary-text-color mb-4">
                  ¿No tienes una cuenta?
                </p>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-3 px-4 bg-gradient-to-r from-important-color to-important-color/80 hover:from-important-color/90 hover:to-important-color/70 text-deep-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:ring-offset-2 focus:ring-offset-secondary-color"
                >
                  Crear cuenta nueva
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Footer, NavBar } from "../../../components";
import { registerUser } from "../../../redux/Actions/Actions";
import validacion from "./Validation";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
  });

  const [Error, setError] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
  });

  const [currentUser, setCurrentUser] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });

    setError(validacion({ ...usuario, [property]: value }, Error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos vacíos
    if (
      !usuario.username.length ||
      !usuario.email.length ||
      !usuario.password.length ||
      !usuario.repetir.length
    ) {
      swal({
        text: "Debes completar todos los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    // Validar errores de validación
    if (
      Error.username.length > 0 ||
      Error.email.length > 0 ||
      Error.password.length > 0 ||
      Error.repetir.length > 0
    ) {
      swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (usuario.password !== usuario.repetir) {
      swal({
        text: "Las contraseñas no coinciden",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    try {
      const { username, password, email } = usuario;
      await dispatch(registerUser({ username, password, email }));

      swal({
        text: "¡Usuario registrado exitosamente!",
        icon: "success",
        buttons: "Aceptar",
      });

      // Limpiar formulario y navegar
      setUsuario({
        username: "",
        email: "",
        password: "",
        repetir: "",
      });

      navigate("/Login");
    } catch (error) {
      swal({
        text: error?.response?.data?.error || "Error al registrar usuario",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary-color flex flex-col">
      <NavBar />

      {/* Main Register Section */}
      <main className="mt-5 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-lg">
          {/* Background Card with Gradient */}
          <div className="relative bg-secondary-color/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-deep-black/50 border border-important-color/20 overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-important-color/10 via-transparent to-deep-black/20"></div>

            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-color mb-2">
                  Crear nueva cuenta
                </h1>
                <p className="text-secundary-text-color">
                  Únete a nuestra comunidad de viajeros
                </p>
                <div className="w-16 h-1 bg-important-color mx-auto mt-4"></div>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-text-color"
                  >
                    Nombre de usuario
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Ingresa tu nombre de usuario"
                      onChange={handleChange}
                      value={usuario.username}
                      className="w-full px-4 py-3 bg-primary-color/50 border border-important-color/30 rounded-xl text-text-color placeholder-secundary-text-color/60 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 hover:border-important-color/50"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-secundary-text-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  {Error.username && (
                    <p className="text-sm text-red-400 mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {Error.username}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-color"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                      onChange={handleChange}
                      value={usuario.email}
                      className="w-full px-4 py-3 bg-primary-color/50 border border-important-color/30 rounded-xl text-text-color placeholder-secundary-text-color/60 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 hover:border-important-color/50"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-secundary-text-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                  {Error.email && (
                    <p className="text-sm text-red-400 mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {Error.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-color"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Crea una contraseña segura"
                      onChange={handleChange}
                      value={usuario.password}
                      className="w-full px-4 py-3 bg-primary-color/50 border border-important-color/30 rounded-xl text-text-color placeholder-secundary-text-color/60 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 hover:border-important-color/50"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-secundary-text-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  {Error.password && (
                    <p className="text-sm text-red-400 mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {Error.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="repetir"
                    className="block text-sm font-medium text-text-color"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="repetir"
                      name="repetir"
                      placeholder="Repite tu contraseña"
                      onChange={handleChange}
                      value={usuario.repetir}
                      className="w-full px-4 py-3 bg-primary-color/50 border border-important-color/30 rounded-xl text-text-color placeholder-secundary-text-color/60 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 hover:border-important-color/50"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-secundary-text-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {Error.repetir && (
                    <p className="text-sm text-red-400 mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {Error.repetir}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-important-color to-important-color/90 hover:from-important-color/90 hover:to-important-color/80 text-deep-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:ring-offset-2 focus:ring-offset-secondary-color disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Crear cuenta
                </button>

                {/* Back to Login */}
                <div className="text-center mt-6">
                  <p className="text-secundary-text-color mb-4">
                    ¿Ya tienes una cuenta?
                  </p>
                  <Link
                    to="/Login"
                    className="inline-flex items-center text-important-color hover:text-important-color/80 transition-colors duration-300 font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Iniciar sesión
                  </Link>
                </div>

                {/* Back to Home */}
                <div className="text-center pt-4 border-t border-important-color/20">
                  <Link
                    to="/"
                    className="inline-flex items-center text-secundary-text-color hover:text-text-color transition-colors duration-300 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Volver al inicio
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;

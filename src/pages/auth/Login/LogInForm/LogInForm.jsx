// React
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Imports
import { GetUser, Login } from "../../../../redux/Actions/Actions";
import BotonAuthGoogle from "../../../../services/BotonAuthGoogle";
import { GuardarLocalStorage } from "../../../../utils/LocalStorage";
import validacion from "./Validations";

const FormularioIngresa = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHome = () => {
    navigate("/");
  };

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });
    setError(validacion({ ...usuario, [property]: value }, Error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usuario.email === "" || usuario.password === "") {
      swal({
        text: "Debes completar todos los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else if (Error.password.length > 0 || Error.email.length > 0) {
      swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else {
      try {
        const response = await dispatch(Login(usuario));

        if (response) {
          GuardarLocalStorage(response);
          dispatch(GetUser(response));

          swal({
            text: "Inicio de sesión con éxito!!",
            icon: "success",
            buttons: "Aceptar",
          });
          navigate("/");
        }
      } catch (error) {
        console.log(
          error?.response?.data?.error || "Error en el inicio de sesión"
        );
        swal({
          text: error?.response?.data?.error || "Error en el inicio de sesión",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Ingresa tu contraseña"
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

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link
            to="/OlvidasteLaPassword"
            className="text-sm text-important-color hover:text-important-color/80 transition-colors duration-300 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-important-color to-important-color/90 hover:from-important-color/90 hover:to-important-color/80 text-deep-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:ring-offset-2 focus:ring-offset-secondary-color disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-important-color/30"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="mt-4 px-4 bg-secondary-color text-secundary-text-color">
            O continúa con
          </span>
        </div>
      </div>

      {/* Google Auth Button */}
      <div className="space-y-4">
        <BotonAuthGoogle />

        {/* Guest Access */}
        <button
          onClick={handleHome}
          className="w-full py-3 px-4 bg-transparent border border-important-color/50 text-text-color hover:bg-important-color/10 hover:border-important-color rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-important-color/50 focus:ring-offset-2 focus:ring-offset-secondary-color"
        >
          Continuar como invitado
        </button>
      </div>
    </div>
  );
};

export default FormularioIngresa;

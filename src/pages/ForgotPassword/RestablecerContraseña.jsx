import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { PedirEmailLocalStorage } from "../../utils/LocalStorage/index";

const RestablecerContraseña = () => {
  const URLBASE = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [statePassword, setPassword] = useState({
    password: "",
    passwordRepetir: "",
  });
  const [Error, setPasswordError] = useState({
    password: "",
    passwordRepetir: "",
  });

  //*----------------------validacion

  const ValidacionDePassword = (state, Error) => {
    const Errores = { ...Error };

    if (!state.password.length) {
      Errores.password = "Campo Requerido";
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.password)
    ) {
      Errores.password = "";
    } else {
      Errores.password =
        "La Contraseña debe tener al menos una letra en Mayuscula, Minusculas y numeros.";
    }

    if (!state.passwordRepetir.length) {
      Errores.passwordRepetir = "Campo Requerido";
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.passwordRepetir)
    ) {
      Errores.passwordRepetir = "";
    } else {
      Errores.passwordRepetir = "Contraseña Invalida";
    }

    return Errores;
  };

  //*----------------------Cambios de estados:
  const OnchangePassword = (event) => {
    console.log(event.target);
    const propery = event.target.name;
    const value = event.target.value;

    setPasswordError(
      ValidacionDePassword({ ...statePassword, [propery]: value }, Error)
    );
    setPassword({ ...statePassword, [propery]: value });
  };

  //*------------------------Funciones de los botones:

  const FuncionCambioContraseña = async () => {
    try {
      if (
        statePassword.password.length === 0 ||
        statePassword.passwordRepetir.length === 0
      ) {
        swal({
          text: "Debes completar los campos",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else if (
        Error.password.length !== 0 ||
        Error.passwordRepetir.length !== 0
      ) {
        swal({
          text: "Tienes errores en el campo",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else {
        // Aca voy hacer el axios.put(para actualizar las contraseñas)
        const email = PedirEmailLocalStorage();
        const { password } = statePassword;

        console.log(email, password);

        await axios.put(`${URLBASE}/user/password`, {
          email,
          password,
        });
        navigate("/");
        swal({
          text: "Cambio de Contraseña Exitoso",
          icon: "success",
          buttons: "Aceptar",
        });
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const FuncionBotonSesion = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-color to-secondary-color flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-secondary-color/95 backdrop-blur-xl border border-important-color/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-important-color/20 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-text-color to-important-color bg-clip-text text-transparent mb-4">
              Mi Contraseña
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-important-color to-important-color/30 mx-auto rounded-full"></div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-text-color font-semibold text-sm tracking-wide"
                >
                  Nueva Contraseña:
                </label>
                <input
                  name="password"
                  placeholder="Ingresa Contraseña"
                  type="password"
                  className="w-full px-4 py-3 bg-primary-color/80 border-2 border-important-color/20 rounded-xl text-text-color placeholder-secundary-text-color/70 transition-all duration-300 focus:border-important-color focus:bg-primary-color/95 focus:outline-none focus:ring-4 focus:ring-important-color/10 focus:-translate-y-1 hover:border-important-color/40 hover:bg-primary-color/90"
                  onChange={OnchangePassword}
                />
                <div className="min-h-[1.5rem]">
                  {Error.password && (
                    <span className="block text-red-400 text-sm font-medium animate-pulse">
                      {Error.password}
                    </span>
                  )}
                </div>
              </div>

              {/* Repeat Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="passwordRepetir"
                  className="block text-text-color font-semibold text-sm tracking-wide"
                >
                  Repetir Contraseña:
                </label>
                <input
                  name="passwordRepetir"
                  placeholder="Ingresa Contraseña"
                  type="password"
                  className="w-full px-4 py-3 bg-primary-color/80 border-2 border-important-color/20 rounded-xl text-text-color placeholder-secundary-text-color/70 transition-all duration-300 focus:border-important-color focus:bg-primary-color/95 focus:outline-none focus:ring-4 focus:ring-important-color/10 focus:-translate-y-1 hover:border-important-color/40 hover:bg-primary-color/90"
                  onChange={OnchangePassword}
                />
                {Error.passwordRepetir && (
                  <span className="block text-red-400 text-sm font-medium animate-pulse">
                    {Error.passwordRepetir}
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 pt-4">
              <button
                onClick={FuncionBotonSesion}
                className="w-full px-6 py-3 bg-transparent border-2 border-important-color text-important-color font-semibold rounded-xl transition-all duration-300 hover:bg-important-color hover:text-primary-color hover:-translate-y-1 hover:shadow-lg hover:shadow-important-color/20 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-4 focus:ring-important-color/20"
              >
                Volver
              </button>
              <button
                onClick={FuncionCambioContraseña}
                className="w-full px-6 py-3 bg-gradient-to-r from-important-color to-important-color/80 text-primary-color font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-important-color/30 hover:from-important-color/90 hover:to-important-color active:translate-y-0 active:shadow-md focus:outline-none focus:ring-4 focus:ring-important-color/20"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestablecerContraseña;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { GuardarDatosParaCambiarPassword } from "../../utils/LocalStorage/index";

const OlvidasteLaPassword = () => {
  const Navigate = useNavigate();
  const [stateInput, setStateInput] = useState("");
  const [Errors, setErrors] = useState("");
  const URLBASE = import.meta.env.VITE_API;

  const ValidacionDelEmail = (stateInput) => {
    let Error = "";
    if (!stateInput.length) {
      Error = "Campo Requerido";
    } else if (stateInput.length > 35) {
      Error = "El email no debe superar los 35 caracteres...";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(stateInput)) {
      Error = "";
    } else {
      Error = "Email invalido";
    }

    console.log(Error);
    return Error;
  };

  const OnchangeEmail = (event) => {
    console.log(event.target.value);
    setStateInput(event.target.value);
    setErrors(ValidacionDelEmail(event.target.value));
  };

  //*----------------------------------FuncionOnclick:

  const FuncionOnclick = async () => {
    try {
      if (stateInput.length === 0) {
        swal({
          text: "Debes completar el campo",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else if (Errors.length) {
        swal({
          text: "Tienes Errores en el campo",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else {
        GuardarDatosParaCambiarPassword(stateInput);
        await axios.get(`${URLBASE}/email?email=${stateInput}`); //! cambiar en el deploy
        swal({
          text: "Te enviamos un mail con instrucciones para restablecer tu contraseña",
          icon: "success",
          buttons: "Aceptar",
        });
        Navigate("/");
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-color to-secondary-color flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-secondary-color/95 backdrop-blur-xl border border-important-color/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-important-color/20 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-text-color to-important-color bg-clip-text text-transparent mb-4">
              ¡OLVIDÉ MI CONTRASEÑA!
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-important-color to-important-color/30 mx-auto rounded-full mb-6"></div>
            <p className="text-secundary-text-color text-base leading-relaxed">
              Ingresa tu email y te enviaremos la nueva contraseña.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-text-color font-semibold text-sm tracking-wide"
              >
                Correo electrónico
              </label>
              <input
                name="email"
                placeholder="Tu Correo electronico"
                type="text"
                className="w-full px-4 py-3 bg-primary-color/80 border-2 border-important-color/20 rounded-xl text-text-color placeholder-secundary-text-color/70 transition-all duration-300 focus:border-important-color focus:bg-primary-color/95 focus:outline-none focus:ring-4 focus:ring-important-color/10 focus:-translate-y-1 hover:border-important-color/40 hover:bg-primary-color/90"
                onChange={OnchangeEmail}
              />
              {Errors && (
                <span className="block text-red-400 text-sm font-medium mt-2 animate-pulse">
                  {Errors}
                </span>
              )}
            </div>

            <button
              onClick={FuncionOnclick}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-important-color to-important-color/80 text-primary-color font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-important-color/30 hover:from-important-color/90 hover:to-important-color active:translate-y-0 active:shadow-md focus:outline-none focus:ring-4 focus:ring-important-color/20"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlvidasteLaPassword;

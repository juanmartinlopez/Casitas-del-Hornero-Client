import { useState } from "react";
import "./OlvidasteLaPassword.css";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { PedirEmailLocalStorage } from "../Index";
import { updateLanguage } from "../../redux/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";

const RestablecerContraseña = () => {
  const navigate = useNavigate();
  const [statePassword, setPassword] = useState({
    password: "",
    passwordRepetir: "",
  });
  const [Error, setPasswordError] = useState({
    password: "",
    passwordRepetir: "",
  });

  //Idioma:

  const idioma = useSelector((state) => state.idioma);
  const dispatch = useDispatch();
  const toggleLang = (event) => {
    dispatch(updateLanguage(event.target.value));
  };
  const translations = {
    en: {
      CampoRequerido: "Required field",
      ContraseñaMayus: `Password must have
      at least one capital letter
      , Lowercase and numbers.`,
      ContraseñaInvalida: "Invalid Password",
      CompletarCampos: "You must complete the fields",
      Aceptar: "Accept",
      ErroresCampo: "You have Errors in the field",
      MiContraseña: "MY PASSWORD",
      NuevaContraseña: "New Password",
      IngresaContraseña: "Enter your Password.",
      RepetirContraseña: "Repeat your Password.",
      Continuar: "Continue",
      Volver: "Return",
    },
    es: {
      CampoRequerido: "Campo Requerido",
      ContraseñaMayus: `La Contraseña debe tener 
      al menos una letra en Mayuscula
      , Minusculas y numeros.`,
      ContraseñaInvalida: `Contraseña Invalida`,
      CompletarCampos: "Debes completar los campos",
      Aceptar: "Aceptar",
      ErroresCampo: "Tienes errores en el campo",
      MiContraseña: "MI CONTRASEÑA",
      NuevaContraseña: "Nueva Contraseña",
      IngresaContraseña: "Ingresa tu Contraseña.",
      RepetirContraseña: "Repetir Contraseña",
      Continuar: "Continuar",
      Volver: "Volver",
    },
  };

  //*----------------------validacion

  const ValidacionDePassword = (state, Error) => {
    const Errores = { ...Error };

    if (!state.password.length) {
      Errores.password = translations[idioma].CampoRequerido;
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.password)
    ) {
      Errores.password = "";
    } else {
      Errores.password = translations[idioma].ContraseñaMayus;
    }

    if (!state.passwordRepetir.length) {
      Errores.passwordRepetir = translations[idioma].CampoRequerido;
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.passwordRepetir)
    ) {
      Errores.passwordRepetir = "";
    } else {
      Errores.passwordRepetir = translations[idioma].ContraseñaInvalida;
    }

    return Errores;
  };

  //*----------------------Cambios de estados:
  const OnchangePassword = (event) => {
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
          text: translations[idioma].CompletarCampos,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      } else if (
        Error.password.length !== 0 ||
        Error.passwordRepetir.length !== 0
      ) {
        swal({
          text: translations[idioma].ErroresCampo,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      } else {
        // Aca voy hacer el axios.put(para actualizar las contraseñas)
        const email = PedirEmailLocalStorage();
        const { password } = statePassword;

        await axios.put(
          `https://casitasdelhornero.onrender.com/user/password`,
          {
            email,
            password,
          }
        );
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
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  const FuncionBotonSesion = () => {
    navigate("/");
  };

  return (
    <>
      <div className="card_Padre_Supremo_sayayin">
        <div className="idioma">
          🌐
          <select value={idioma} onChange={toggleLang}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="card_Padre_Supremo">
          <div className="card">
            <div className="div_Span_Title">
              <span className="card__title">
                {translations[idioma].MiContraseña}
              </span>
            </div>
            <div className="card__form">
              <div className="container_email">
                <label htmlFor="password">
                  {translations[idioma].NuevaContraseña}:
                </label>
                <input
                  name="password"
                  placeholder={translations[idioma].IngresaContraseña}
                  type="password"
                  onChange={OnchangePassword}
                />
                <div className="DivSpanPassword">
                  <span className="spanError">{Error.password}</span>
                </div>
                <br />
                <label htmlFor="passwordRepetir">
                  {translations[idioma].RepetirContraseña}:
                </label>
                <input
                  name="passwordRepetir"
                  placeholder={translations[idioma].IngresaContraseña}
                  type="password"
                  onChange={OnchangePassword}
                />
                <span className="spanError">{Error.passwordRepetir}</span>
              </div>
              <button onClick={FuncionBotonSesion} className="boton-volver">
                {translations[idioma].Volver}
              </button>
              <button
                onClick={FuncionCambioContraseña}
                className="boton-siguiente"
              >
                {translations[idioma].Continuar}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestablecerContraseña;

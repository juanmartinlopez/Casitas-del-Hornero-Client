import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./OlvidasteLaPassword.css";
import { GuardarDatosParaCambiarPassword } from "../Index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OlvidasteLaPassword = () => {
  const Navigate = useNavigate();
  const [stateInput, setStateInput] = useState("");
  const [Errors, setErrors] = useState("");
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      CampoRequerido: "Required field",
      ErrorCaracteres: "Email must not exceed 35 characters...",
      ErrorEmail: "Invalid Email",
      ErrorCampo: "You must complete the field",
      Aceptar: "Accept",
      ErroresCampo: "You have Errors in the field",
      EnviamosMail:
        "We have sent you an email with instructions to reset your password",
      OlvideContraseña: "I FORGOT MY PASSWORD!",
      MailYContraseñaNueva:
        " Enter your email and we will send you the new password.",
      Mail: "Email",
      Continuar: "Continue",
      TuMail: "Your Email",
    },
    es: {
      CampoRequerido: "Campo Requerido",
      ErrorCaracteres: "El email no debe superar los 35 caracteres...",
      ErrorEmail: "Email invalido",
      ErrorCampo: "Debes completar el campo",
      Aceptar: "Aceptar",
      ErroresCampo: "Tienes Errores en el campo",
      EnviamosMail:
        "Te enviamos un mail con instrucciones para restablecer tu contraseña",
      OlvideContraseña: "OLVIDE MI CONTRASEÑA!",
      MailYContraseñaNueva:
        " Ingresa tu email y te enviaremos la nueva contraseña.",
      Mail: "Correo electrónico",
      Continuar: "Continuar",
      TuMail: "Tu Correo electronico",
    },
  };

  const ValidacionDelEmail = (stateInput) => {
    let Error = "";
    if (!stateInput.length) {
      Error = translations[idioma].CampoRequerido;
    } else if (stateInput.length > 35) {
      Error = translations[idioma].ErrorCaracteres;
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(stateInput)) {
      Error = "";
    } else {
      Error = translations[idioma].ErrorEmail;
    }

    return Error;
  };

  const OnchangeEmail = (event) => {
    setStateInput(event.target.value);
    setErrors(ValidacionDelEmail(event.target.value));
  };

  //*----------------------------------FuncionOnclick:

  const FuncionOnclick = async () => {
    try {
      if (stateInput.length === 0) {
        swal({
          text: translations[idioma].ErrorCampo,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      } else if (Errors.length) {
        swal({
          text: translations[idioma].ErroresCampo,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      } else {
        GuardarDatosParaCambiarPassword(stateInput);
        await axios.get(
          `https://casitasdelhornero.onrender.com/email?email=${stateInput}`
        ); //! cambiar en el deploy
        swal({
          text: translations[idioma].EnviamosMail,
          icon: "success",
          buttons: translations[idioma].Aceptar,
        });
        Navigate("/");
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  return (
    <>
      <div className="card_Padre_Supremo_sayayin">
        <div className="card_Padre_Supremo">
          <div className="card">
            <div className="div_Span_Title">
              <span className="card__title">
                {translations[idioma].OlvideContraseña}
              </span>
            </div>
            <p className="card__content">
              {translations[idioma].MailYContraseñaNueva}
            </p>
            <div className="card__form">
              <div className="container_email">
                <label htmlFor="email">{translations[idioma].Mail}</label>
                <br />
                <input
                  name="email"
                  placeholder={translations[idioma].TuMail}
                  type="text"
                  className="inputEmail"
                  onChange={OnchangeEmail}
                />
              </div>
              <span className="spanError">{Errors}</span>
              <button onClick={FuncionOnclick} className="sign-up">
                {translations[idioma].Continuar}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlvidasteLaPassword;

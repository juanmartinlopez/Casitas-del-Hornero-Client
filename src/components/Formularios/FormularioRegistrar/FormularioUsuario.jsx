import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validacion2 from "./Validation";
import style from "./FormularioUsuario.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const FormularioUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idioma = useSelector((state) => state.idioma);

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
    admin: false,
  });

  const [Error, setError] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
    admin: false,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });

    setError(validacion2({ ...usuario, [property]: value }, Error));
  };

  const onChange = () => {
    if (usuario.admin === false) {
      setUsuario({ ...usuario, admin: true });
    } else {
      setUsuario({ ...usuario, admin: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !usuario.username.length ||
      !usuario.email.length ||
      !usuario.password.length ||
      !usuario.repetir.length
    ) {
      alert(
        idioma === "es"
          ? "Debes completar los campos"
          : "Please fill in all fields"
      );
    } else if (
      Error.username.length > 0 ||
      Error.email.length > 0 ||
      Error.password.length > 0 ||
      Error.repetir.length > 0
    ) {
      alert(
        idioma === "es"
          ? "Tienes errores en los campos"
          : "You have errors in the fields"
      );
    } else {
      try {
        const { username, password, email, admin } = usuario;
        await axios.post(
          `https://casitasdelhornero.onrender.com/user`,
          { username, password, email, admin }
        );
        swal({
          text:
            idioma === "es"
              ? "Usuario registrado con éxito"
              : "User registered successfully",
          icon: "success",
          buttons: idioma === "es" ? "Aceptar" : "Accept",
        });
        navigate("/");
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: idioma === "es" ? "Aceptar" : "Accept",
        });
      }
    }

    if (
      usuario.username === "" ||
      usuario.email === "" ||
      usuario.password === "" ||
      usuario.repetir === ""
    )
      swal({
        text:
          idioma === "es"
            ? "Necesitas completar las áreas"
            : "You need to fill in the fields",
        icon: "warning",
        buttons: idioma === "es" ? "Aceptar" : "Accept",
      });

    if (
      db.find(
        (user) =>
          user.email === usuario.email || user.username === usuario.username
      )
    ) {
      swal({
        text:
          idioma === "es"
            ? "El correo electrónico o el nombre de usuario ya existe"
            : "The email or username already exists",
        icon: "warning",
        buttons: idioma === "es" ? "Aceptar" : "Accept",
      });
    }
    if (usuario.password !== usuario.repetir) {
      swal({
        text:
          idioma === "es"
            ? "La contraseña no coincide"
            : "The password does not match",
        icon: "warning",
        buttons: idioma === "es" ? "Aceptar" : "Accept",
      });
    } else {
      {
        window.location.href = "Home";
      }
      swal({
        text: idioma === "es" ? "Usuario creado" : "User created",
        icon: "success",
        buttons: idioma === "es" ? "Aceptar" : "Accept",
      });
    }

    setUsuario({
      username: "",
      email: "",
      password: "",
      repetir: "",
    });
  };

  const getLabelText = (labelKey) => {
    const translations = {
      es: {
        username: "Nombre de usuario",
        email: "Correo electrónico",
        password: "Contraseña",
        repetir: "Repetir contraseña",
        hotelRegistration: "¡Quiero registrar mi hotel!",
        registerButton: "Registrar",
      },
      en: {
        username: "Username",
        email: "Email",
        password: "Password",
        repetir: "Repeat password",
        hotelRegistration: "Register my hotel!",
        registerButton: "Register",
      },
    };

    return translations[idioma][labelKey];
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">
          {idioma === "es" ? "Ingresa" : "Login"}
        </h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={handleChange}
            value={usuario.username}
            name="username"
          />
          <span className={style.span}>{Error.username}</span>
          <label>{getLabelText("username")}</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={handleChange}
            value={usuario.email}
            name="email"
          />
          <span className={style.span}>{Error.email}</span>
          <label>{getLabelText("email")}</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={handleChange}
            value={usuario.password}
            name="password"
          />
          <span className={style.span}>{Error.password}</span>
          <label>{getLabelText("password")}</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={handleChange}
            value={usuario.repetir}
            name="repetir"
          />
          <span className={style.span}>{Error.repetir}</span>
          <label>{getLabelText("repetir")}</label>
        </div>

        <div className="checkbox">
          <input
            className="box"
            type="checkbox"
            value="remember-me"
            indeterminate
            onClick={onChange}
          />
          <label>{getLabelText("hotelRegistration")}</label>
        </div>

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          {getLabelText("registerButton")}
        </button>
      </form>
      {/* <a href="$"> Olvidé mi contraseña </a> */}
    </div>
  );
};

export default FormularioUsuario;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validacion2 from "./Validation";
import style from "./FormularioUsuario.module.css";
import "./FormularioLocal.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const FormLocal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idioma = useSelector((state) => state.idioma);
  const translations = {
    en: {
      Welcome: "Welcome",
      Username: "Username",
      Email: "Email",
      Password: "Password",
      RepeatPassword: "Repeat Password",
      CompleteFields: "You must complete all fields",
      FieldErrors: "You have errors in the fields",
      UserRegisteredSuccess: "User registered successfully!",
      UserExists: "The email or username already exists",
      PasswordMismatch: "The password does not match",
      CreateUser: "Create User",
      Back: "Back",
      Aceptar: "Accept",
    },
    es: {
      Welcome: "Bienvenido",
      Username: "Nombre de usuario",
      Email: "Email",
      Password: "Contraseña",
      RepeatPassword: "Repetir contraseña",
      CompleteFields: "Debes completar todos los campos",
      FieldErrors: "Tienes errores en los campos",
      UserRegisteredSuccess: "¡Usuario registrado exitosamente!",
      UserExists: "El email o nombre de usuario ya existe",
      PasswordMismatch: "Las contraseñas no coinciden",
      CreateUser: "Crear Usuario",
      Back: "Volver",
      Aceptar: "Aceptar",
    },
  };

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

  const [state, setState] = useState(0);

  const [currentUser, setCurrentUser] = useState({});

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
      swal({
        text: translations[idioma].CompleteFields,
        icon: "warning",
        buttons: "Aceptar",
      });
    } else if (
      Error.username.length > 0 ||
      Error.email.length > 0 ||
      Error.password.length > 0 ||
      Error.repetir.length > 0
    ) {
      swal({
        text: translations[idioma].FieldErrors,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    } else {
      try {
        const { username, password, email } = usuario;
        await axios.get(
          `https://casitasdelhornero.onrender.com/email/Registro/${email}`
        ); //! cambiar en el deploy
        await axios.post(
          `https://casitasdelhornero.onrender.com/user`,
          { username, password, email }
        );

        swal({
          text: translations[idioma].UserRegisteredSuccess,
          icon: "success",
          buttons: translations[idioma].Aceptar,
        });
        navigate("/");
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
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
        text: translations[idioma].CompleteFields,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });

    if (
      db.find(
        (user) =>
          user.email === usuario.email || user.username === usuario.username
      )
    ) {
      swal({
        text: translations[idioma].UserExists,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
    if (usuario.password !== usuario.repetir) {
      swal({
        text: translations[idioma].PasswordMismatch,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    } else {
      {
        window.location.href = "Home";
      }
      swal({
        text: "usuario creado",
        icon: "success",
        buttons: translations[idioma].Aceptar,
      });
    }

    setUsuario({
      username: "",
      email: "",
      password: "",
      repetir: "",
    });
  };
  //   if (
  //     db.find(
  //       (user) =>
  //         user.email === usuario.email || user.username === usuario.username
  //     )
  //   ) {
  //     swal({
  //       text: "El email o usuario ya existe",
  //       icon: "warning",
  //       buttons: "Aceptar",
  //     });
  //   }
  //   if (usuario.password !== usuario.repetir) {
  //     swal({
  //       text: "La password no coincide",
  //       icon: "warning",
  //       buttons: "Aceptar",
  //     });
  //   } else {
  //     {
  //       window.location.href = "Home";
  //     }
  //     swal({
  //       text: "usuario creado",
  //       icon: "success",
  //       buttons: "Aceptar",
  //     });
  //   }

  //   setUsuario({
  //     username: "",
  //     email: "",
  //     password: "",
  //     repetir: "",
  //   });
  // };

  return (
    <div className="DivContenedorPadre">
      <div className="form-container">
        <div className="DivDeBienvenido">
          <h1 className="h3 mb-3 fw-normal">
            {translations[idioma].Welcome} {currentUser.displayName}
          </h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">{translations[idioma].Username}</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={handleChange}
              value={usuario.username}
            />
          </div>
          <span className={style.span}>{Error.username}</span>

          <div className="input-group">
            <label htmlFor="email">{translations[idioma].Email}</label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              onChange={handleChange}
              value={usuario.email}
            />
          </div>
          <span className={style.span}>{Error.email}</span>

          <div className="input-group">
            <label htmlFor="password">{translations[idioma].Password}</label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={handleChange}
              value={usuario.password}
            />
          </div>
          <span className={style.span}>{Error.password}</span>

          <div className="input-group">
            <label htmlFor="repetir">
              {translations[idioma].RepeatPassword}
            </label>
            <input
              type="password"
              name="repetir"
              id="repetir"
              placeholder=""
              onChange={handleChange}
              value={usuario.repetir}
            />
          </div>
          <span className={style.span}>{Error.repetir}</span>
          <button className="sign" type="submit">
            {translations[idioma].CreateUser}
          </button>
          <Link to="/">
            <button type="button" className="w-100 btn btn-lg btn-warning">
              {translations[idioma].Back}
            </button>
          </Link>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default FormLocal;

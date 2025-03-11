import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../../GoogleAuth/AuthProvider";
import { existsUsername, updateUser } from "../../../Firebase/Firebase";

const FormGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Welcome: "Welcome",
      NotRegistered: "It seems you are not registered :/",
      FinishProcess: "To finish the process, choose a username",
      UsernameExists: "Username already exists",
      Username: "Username",
      Continue: "Continue",
      Congrats: "Congratulations, user created successfully",
      ContinueLink: "Continue",
    },
    es: {
      Welcome: "¡Bienvenido",
      NotRegistered: "Parece que no estás registrado :/",
      FinishProcess: "Para terminar el proceso, elige un nombre de usuario",
      UsernameExists: "Nombre de usuario ya existe",
      Username: "Nombre de usuario",
      Continue: "Continuar",
      Congrats: "Felicidades, usuario creado con éxito",
      ContinueLink: "Continuar",
    },
  };

  const [username, setUsername] = useState("");
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const handleUserLoggedIn = () => {
    navigate("/Home");
  };

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setState(3);
  };

  const handleUserNotLoggedIn = () => {
    navigate("/");
  };

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleContinue = async () => {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  };

  if (state === 3 || state === 5) {
    return (
      <div className="container">
        <h1>
          {translations[idioma].Welcome} {currentUser.displayName}!
        </h1>
        <h3>{translations[idioma].NotRegistered}</h3>
        <p>{translations[idioma].FinishProcess}</p>
        {state === 5 ? <p>{translations[idioma].UsernameExists}</p> : ""}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={handleInputUsername}
          />
          <label>{translations[idioma].Username}</label>
        </div>
        <button
          className="w-100 btn btn-lg btn-warning"
          onClick={handleContinue}
        >
          {translations[idioma].Continue}
        </button>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div>
        <h1>{translations[idioma].Congrats}</h1>
        <Link to="/Home">{translations[idioma].ContinueLink}</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
};

export default FormGoogle;

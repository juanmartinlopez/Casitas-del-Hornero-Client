import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { existsUsername, updateUser } from "../../../Firebase/Firebase";
import AuthProvider from "../../../services/AuthProvider";

const FormGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const handleUserLoggedIn = () => {
    navigate("/");
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
        <h1>¡Bienvenido {currentUser.displayName}!</h1>
        <h3>Parece que no estás registrado</h3>
        <p>Para terminar el proceso, elige un nombre de usuario</p>
        {state === 5 ? <p>Nombre de usuario ya existe</p> : ""}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={handleInputUsername}
          />
          <label>Nombre de usuario</label>
        </div>
        <button
          className="w-100 btn btn-lg btn-warning"
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div>
        <h1>Felicidades, usuario creado con éxito</h1>
        <Link to="/">Continuar</Link>
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

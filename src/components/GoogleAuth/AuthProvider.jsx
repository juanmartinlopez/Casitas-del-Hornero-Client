import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../../Firebase/Firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuardarLocalStorage } from "../Index";
import axios from "axios";
import swal from "sweetalert";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //Si el usuario exite (FireBase) entonces pide la informacion a google del usuario.
          const userInfo = await getUserInfo(user.uid);

          try {
            //Encontro el usuario en le base de datos de firebase y lo intenta ingresar
            let userBack = {
              password: userInfo.uid,
              email: userInfo.correo,
            };
            //Una vez logueado en google, intenta realizar el logueo en la base de datos.
            const userActual = await axios.post(
              "https://casitasdelhornero.onrender.com/user",
              userBack
            );
            //Si lo realiza, se guarda la informacion en el local storage.
            GuardarLocalStorage({
              id: userActual.data.id,
              email: userActual.data.email,
              username: userActual.data.username,
              rol: userActual.data.rol,
            });
          } catch (error) {
            //Si exite en la base de datos de firebase, pero no exite en la base de datos de la casita del horenro, crea el usuario
            if (error.response.data.error === "Usuario bloqueado") {
              swal({
                text: error.response.data.error,
                icon: "warning",
                buttons: "Aceptar",
              });
            }

            const userBack = {
              password: userInfo.uid,
              email: userInfo.correo,
              username: userInfo.displayName,
            };
            await axios.post(
              "https://casitasdelhornero.onrender.com/user",
              userBack
            );

            //Una vez creado el usuario, se loguea en la pagina y se guarda su informacion en el Local Storage.
            const userBackLogin = {
              password: userInfo.uid,
              email: userInfo.correo,
            };
            const userActual = await axios.post(
              "https://casitasdelhornero.onrender.com/user",
              userBackLogin
            );

            GuardarLocalStorage({
              id: userActual.data.id,
              email: userActual.data.email,
              username: userActual.data.username,
              rol: userActual.data.rol,
            });
          }
          onUserLoggedIn();
        }
        //cuando no se encuentra un usuario registrado (FireBase) entonces se crea una usuario newUser el cual se guarda en firebase y un userBack que es el que manda la info al Local Storage
        else {
          const newUser = {
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: user.displayName,
            processCompleted: false,
            correo: user.email,
          };

          //Creo el usuario en el back
          await registerNewUser(newUser);
          const userBack = {
            password: newUser.uid,
            email: newUser.correo,
            username: newUser.displayName,
          };
          await axios.post(
            "https://casitasdelhornero.onrender.com/user",
            userBack
          );

          //Logueo al usuario en el back
          const userBackLogin = {
            password: newUser.uid,
            email: newUser.correo,
          };
          const userActual = await axios.post(
            "https://casitasdelhornero.onrender.com/user",
            userBackLogin
          );
          GuardarLocalStorage({
            id: userActual.data.id,
            email: userActual.data.email,
            username: userActual.data.username,
            rol: userActual.data.rol,
          });
          onUserLoggedIn();
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
};

export default AuthProvider;

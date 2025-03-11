import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imageCarrito from "../../assets/icons/carrito-de-compras.png";
import carritoblanco from "../../assets/icons/carrito-de-compras-blanco.png";
import imagenSesion from "../../assets/icons/perfil.png";
import imagenUsuario from "../../assets/icons/usuario (1).png";
import { PedirLocalStorage, ClearLocalStorage } from "../Index";
import { LogOut } from "../../redux/Actions/Actions";
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";
import SymbolsCurrency from "../CurrencyExchange/SymbolsCurrency";
import "./Nav.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import SwitchButtonFlex from "../SwitchButton/SwitchButtonFlex";
import SymbolsCurrencyFlex from "../CurrencyExchange/SymbolsCurrencyFlex";
import { updateLanguage } from "../../redux/Actions/Actions";

// import "NavButon.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = ({ countCarrito }) => {
  // const User = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let User = PedirLocalStorage();

  // let { username, rol } = User;

  let username, rol;
  if (User) {
    username = User.username;
    rol = User.rol;
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const theme = useSelector((state) => state.theme);
  const idioma = useSelector((state) => state.idioma);
  const [isOpen, setIsOpen] = useState(false);


  const translations = {
    en: {
      VerPerfil: "View profile",
      Logout: "Logout",
      IniciarSesion: "Login",
      ProveerHotel: "Provide Hotel",
      AdministrarUsuarios: "Manage Users",
      QuieroSerProveedor: "I want to be a supplier",
      Salir: "Log out",
    },
    es: {
      VerPerfil: " Ver Perfil",
      Logout: "Cerrar Sesión",
      IniciarSesion: "Iniciar Sesión",
      ProveerHotel: "Proveer Hotel",
      AdministrarUsuarios: "Administrar Usuarios",
      QuieroSerProveedor: "Quiero ser proveedor",
      Salir: "Salir",
    },
  };



  const toggleLang = (event) => {
    dispatch(updateLanguage(event.target.value));
  };
  const handleLogout = () => {
    logout();
  };

  const handleVerPerfil = () => {
    navigate("/Perfil");
  };
  const handleChangeTipoCuenta = () => {
    navigate("/UserForm");
  };
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setShowNavbar(false);
    }
  }, [windowWidth]);

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      dispatch(LogOut());
    }
    ClearLocalStorage();
    location.reload();
  };

  if (windowWidth > 1080) {
    return (
      <div>
        <div className={theme === "light" ? "navlight" : "navdark"}>
          <NavLink to={"/Home"} className="links">
            <div className="logo">
              <img
                className="img"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
                alt="LaCasitaDelHornero"
              />
              <div className="tituloLogo">CasitasDelHornero</div>
            </div>
          </NavLink>
          <SwitchButton />
          <SymbolsCurrency />
          <div className="idioma">
            🌐
            <select value={idioma} onChange={toggleLang}>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          {rol === 1 ? (
            <Link to={"/Carrito"} style={{ "text-decoration": "none" }}>
              <div className="divCarritoCount">
                <div className="countCarritoDiv">
                  <span>{countCarrito}</span>
                </div>
                <img
                  className="iconoCarrito"
                  src={theme === "light" ? imageCarrito : carritoblanco}
                />
              </div>
            </Link>
          ) : (
            <></>
          )}
          <div>
            {username ? (
              theme === "dark" ? (
                <div className="contenedor-elementos-dark">
                  <div className="nombre-usuario-dark">{`${username}`}</div>
                  <div className="contenedor-opciones-dark">
                    <button
                      onClick={handleVerPerfil}
                      className="botoncito-dark"
                    >
                      {translations[idioma].VerPerfil}
                    </button>

                    <button onClick={handleLogout} className="botoncito-dark">
                      {translations[idioma].Salir}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="contenedor-elementos">
                  <div className="nombre-usuario">{`${username}`}</div>
                  <div className="contenedor-opciones">
                    <button onClick={handleVerPerfil} className="botoncito">
                      {translations[idioma].VerPerfil}
                    </button>

                    <button onClick={handleLogout} className="botoncito">
                      {translations[idioma].Salir}
                    </button>
                  </div>
                </div>
              )
            ) : (
              <button onClick={handleGoHome} className="boton-inicia-sesion">
                {" "}
                {translations[idioma].IniciarSesion}{" "}
              </button>
            )}
          </div>

        </div>
      </div>
    );
  } else {
    return (

      <div className={theme === 'light' ? 'navflex' : 'navflex-dark'}>
        <div>
          <NavLink to={"/Home"}>
            <div>
              <img
                className="img"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
                alt="LaCasitaDelHornero"
              />
            </div>
          </NavLink>
        </div>
        <div className="idioma">
          🌐
          <select value={idioma} onChange={toggleLang}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className={`${theme} ${isOpen && "open"}`}>
          <div>
            {username ? (
              theme === "dark" ? (
                <div className="contenedor-elementos-dark">
                  <div className="nombre-usuario-dark-flex">{`${username}`}</div>
                  <div className="contenedor-opciones-dark">
                    <button
                      onClick={handleVerPerfil}
                      className="botoncito-dark"
                    >
                      {translations[idioma].VerPerfil}
                    </button>

                    <button onClick={handleLogout} className="botoncito-dark">
                      {translations[idioma].Salir}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="contenedor-elementos">
                  <div className="nombre-usuario">{`${username}`}</div>
                  <div className="contenedor-opciones">
                    <button onClick={handleVerPerfil} className="botoncito">
                      {translations[idioma].VerPerfil}
                    </button>

                    <button onClick={handleLogout} className="botoncito">
                      {translations[idioma].Salir}
                    </button>
                  </div>
                </div>
              )
            ) : (
              <button onClick={handleGoHome} className="boton-inicia-sesion">
                {" "}
                {translations[idioma].IniciarSesion}{" "}
              </button>
            )}
          </div>
          <div>
            <SwitchButton />
          </div>
          <div>
            <SymbolsCurrencyFlex />
          </div>
          <div>
            {rol === 1 ?
              (
                <Link to={"/Carrito"}>
                  <div className="divCarritoCount">
                    <div className="countCarritoDiv">{countCarrito}</div>
                    <img
                      className="iconoCarrito"
                      src={theme === "light" ? imageCarrito : carritoblanco}
                    />
                  </div>
                </Link>
              ) : (
                <></>
              )
            }
          </div>

        </div>
        <div className={`navtoggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
};

export default NavBar;

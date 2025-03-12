//?---------------------------- IMPORTS --------------------------------
//react
// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import style from "./NavDetail.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import image from "../../image/carrito-de-compras.png";
import horneroicono from "../../assets/images/horneroleft.jpg"

//?----------------- COMPONENTE NAVBAR DETAIL ------------------------------------
const NavDetail = () => {
  const Email = useSelector((state) => state.Email);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      IniciarSesion: "Login",
    },
    es: {
      IniciarSesion: "Iniciar Sesion",
    },
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
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

  return (
    <>
      <div className={style.nav}>
        <div className={style.logo}>
          <img
            className={style.img}
            src={horneroicono}
            alt="LaCasitaDelHornero"
          />
          <p className={style.p}>CasitasDelHornero</p>
        </div>

        <div
          className={
            showNavbar || windowWidth > 768
              ? `${style.links} ${style.show}`
              : style.links
          }
        >
          {Email ? (
            <NavLink
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <p>{`${Email}`}</p>
            </NavLink>
          ) : (
            <NavLink
              to={"/"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <p>{translations[idioma].IniciarSesion}</p>
            </NavLink>
          )}
          <NavLink
            to={"/Home"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/Carrito"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            <img className={style.iconoCarrito} src={image} />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavDetail;

import {
  faBars,
  faHome,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

import { LogOut } from "../../redux/Actions/Actions";
import {
  ClearLocalStorage,
  PedirLocalStorage,
} from "../../utils/LocalStorage/index";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = ({ countCarrito }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = PedirLocalStorage();

  let username, rol;
  if (User) {
    username = User.username;
    rol = User.rol;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest(".user-menu")) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
  };

  const handleVerPerfil = () => {
    navigate("/Perfil");
    setIsOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/Login");
    setIsOpen(false);
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      dispatch(LogOut());
    }
    ClearLocalStorage();
    setUserMenuOpen(false);
    location.reload();
  };

  const navItems = [
    { name: "Inicio", href: "/", icon: faHome },
    { name: "Sobre el Proyecto", href: "/aboutus" },
    { name: "Carrito", href: "/cart" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-color backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center space-x-2 no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-elegant-gold to-elegant-gold-dark rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faHome}
                  className="w-6 h-6 text-deep-black"
                />
              </div>{" "}
              <span
                className="text-2xl font-bold transition-colors duration-300 text-text-color no-underline to-elegant-gold-dark"
                style={{ color: "var(--text-color)" }}
              >
                CasitasDelHornero
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {" "}
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-elegant-gold hover:text-deep-black no-underline"
                  style={{
                    color: "var(--text-color)",
                    textDecoration: "none",
                  }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side - Cart, User Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Cart Icon (only for rol 1) */}
            {rol === 1 && (
              <Link to="/Carrito" className="relative">
                {" "}
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color: "var(--text-color)" }}
                />
                {countCarrito > 0 && (
                  <span className="absolute -top-2 -right-2 bg-elegant-gold text-deep-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {countCarrito}
                  </span>
                )}
              </Link>
            )}

            {/* User Actions */}
            {username ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 hover:bg-elegant-gold hover:text-deep-black"
                  style={{ color: "var(--text-color)" }}
                >
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  <span className="text-sm font-medium">{username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-primary-color rounded-md shadow-lg border border-important-color/20 py-1 z-50">
                    <button
                      onClick={handleVerPerfil}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-elegant-gold hover:text-deep-black"
                      style={{ color: "var(--text-color)" }}
                    >
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                      <span>Ver Perfil</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-elegant-gold hover:text-deep-black"
                      style={{ color: "var(--text-color)" }}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="w-4 h-4"
                      />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 hover:bg-elegant-gold hover:text-deep-black no-underline"
                style={{
                  color: "var(--text-color)",
                  textDecoration: "none",
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {" "}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 hover:bg-important-color/20"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary-color backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="hover:bg-elegant-gold hover:text-deep-black block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                style={{ color: "var(--text-color)" }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Cart Link (only for rol 1) */}
            {rol === 1 && (
              <Link
                to="/Carrito"
                className="relative hover:bg-elegant-gold hover:text-deep-black flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                style={{ color: "var(--text-color)" }}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                {countCarrito > 0 && (
                  <span className="absolute -top-2 -right-2 bg-elegant-gold text-deep-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {countCarrito}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile User Actions */}
            {username ? (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <div className="px-3 py-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-color)" }}
                  >
                    {username}
                  </span>
                </div>
                <button
                  onClick={handleVerPerfil}
                  className="hover:bg-elegant-gold hover:text-deep-black flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  style={{ color: "var(--text-color)" }}
                >
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  <span>Ver Perfil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="hover:bg-elegant-gold hover:text-deep-black flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  style={{ color: "var(--text-color)" }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={handleLogin}
                  className="hover:bg-elegant-gold hover:text-deep-black flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  style={{ color: "var(--text-color)" }}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

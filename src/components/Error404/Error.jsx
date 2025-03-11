import { Link } from "react-router-dom";
import { Footer, NavBar } from "../Index";
import "./Error.css";

const Error404 = () => {
  return (
    <>
      <NavBar />

      <section className="section">
        <div className="containerPadreError">
          <div className="containerError">
            <div className="divDeLaImagen">
              <img
                className="imagenHornero"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
            </div>
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <div className="divDelContenido">
              <p className="p">
                Lo sentimos, no hemos podido encontrar la página que buscabas.
              </p>
              <p className="p">En caso de no haber iniciado sesión</p>
              <p className="p">Vuelve a la página de inicio</p>
              <div className="divDelBotonInicio">
                <Link to={"/Home"}>
                  <button className="botonInicio">Ir a inicio</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error404;

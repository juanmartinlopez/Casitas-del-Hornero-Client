import { useState } from "react";
import validacion from "./Validations";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
// import style from "./FormularioTipoHabitacion.module.css";
import { useSelector } from "react-redux";
import NavBar from "../../Nav/Nav";
import { PedirLocalStorage } from "../../Index";
import styleLight from "./FormularioTipoHabitacion.module.css";
import styleDark from "./FormularioTipoHabitacionDark.module.css";

const FormularioTipoHab = (props) => {
  const URL_BASE = "https://casitasdelhornero.onrender.com";
  const navigate = useNavigate();
  const User = PedirLocalStorage();
  const { state } = useLocation();
  const idHotelForm = useSelector((state) => state.idHotelForm);
  const id = state?.id_hotel || idHotelForm;

  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;
  console.log(id);

  const resetTipoHab = {
    people: "",
    price: "",
    name: "",
    image: "",
    stock: "",
    id_user: User.id,
    id_hotel: id,
  };
  const [tipoHab, setTipoHab] = useState(resetTipoHab);
  const [error, setError] = useState({});
  const tipo = {
    1: "Simple",
    2: "Doble",
    3: "Triple",
  };
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);

  // CHANGES IN FORM TIPOHAB

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setTipoHab({ ...tipoHab, [property]: value });
    setError(validacion({ ...tipoHab, [property]: value }));
  };

  // BUTTON SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !tipoHab.people.length ||
      !tipoHab.price.length ||
      !tipoHab.image.length ||
      !tipoHab.stock.length
    )
      return swal({
        text: "Por favor completa todos los campos.",
        icon: "warning",
        buttons: "Aceptar",
      });

    if (Object.entries(error).length)
      return swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });

    const { people, price, name, image, stock, id_user } = tipoHab;
    try {
      const res = await axios.post(`${URL_BASE}/roomtypes/${id}`, {
        people: Number(people),
        price: Number.parseFloat(price).toFixed(2),
        name: tipo[people] || "Multiple",
        image,
        stock,
        id_user,
      });

      swal({
        text: "Tus habitaciones se registraron con éxito! ",
        icon: "success",
        buttons: "Aceptar",
      });
      navigate("/FormRoomType", {
        state: { id_hotel: state.id_hotel },
        replace: true,
      });
      setTipoHab(resetTipoHab);
    } catch (error) {
      console.log(error);
      if (error.response.data.error === "Room type already exists.") {
        setTipoHab(resetTipoHab);
        return swal({
          text: "Ya registraste este tipo de habitación.",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
      swal({
        text: "Por favor vuelve a intentarlo, ocurrio un problema al cargar las habitaciones.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    tipoHab.image = file.secure_url;
    setLoading(false);
    setError(validacion({ ...tipoHab, image: tipoHab.image }));
  };

  const deleteImage = async (url) => {
    setLoading(true);
    tipoHab.image = "";
    setLoading(false);
    setError(validacion({ ...tipoHab, image: tipoHab.image }));
  };

  return (
    //
    // FORMULARIO TIPOHABITACION
    <>
      <NavBar />
      <div className={style.ContainerPadre}>
        <div className={style.container}>
          <form onSubmit={handleSubmit} className={style.form}>
            <h1 className="h3 mb-3 fw-normal">Registra las habitaciones:</h1>

            {/* CANTIDAD DE PERSONAS */}

            {error.people || !tipoHab.people.length ? (
              <span className={style.error}>{error.people}</span>
            ) : (
              <span className={style.tipoHab}>
                Tipo de habitación:{" "}
                {tipo[tipoHab.people]?.toUpperCase() || "MULTIPLE"}
              </span>
            )}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="people"
                placeholder="Cantidad de personas."
                onChange={handleChange}
                value={tipoHab.people}
                name="people"
              />
              <label>Cantidad de personas por habitación.</label>
            </div>

            {/* PRECIO DE LA HABITACION */}

            {error.price ? (
              <span className={style.error}>{error.price}</span>
            ) : (
              <span className={style.hidden}>hidden</span>
            )}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Precio por noche."
                onChange={handleChange}
                value={tipoHab.price}
                name="price"
              />
              <label>Precio por noche.</label>
            </div>

            {/* CANTIDAD DE HABITACIONES POR TIPO */}

            {error.stock ? (
              <span className={style.error}>{error.stock}</span>
            ) : (
              <span className={style.hidden}>hidden</span>
            )}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="stock"
                placeholder="Cantidad de habitaciones."
                onChange={handleChange}
                value={tipoHab.stock}
                name="stock"
              />
              <label>Cantidad de habitaciones.</label>
            </div>

            {/* FOTOS DE LA HABITACION */}
            {error.image ? (
              <span className={style.error}>{error.image}</span>
            ) : (
              <span className={style.hidden}>hidden</span>
            )}
            <div>Carga la foto de tu hotel:</div>
            <div>
              <input
                type="file"
                name="image"
                placeholder="arrastra la imagen aquí"
                onChange={uploadImage}
              />
              <div className={style.DivPadre}>
                {tipoHab.image.length ? (
                  <div className={style.ContainerImagen}>
                    <button
                      className={style.BotonDelete}
                      onClick={() => deleteImage(tipoHab.image)}
                    >
                      X
                    </button>
                    <img src={tipoHab.image} style={{ width: "300px" }} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <button className="w-100 btn btn-lg btn-warning" type="submit">
              Registrar
            </button>
            <br></br>
            <br></br>
            <NavLink to={"/Home"}>
              <button className="w-100 btn btn-lg btn-warning" type="button">
                Volver al inicio
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioTipoHab;

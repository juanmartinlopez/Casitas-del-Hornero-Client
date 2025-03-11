//?---------------------------- IMPORTS --------------------------------
//react
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../Index";
import { useSelector, useDispatch } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";

import axios from "axios";
import imgFav from "../../assets/icons/favorito.png"
import styleLight from "./Card.module.css";
import styleDark from "./CardDark.module.css";
import swal from "sweetalert";

//?----------------- COMPONENTE CARD ------------------------------------
function Cards({ id, name, image, province, department, rating, valoration }) {
  const dispatch = useDispatch();
  const FavHotels = useSelector((state) => state.FavHotels);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;
  const [isFav, setIsFav] = useState(false);
  const URL_BASE = "https://casitasdelhornero.onrender.com/";
  let ratingArray = Array(rating).fill(rating);

  let User = PedirLocalStorage();

  useEffect(() => {
    FavHotels?.forEach((fav) => {
      if (fav.id === id) setIsFav(true);
    });
  }, [FavHotels]);

  const handleFavorite = async (idUser, id) => {
    if (idUser) {
      setIsFav(!isFav);
      isFav
        ? await axios.delete(`${URL_BASE}/favorites/${idUser}/${id}`)
        : await axios.post(`${URL_BASE}/favorites/${idUser}/${id}`);
      dispatch(FuncionAllFavoritesHotel(User.id));
    } else {
      swal({
        text: "Debes iniciar sesion ",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      ValoracionDelHotel: "Hotel Rating",
      VerAlojamiento: "See Accommodation",
    },
    es: {
      ValoracionDelHotel: "Valoracion Del Hotel",
      VerAlojamiento: "Ver Alojamiento",
    },
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={image[0]} alt="" className={style.imgHotel} />
        {!User || User?.rol === 1 ? (
          isFav ? (
            <button
              onClick={() => handleFavorite(User?.id, id)}
              className={style.button}
            >
              ❤️
            </button>
          ) : (
            <button
              onClick={() => handleFavorite(User?.id, id)}
              className={style.button}
            >
              🤍
            </button>
          )
        ) : (
          <></>
        )}
      </div>
      <Link to={`/detail/${id}`} className={style.links}>
        <div className={style.title}>
          <div className={style.divJose}>
            <div className={style.divJose1}>
              <h4 className={style.name}>{name}</h4>
              <div className={style.rating}>
                {ratingArray.map((_, index) => {
                  return (
                    <img
                      className={style.imgRating}
                      src={imgFav}
                      alt=""
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <p>
              {translations[idioma].ValoracionDelHotel} :{valoration}
            </p>
          </div>
          <p className={style.province}>
            {department},{province}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Cards;

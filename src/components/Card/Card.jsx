//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteFavoriteHotel,
  FuncionAllFavoritesHotel,
  PostFavoriteHotel,
} from "../../redux/Actions/Actions.js";
import { PedirLocalStorage } from "../../utils/LocalStorage";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

//?----------------- COMPONENTE CARD ------------------------------------
const Card = ({
  id,
  name,
  image,
  province,
  department,
  rating,
  valoration,
}) => {
  const dispatch = useDispatch();
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);
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
        ? dispatch(DeleteFavoriteHotel(idUser, id))
        : dispatch(PostFavoriteHotel(idUser, id));
      dispatch(FuncionAllFavoritesHotel(User.id));
    } else {
      swal({
        text: "Debes iniciar sesion ",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <div className="bg-secondary-color border border-elegant-gold rounded-md overflow-hidden shadow-lg hover:shadow-elegant transition-all duration-300 group">
      {/* Imagen grande */}
      <div className="relative overflow-hidden border-b border-elegant-gold">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-md"
        />
        {/* Botón de favorito */}
        {!User || User?.rol === 1 ? (
          <button
            onClick={() => handleFavorite(User?.id, id)}
            className="absolute top-4 right-4 p-2 rounded bg-secondary-color/80 backdrop-blur-sm border border-elegant-gold hover:bg-important-color/20 transition-all duration-300 hover:scale-110 shadow-md"
            aria-label="Favorito"
          >
            {isFav ? (
              <FontAwesomeIcon icon={solidHeart} className="text-xl text-elegant-gold" />
            ) : (
              <FontAwesomeIcon icon={regularHeart} className="text-xl text-text-color group-hover:text-important-color" />
            )}
          </button>
        ) : null}
      </div>

      {/* Contenido */}
      <Link to={`/detail/${id}`} className="block">
        <div className="p-5 space-y-3">
          {/* Nombre del hotel en dorado */}
          <h4 className="text-2xl font-extrabold tracking-wide text-elegant-gold uppercase line-clamp-2 mb-2">
            {name}
          </h4>
          {/* Línea divisoria dorada y fina */}
          <hr className="border-t border-elegant-gold mb-2" />

          {/* Lugar y valoración en la misma fila */}
          <div className="flex items-center justify-between">
            {/* Lugar */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon="map-marker-alt" className="text-important-color" />
              <span className="text-sm text-secundary-text-color">
                {department}, {province}
              </span>
            </div>
            {/* Valoración decorada */}
            <div className="flex items-center gap-1">
              {ratingArray.map((_, index) => (
                <span key={index} className="text-elegant-gold text-lg">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
              {valoration && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-elegant-gold/20 text-elegant-gold text-xs font-bold border border-elegant-gold">
                  {valoration}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

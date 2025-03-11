//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";
import { PedirLocalStorage } from "../Index.js";
import Row from "react-bootstrap/Row";
//css
import style from "./Favorites.module.css";
//components
import { Cards } from "../Index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------

const Favorites = () => {
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const favorites = useSelector((state) => state.FavHotels);

  const [isLoading, setIsLoading] = useState(true);
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      No: "No favorites",
    },
    es: {
      No: "No hay favoritos",
    },
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllFavoritesHotel(User.id));
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {favorites.length ? (
        favorites.map(
          ({ id, name, image, province, department, rating, valoration }) => (
            <Cards
              key={id}
              id={id}
              name={name}
              image={image}
              province={province}
              department={department}
              rating={rating}
              valoration={valoration}
            />
          )
        )
      ) : (
        <h3>{translations[idioma].No}</h3>
      )}
    </>
  );
};

export default Favorites;

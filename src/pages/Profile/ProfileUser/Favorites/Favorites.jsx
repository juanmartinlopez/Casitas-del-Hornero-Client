//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../components/index";
import { FuncionAllFavoritesHotel } from "../../../../redux/Actions/Actions.js";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

//?----------------- COMPONENTE FAVORITES ------------------------------------

const Favorites = () => {
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const favorites = useSelector((state) => state.FavHotels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllFavoritesHotel(User.id));
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {favorites.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(
            ({ id, name, image, province, department, rating, valoration }) => (
              <div
                key={id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <Card
                  id={id}
                  name={name}
                  image={image}
                  province={province}
                  department={department}
                  rating={rating}
                  valoration={valoration}
                />
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-8 rounded-full bg-important-color/10 mb-6">
            <span className="text-6xl">💔</span>
          </div>
          <h3 className="text-2xl font-bold text-text-color mb-4">
            No tienes favoritos aún
          </h3>
          <p className="text-lg text-secundary-text-color max-w-md mx-auto">
            Explora nuestros hoteles y marca tus favoritos para encontrarlos
            fácilmente después
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;

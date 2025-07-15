import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { FuncionDetailHotel, NewReview } from "../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../utils/LocalStorage/index";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [shouldReload, setShouldReload] = useState(false);

  let User = PedirLocalStorage();
  const Hotel = useSelector((state) => state.DetailHotel);

  const URL_BASE = import.meta.env.VITE_API;

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };
  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentObject = { comment: newComment, rating: rating };
    setComments([...comments, newCommentObject]);
    setNewComment("");
    setRating(0);
    const datos = {
      username: User.username,
      review: newCommentObject.comment,
      punctuation: newCommentObject.rating,
    };

    axios
      .post(`${URL_BASE}/review/${Hotel.id}`, datos)
      .then(function (response) {
        swal({
          text: "Se realizó correctamente la reseña de este hotel",
          icon: "success",
          buttons: "Aceptar",
        });
      })
      .catch(function (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      });
    dispatch(NewReview());
    dispatch(FuncionDetailHotel(Hotel.id));
  };

  return (
    <div className="bg-secondary-color/50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-color mb-3 font-serif">
          REVIEWS
        </h2>
        <div className="w-20 h-0.5 bg-important-color mx-auto"></div>
      </div>

      <div className="space-y-8">
        {/* Formulario para nueva review */}
        <div className="bg-secondary-color rounded-xl p-6 shadow-soft max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-important-color mb-4 text-center">
            Deja tu reseña
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-text-color font-medium mb-2">
                  Tu comentario
                </label>
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Comparte tu experiencia..."
                  rows="4"
                  className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:border-important-color focus:ring-1 focus:ring-important-color transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-text-color font-medium mb-2">
                  Puntuación (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={handleRatingChange}
                  placeholder="10"
                  className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:border-important-color focus:ring-1 focus:ring-important-color transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-important-color text-primary-color py-3 rounded-lg font-semibold hover:bg-elegant-gold-light transition-all duration-300 transform hover:scale-105 shadow-elegant"
            >
              Enviar Reseña
            </button>
          </form>
        </div>

        {/* Lista de Reviews */}
        <div>
          <h3 className="text-2xl font-bold text-text-color mb-6 text-center font-serif">
            Reseñas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Hotel.Reviews?.length > 0 ? (
              Hotel.Reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-secondary-color rounded-xl p-4 shadow-soft"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
                      alt="Usuario"
                      className="w-12 h-12 rounded-full border-2 border-important-color/30"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-color">
                          {review.username}
                        </h4>
                        <span className="text-important-color font-medium">
                          {review.punctuation}⭐
                        </span>
                      </div>
                      <p className="text-secundary-text-color leading-relaxed">
                        {review.review}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-4xl text-secundary-text-color mb-2">
                  💬
                </div>
                <p className="text-secundary-text-color">
                  Aún no hay reseñas para este hotel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

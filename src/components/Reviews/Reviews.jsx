import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { NewReview } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import { FuncionDetailHotel } from "../../redux/Actions/Actions";
import swal from "sweetalert";

import styleLight from "./Reviews.module.css"
import styleDark from"./ReviewsDark.module.css"




export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [shouldReload, setShouldReload] = useState(false);

  let User = PedirLocalStorage();
  const Hotel = useSelector((state) => state.DetailHotel);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light"?styleLight:styleDark;

  const URL_BASE = "https://casitasdelhornero.onrender.com";

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      ReseñaCorrecta: "The review of this hotel was successful",
      Aceptar: "Accept",
      Placeholder: "Leave your review...",
      Puntuacion: "Punctuation",
      Enviar: "Send",
    },
    es: {
      ReseñaCorrecta: "Se realizó correctamente la reseña de este hotel",
      Aceptar: "Aceptar",
      Placeholder: "Deja tu reseña...",
      Puntuacion: "Puntuación",
      Enviar: "Enviar",
    },
  };

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
          text: translations[idioma].ReseñaCorrecta,
          icon: "success",
          buttons: translations[idioma].Aceptar,
        });
      })
      .catch(function (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      });
    dispatch(NewReview());
    dispatch(FuncionDetailHotel(Hotel.id));
  };

  return (
    <div className={style.container}>
      <h2>REVIEWS</h2>
      <section>
        <div className={style.comment}>
          {Hotel.Reviews?.map((review, index) => (
            <div className={style.caja} key={index}>
              <img
                src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
                alt=""
              />
              <div className={style.commentText}>
                <h3>{review.username}:</h3>
                <p>{review.review}</p>
                <span>{review.punctuation}⭐</span>
              </div>
            </div>
          ))}
        </div>
        <div className={style.reviewForm}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder={translations[idioma].Placeholder}
            />
            <div>
              <label>{translations[idioma].Puntuacion}:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={handleRatingChange}
                placeholder={translations[idioma].Puntuacion}
              />
            </div>
            <button type="submit">{translations[idioma].Enviar}</button>
          </form>
        </div>
      </section>
    </div>
  );
}

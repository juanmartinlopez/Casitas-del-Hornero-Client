import { useEffect } from "react";
import { PedirLocalStorage } from "../Index";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../redux/Actions/Actions";
// import style from "./Booking.module.css";
import styleLight from "./Booking.module.css"
import styleDark from"./BookingDark.module.css"

const Booking = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.Booking);

  useEffect(() => {
    dispatch(getBooking(User.id, User.rol));
  }, [dispatch]);
  const idioma = useSelector((state) => state.idioma);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;
  const translations = {
    en: {
      Precioindividual: "Individual Price",
      Preciototal: "Total Price",
    },
    es: {
      Precioindividual: "Precio individual",
      Preciototal: "Precio total",
    },
  };

  return (
    <div className={style.container}>
      {booking?.map((book, index) => {
        return (
          <div key={index} className={style.booking}>
            <h3 className={style.hotelName}>{`${book.hotelName}`}</h3>
            <div className={style.individualPrice}>
              {" "}
              {`${translations[idioma].Precioindividual}: ${book.individualPrice}`}
            </div>
            <div className={style.totalPrice}>
              {`${translations[idioma].Preciototal}: ${book.totalPrice}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Booking;

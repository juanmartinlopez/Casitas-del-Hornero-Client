//?---------------------------- IMPORTS --------------------------------
import Row from "react-bootstrap/Row";
import { Cards } from "../Index.js";

import styleLight from "./PartnerHotels.module.css"
import styleDark from "./PartnerHotelsDark.module.css"
import { useSelector } from "react-redux";

//?----------------- COMPONENTE FAVORITES ------------------------------------
const PartnerHotels = ({ hotels }) => {
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  return (
    <section>
      {hotels?.map(({ id, name, image, province, rating }) => (
        <div className={style.card}>
          <Cards
            key={id}
            id={id}
            name={name}
            image={image}
            rating={rating}
            province={province}
          />
        </div>

      ))}

    </section>

  );
};

export default PartnerHotels;

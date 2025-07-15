//?---------------------------- IMPORTS --------------------------------
import { Card } from "../../../../components/index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------
const PartnerHotels = ({ hotels }) => {
  return (
    <section>
      {hotels?.map(({ id, name, image, province, rating }) => (
        <div>
          <Card
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

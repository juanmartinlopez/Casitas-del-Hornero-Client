//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";
//css
import style from "./CarruselDetail.module.css";

//?----------------- COMPONENTE CARRUSEL DETAIL ------------------------------------
const CarruselDetail = ({ image }) => {
  return (
    <>
      <div className={style.container}>
        <Carousel className={style.carousel}>
          {image?.map((imagen, index) => (
            <Carousel.Item className={style.item} key={index}>
              <img className={style.img} src={imagen} alt="First slide" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CarruselDetail;

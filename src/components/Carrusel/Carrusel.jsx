//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
//css
import styleLight from "./Carrusel.module.css"
import styleDark from"./CarruselDark.module.css"
import { useSelector } from "react-redux";

//?----------------- COMPONENTE CARRUSEL ------------------------------------
const Carrusel = ({ HotelsCarrusel }) => {
const theme = useSelector((state) => state.theme);
const style = theme === "light"?styleLight:styleDark;
  return (
    <div>
      <Carousel className={style.carousel}>
        {HotelsCarrusel ? (
          HotelsCarrusel?.map(({ id, name, image, decription, status }) => {
            return (
              status?(
              <Carousel.Item className={style.item} key={id}>
                <Link to={`/detail/${id}`}>
                  <img className={style.img} src={image[0]} alt="loading" />
                  <Carousel.Caption>
                    <h3 className={style.carousel_h3}>{name}</h3>
                    <p>{decription}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
              ):("")
            );
          })
        ) : (
          <Carousel.Item className={style.item}>
            <img
              className={style.item}
              src="https://www.cronista.com/files/image/159/159758/5ff7d1a380650.jpg"
              alt="loading"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default Carrusel;

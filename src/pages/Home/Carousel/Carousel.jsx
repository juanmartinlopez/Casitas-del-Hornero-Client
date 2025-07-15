//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
//css

//?----------------- COMPONENTE CARRUSEL ------------------------------------
const CarouselHome = ({ HotelsCarrusel }) => {
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-deep-black/80">
      <Carousel>
        {HotelsCarrusel ? (
          HotelsCarrusel?.map(({ id, name, image, decription, status }) => {
            return status ? (
              <Carousel.Item key={id} className="relative">
                <Link to={`/detail/${id}`} className="block">
                  <img src={image[0]} alt="loading" className="w-full h-72 object-cover rounded-md" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/30 to-transparent rounded-md"></div>
                  <Carousel.Caption className="absolute bottom-8 left-8 text-left">
                    <h3 className="text-2xl font-extrabold tracking-wide text-elegant-gold drop-shadow-lg uppercase mb-2">
                      {name}
                    </h3>
                    <p className="text-base text-white/90 font-medium max-w-md drop-shadow-md">
                      {decription}
                    </p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ) : (
              ""
            );
          })
        ) : (
          <Carousel.Item className="relative">
            <img
              className="w-full h-72 object-cover rounded-md"
              src="https://www.cronista.com/files/image/159/159758/5ff7d1a380650.jpg"
              alt="loading"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/30 to-transparent rounded-md"></div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselHome;

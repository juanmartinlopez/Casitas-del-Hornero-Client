//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";

//?----------------- COMPONENTE CARRUSEL DETAIL ------------------------------------
const CarruselDetail = ({ image }) => {
  return (
    <div className="relative h-96 bg-secondary-color rounded-2xl overflow-hidden">
      {image && image.length > 0 ? (
        <Carousel
          className="h-full"
          interval={4000}
          controls={true}
          indicators={true}
        >
          {image.map((imagen, index) => (
            <Carousel.Item key={index} className="h-96">
              <img
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className="h-full flex items-center justify-center bg-secondary-color">
          <div className="text-center text-secundary-text-color">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p>No hay imágenes disponibles</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarruselDetail;

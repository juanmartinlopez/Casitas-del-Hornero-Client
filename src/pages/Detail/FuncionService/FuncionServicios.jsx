//?---------------------------- IMPORTS --------------------------------
import {
  faCoffee,
  faDumbbell,
  faElevator,
  faHotTub,
  faParking,
  faPaw,
  faSnowflake,
  faSpa,
  faSwimmingPool,
  faUmbrellaBeach,
  faUsers,
  faUtensils,
  faWheelchair,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//?----------------- COMPONENTE FUNCION SERVICES ------------------------------------

const FuncionServices = ({ Services }) => {
  const iconMap = {
    "Desayuno gratis": faCoffee,
    Pileta: faSwimmingPool,
    Gimnasio: faDumbbell,
    "Hotel frente a la playa": faUmbrellaBeach,
    "Wi-Fi": faWifi,
    Estacionamiento: faParking,
    "Aire acondicionado": faSnowflake,
    Restaurante: faUtensils,
    "Mascotas permitidas": faPaw,
    Familias: faUsers,
    "Bañera de hidromasaje": faHotTub,
    Spa: faSpa,
    "Acceso silla de ruedas": faWheelchair,
    Ascensor: faElevator,
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-important-color mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Servicios del alojamiento
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Services?.map((Ser) => (
          <div
            key={Ser.name}
            className="flex flex-col items-center p-3 bg-primary-color rounded-lg border border-important-color/20 hover:border-important-color/40 transition-all duration-300 group"
          >
            <FontAwesomeIcon
              icon={iconMap[Ser.name]}
              className="text-important-color text-2xl mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p className="text-text-color text-sm text-center font-medium">
              {Ser.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FuncionServices;

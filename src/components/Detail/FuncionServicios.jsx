//?---------------------------- IMPORTS --------------------------------
//css
import style from "./Detail.module.css";
//images
import imagenDesayuno from "../../assets/icons/desayuno.png";
import imagenPileta from "../../assets/icons/piscina.png";
import imagenGimnasio from "../../assets/icons/gimnasio.png";
import imagenPlaya from "../../assets/icons/playa.png";
import imagenWifi from "../../assets/icons/wifi.png";
import imagenEstacionamiento from "../../assets/icons/aparcamiento-de-coches.png";
import imagenAireAcondicionado from "../../assets/icons/clima.png";
import imagenRestaurante from "../../assets/icons/plato.png";
import imagenMascotasPermitidas from "../../assets/icons/pata.png";
import imageFamilia from "../../assets/icons/familia.png";
import imagenBañeraDeHidromasaje from "../../assets/icons/banera-de-hidromasaje.png";
import imagenSpa from "../../assets/icons/spa.png";
import imagenAccesoSillaDeRuedas from "../../assets/icons/senal-de-acceso-para-sillas-de-ruedas.png";
import imagenAscensor from "../../assets/icons/ascensor.png";
import { useSelector } from "react-redux";
import traductor from "../Traductor/Traductor";

//?----------------- COMPONENTE FUNCION SERVICES ------------------------------------

const FuncionServices = ({ Services}) => {
  const idioma = useSelector((state) => state.idioma);
  const image = {
    "Desayuno gratis": imagenDesayuno,
    Pileta: imagenPileta,
    Gimnasio: imagenGimnasio,
    "Hotel frente a la playa": imagenPlaya,
    "Wi-Fi": imagenWifi,
    Estacionamiento: imagenEstacionamiento,
    "Aire acondicionado": imagenAireAcondicionado,
    Restaurante: imagenRestaurante,
    "Mascotas permitidas": imagenMascotasPermitidas,
    Familias: imageFamilia,
    "Bañera de hidromasaje": imagenBañeraDeHidromasaje,
    Spa: imagenSpa,
    "Acceso silla de ruedas": imagenAccesoSillaDeRuedas,
    Ascensor: imagenAscensor,
  };

  return (
    <>
      <h3>Servicios del alojamiento</h3>
      <div className={style.services}>
        {Services?.map((Ser) => (
          <div className={style.divServicios} key={Ser.name}>
            <img className={style.img} src={image[Ser.name]} />
            <p className={style.h2}>{idioma === "en" ? traductor(Ser.name) : Ser.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FuncionServices;

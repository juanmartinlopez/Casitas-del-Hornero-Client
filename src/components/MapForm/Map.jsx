//?---------------------------- IMPORTS --------------------------------
//react
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
//css
import { useState } from "react";
import style from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

//?----------------- COMPONENTE MAPS ------------------------------------
const Maps = (props) => {
  const position = props.location.location;
  const name = props.location.name;
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Here: "You are here",
    },
    es: {
      Here: "Tu estas aqui",
    },
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>{translations[idioma].Here}</Popup>
      </Marker>
    );
  }

  const MapEvents = ({ setLocation }) => {
    let location = [];
    useMapEvents({
      click(e) {
        location = [e.latlng.lat, e.latlng.lng];
        setLocation({
          location: location,
          name: "Tu hotel",
        });
      },
    });
    return (
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    );
  };

  return (
    <section className={style.divMapPadre}>
      <section className={style.divMap}>
        <MapContainer
          className={style.leaflet}
          center={{ lat: position[0], lng: position[1] }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents setLocation={props.setLocation} />
        </MapContainer>
      </section>
    </section>
  );
};

export default Maps;

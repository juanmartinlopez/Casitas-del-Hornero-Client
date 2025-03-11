//?---------------------------- IMPORTS --------------------------------
//react
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
//css
import style from "./Map.module.css";
import "leaflet/dist/leaflet.css";

//?----------------- COMPONENTE MAPS ------------------------------------
const Maps = ({ location, name }) => {
  const position = location;

  return (
    
      <MapContainer
        className={style.leaflet}
        center={{ lat: location[0], lng: location[1] }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
  );
};

export default Maps;

//?---------------------------- IMPORTS --------------------------------
//react
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
//css
import "leaflet/dist/leaflet.css";

//?----------------- COMPONENTE MAPS ------------------------------------
const Maps = ({ location, name }) => {
  const position = location;

  return (
    <MapContainer
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

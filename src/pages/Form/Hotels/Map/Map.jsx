//?---------------------------- IMPORTS --------------------------------
//react
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
//css
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Configurar iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

//?----------------- COMPONENTE MAPS ------------------------------------
const Maps = (props) => {
  const position = props.location.location;
  const name = props.location.name;
  const [markerPosition, setMarkerPosition] = useState([
    parseFloat(position[0]),
    parseFloat(position[1]),
  ]);

  // Actualizar la posición del marcador cuando cambie la prop location
  useEffect(() => {
    const newPosition = [parseFloat(position[0]), parseFloat(position[1])];
    setMarkerPosition(newPosition);
  }, [position]);

  // Componente para manejar los clicks en el mapa
  const MapClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(newPosition);
        props.setLocation({
          location: newPosition,
          name: "Tu hotel",
        });
      },
    });

    return null;
  };

  return (
    <div style={{ height: "100%", width: "100%", zIndex: 1 }}>
      <MapContainer
        center={[parseFloat(position[0]), parseFloat(position[1])]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
        className="leaflet-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapClickHandler />
        <Marker position={markerPosition}>
          <Popup>
            <div style={{ color: "#333", fontWeight: "bold" }}>{name}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;

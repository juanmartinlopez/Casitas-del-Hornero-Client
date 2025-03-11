function traductor(palabra) {
  if (palabra === "Desayuno gratis") palabra = "Free breakfast";
  if (palabra === "Pileta") palabra = "Swimming pool";
  if (palabra === "Gimnasio") palabra = "Gym";
  if (palabra === "Hotel frente a la playa") palabra = "Beachfront hotel";
  if (palabra === "Wi-Fi") palabra = "Wi-Fi";
  if (palabra === "Estacionamiento") palabra = "Parking";
  if (palabra === "Aire acondicionado") palabra = "Air conditioning";
  if (palabra === "Restaurante") palabra = "Restaurant";
  if (palabra === "Mascotas permitidas") palabra = "Pet-friendly";
  if (palabra === "Familias") palabra = "Families";
  if (palabra === "Bañera de hidromasaje") palabra = "Hot tub";
  if (palabra === "Spa") palabra = "Spa";
  if (palabra === "Acceso silla de ruedas") palabra = "Wheelchair accessible";
  if (palabra === "Ascensor") palabra = "Elevator";

  return palabra;
}

export default traductor;

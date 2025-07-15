const Validations = (hotel) => {
  const error = {};

  // VALIDACION NOMBRE DEL HOTEL
  if (!hotel.name || !hotel.name.trim()) {
    error.name = "Por favor ingresa el nombre del hotel.";
  } else if (hotel.name.length < 3) {
    error.name = "El nombre debe tener al menos 3 caracteres.";
  } else if (hotel.name.length > 100) {
    error.name = "El nombre es muy largo (máximo 100 caracteres).";
  } else {
    delete error.name;
  }

  // VALIDACION EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!hotel.email || !hotel.email.trim()) {
    error.email = "Por favor ingresa un email.";
  } else if (!emailRegex.test(hotel.email)) {
    error.email = "Por favor ingresa un email válido.";
  } else {
    delete error.email;
  }

  // VALIDACION TELEFONO
  if (!hotel.phoneNumber || !hotel.phoneNumber.trim()) {
    error.phoneNumber = "Por favor ingresa un número de teléfono.";
  } else if (hotel.phoneNumber.length < 8) {
    error.phoneNumber = "El teléfono debe tener al menos 8 caracteres.";
  } else if (hotel.phoneNumber.length > 20) {
    error.phoneNumber = "El teléfono es muy largo (máximo 20 caracteres).";
  } else {
    delete error.phoneNumber;
  }

  // VALIDACION RATING
  if (!hotel.rating || !hotel.rating.toString().trim()) {
    error.rating = "Por favor ingresa la clasificación del hotel.";
  } else if (hotel.rating.length > 50) {
    error.rating = "La clasificación es muy larga (máximo 50 caracteres).";
  } else {
    delete error.rating;
  }

  // VALIDACION PROVINCIA
  if (!hotel.province || !hotel.province.trim()) {
    error.province = "Por favor selecciona una provincia.";
  } else {
    delete error.province;
  }

  // VALIDACION DEPARTAMENTO
  if (!hotel.department || !hotel.department.trim()) {
    error.department = "Por favor selecciona un departamento.";
  } else {
    delete error.department;
  }

  // VALIDACION LOCALIDAD
  if (!hotel.locality || !hotel.locality.trim()) {
    error.locality = "Por favor selecciona una localidad.";
  } else {
    delete error.locality;
  }

  // VALIDACION SERVICIOS
  if (
    !hotel.services ||
    !Array.isArray(hotel.services) ||
    hotel.services.length === 0
  ) {
    error.services = "Por favor selecciona al menos un servicio.";
  } else {
    delete error.services;
  }

  // VALIDACION IMAGENES
  if (!hotel.image || !Array.isArray(hotel.image) || hotel.image.length === 0) {
    error.image = "Por favor carga al menos una imagen.";
  } else {
    delete error.image;
  }

  // VALIDACION UBICACION
  if (
    !hotel.location ||
    !Array.isArray(hotel.location) ||
    hotel.location.length < 2
  ) {
    error.location = "Por favor marca la ubicación en el mapa.";
  } else {
    delete error.location;
  }

  return error;
};

export default Validations;

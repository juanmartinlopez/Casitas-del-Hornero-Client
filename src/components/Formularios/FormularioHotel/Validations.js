const validacion = (hotel) => {
    const error = {};
  
    // VALIDACION NOMBRE DEL HOTEL
  
    if (!hotel.name) {
      error.name = "Por favor ingresa un nombre para el hotel.";
    } else if (!isNaN(hotel.name)) {
      error.name = "Por favor ingresa un nombre válido.";
    } else if (!/^[A-Za-z0-9\s]+$/g.test(hotel.name)) {
      error.name = "Por favor ingresa un nombre válido.";
    } else if (hotel.name.length > 25) {
      error.name = "Ingresa un nombre menor a 25 caracteres.";
    } else {
      delete error.name;
    }
  
    // VALIDACION EMAIL PARA LA GESTION DEL HOTEL
  
    if (!hotel.email) {
      error.email = "Por favor ingresa un email de notificación.";
    } else if (!/\S+@\S+\.\S+/.test(hotel.email)) {
      error.email = "Por favor ingresa un email válido.";
    } else if (hotel.email.length > 25) {
      error.email = "Ingresa un email menor a 25 caracteres.";
    } else {
      delete error.email;
    }
  
    // VALIDACION TELEFONO DE CONTACTO
  
    if (!hotel.phoneNumber) {
      error.phoneNumber = "Por favor ingresa un número de teléfono.";
    } else if (isNaN(hotel.phoneNumber)) {
      error.phoneNumber = "Por favor ingresa un número.";
    } else if (
      !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
        hotel.phoneNumber
      )
    ) {
      error.phoneNumber =
        "Por favor ingresa un número de teléfono válido.";
    } else {
      delete error.phoneNumber;
    }
  
    // VALIDACION DE LA CLASIFICACION
  
    if (!hotel.rating) {
      error.rating =
        "Por favor ingresa el número de clasificación del hotel.";
    } else if (isNaN(hotel.rating)) {
      error.rating = "Por favor ingresa un número.";
    } else if (hotel.rating % 1 !== 0) {
      error.rating = "Por favor ingresa un número entero.";
    } else if (hotel.rating > 5 || hotel.rating < 1) {
      error.rating = "Por favor ingresa una clasificación del 1 al 5.";
    } else {
      delete error.rating;
    }
  
    // VALIDACION DE SELECCION DE LA PROVINCIA
  
    if (!hotel.province) {
      error.province =
        "Por favor selecciona la Provincia donde se encuentra el hotel.";
    } else {
      delete error.province;
    }
  
    // VALIDACION DE SELECCION DEL DEPARTAMENTO
  
    if (!hotel.department) {
      error.department =
        "Por favor selecciona el Departamento donde se encuentra el hotel.";
    } else {
      delete error.department;
    }
  
    // VALIDACION DE SELECCION DE LA LOCALIDAD
  
    if (!hotel.locality) {
      error.locality =
        "Por favor selecciona la Localidad donde se encuentra el hotel.";
    } else {
      delete error.locality;
    }
  
    // VALIDACION DE SELECCION DE LOS SERVICIOS
  
    if (!hotel.services.length) {
      error.services =
        "Por favor selecciona al menos un servicio que tenga tu hotel.";
    } else {
      delete error.services;
    }
  
    // VALIDACION DE URL IMAGE
  
    if (!hotel.image.length) {
      error.image = "Por favor carga al menos una foto.";
    } else {
      delete error.image;
    }
  
    return error;
  };
  
  export default validacion;
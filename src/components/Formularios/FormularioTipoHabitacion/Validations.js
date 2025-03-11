const validacion = (tipoHab) => {
  const error = {};

  // VALIDACION CANTIDAD DE PERSONAS

  if (!tipoHab.people) {
    error.people = "Por favor ingresa la cantidad de personas.";
  } else if (isNaN(tipoHab.people)) {
    error.people = "Por favor ingresa un número.";
  } else if (tipoHab.people % 1 !== 0) {
    error.people = "Por favor ingresa un número entero.";
  } else if (tipoHab.people > 5 || tipoHab.people < 1) {
    error.people = "Por favor ingresa una cantidad del 1 al 5.";
  } else {
    delete error.people;
  }

  // VALIDACION PRECIO POR NOCHE

  if (!tipoHab.price) {
    error.price = "Por favor ingresa el precio.";
  } else if (isNaN(tipoHab.price)) {
    error.price = "Por favor ingresa un número.";
  } else if (tipoHab.price <= 0) {
    error.price = "Por favor ingresa un número positivo.";
  } else if (tipoHab.price > 500000) {
    error.price = "Por favor ingresa un monto menor.";
  } else {
    delete error.price;
  }

  // VALIDACION CANTIDAD DE HABITACIONES POR TIPO

  if (!tipoHab.stock) {
    error.stock = "Por favor ingresa la cantidad de habitaciones.";
  } else if (isNaN(tipoHab.stock)) {
    error.stock = "Por favor ingresa un número.";
  } else if (tipoHab.stock % 1 !== 0) {
    error.stock = "Por favor ingresa un número entero.";
  } else if (tipoHab.stock <= 0) {
    error.stock = "Por favor ingresa un número positivo.";
  } else if (tipoHab.stock > 5000) {
    error.stock = "Por favor ingresa una cantidad menor.";
  } else {
    delete error.stock;
  }

  // VALIDACION DE URL IMAGE

  if (!tipoHab.image) {
    error.image = "Por favor carga al menos una foto.";
  } else {
    delete error.image;
  }

  return error;
};

export default validacion;
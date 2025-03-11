const validacion2 = (userData, erroresx) => {
  const errores = { ...erroresx };
  //username:

  if (!userData.username.length) {
    errores.username = "Campo requerido";
  } else if (typeof userData.username === "string") {
    errores.username = "";
  } else {
    errores.username = "Debes ingresar un username";
  }

  if (!userData.email) {
    errores.email = "Campo requerido";
  } else if (userData.email.length > 35) {
    errores.email = "El email no debe superar los 35 caracteres...";
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(userData.email)
  ) {
    errores.email = "";
  } else {
    errores.email = "Email inválido";
  }

  //password:

  if (!userData.password.length) {
    errores.password = "Campo requerido";
  } else if (userData.password.length < 6 && userData.password.length > 10) {
    errores.password = "La longitud debe ser mayor a 6 y menor a 10 ";
  } else if (
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(userData.password)
  ) {
    errores.password = "";
  } else {
    errores.password =
      "La contraseña debe tener al menos una letra mayúscula, una minúscula y  un número.";
  }
  //password repeat
  if (userData.repetir.length < 6 && userData.repetir.length > 10) {
    errores.repetir = "La longitud debe ser mayor a 6 y menor a 10 ";
  } else if (
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(userData.repetir)
  ) {
    errores.repetir = "";
  } else {
    errores.repetir = "Contraseña inválida";
  }

  return errores; // retornamos el objeto con los errores modificados..
};

export default validacion2;

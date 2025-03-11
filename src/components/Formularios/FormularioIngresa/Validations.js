const validacion = (userData, erroresx) => {
  // username:
  const errores = { ...erroresx };

  if (!userData.email) {
    errores.email = "Campo Requerido";
  } else if (userData.email.length > 35) {
    errores.email = "El email no debe superar los 35 caracteres...";
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(userData.email)
  ) {
    errores.email = "";
  } else {
    errores.email = "Email invalido";
  }

  if (!userData.password.length) {
    errores.password = "Campo Requerido";
  } else if (userData.password.length < 6 && userData.password.length > 10) {
    errores.password = "La longitud debe ser mayor de 6 y menor a 10 ";
  } else if (
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(userData.password)
  ) {
    errores.password = "";
  } else {
    errores.password = `La password debe tener 
    al menos una letra en Mayuscula
    , Minusculas y numeros.`;
  }

  return errores; // retornamos el objeto con los errores modificados..
};

export default validacion;

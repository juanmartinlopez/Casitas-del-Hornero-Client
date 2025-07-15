const GuardarDatosParaCambiarPassword = (emailUsuario) => {
  console.log(emailUsuario);
  return localStorage.setItem("EmailUsuario", emailUsuario); // guardar en el local storage (con el etodo setItem).
}; // el primer paramentro es la llave que voy a tener para utilizar despues para pedirla. el segundo parametro es basicamente lo que yo voy a guardar en el storage.

export default GuardarDatosParaCambiarPassword;

// enviar por paramns el email del usuario..
// luego pedirlo desde el formulario RestablecerPassword
// y por ultimo enviar el email al put con la contraseña a cambiar

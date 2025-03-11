const GuardarLocalStorage = (ObjetoUsuario) => {
  return localStorage.setItem("Usuario", JSON.stringify(ObjetoUsuario)); // guardar en el local storage (con el etodo setItem).
}; // el primer paramentro es la llave que voy a tener para utilizar despues para pedirla. el segundo parametro es basicamente lo que yo voy a guardar en el storage.

export default GuardarLocalStorage;

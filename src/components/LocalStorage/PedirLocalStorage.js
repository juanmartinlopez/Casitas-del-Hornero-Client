import { Error404 } from "../Index";

const PedirLocalStorage = () => {
  const usuarioJSON = localStorage.getItem("Usuario");

  if (usuarioJSON) {
    return JSON.parse(usuarioJSON);
  } else {
    // Valor predeterminado o puedes devolver otro valor que consideres apropiado
  }
};

export default PedirLocalStorage;

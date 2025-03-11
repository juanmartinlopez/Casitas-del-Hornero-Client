import { Error404 } from "../Index";

const PedirCheckInCheckOut = () => {
  const checkJSON = localStorage.getItem("Check");

  if (checkJSON) {
    return JSON.parse(checkJSON);
  } else {
    // Valor predeterminado o puedes devolver otro valor que consideres apropiado
  }
};

export default PedirCheckInCheckOut;

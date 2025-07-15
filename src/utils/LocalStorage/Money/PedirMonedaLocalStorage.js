const PedirMonedaLocalStorage = () => {
  const checkJSON = localStorage.getItem("Moneda");

  if (checkJSON) {
    return JSON.parse(checkJSON);
  } else {
  }
};

export default PedirMonedaLocalStorage;

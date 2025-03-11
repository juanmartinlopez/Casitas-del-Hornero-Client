const GuardarMonedaLocalStorage = (ObjetoMoneda) => {
    return localStorage.setItem("Moneda", JSON.stringify(ObjetoMoneda)); 
  }; 
  export default GuardarMonedaLocalStorage;
  
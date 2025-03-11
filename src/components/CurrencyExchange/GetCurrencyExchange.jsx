import { useSelector } from "react-redux";
import { PedirMonedaLocalStorage } from '../Index'

const GetCurrencyExchange = ({ value }) => {
  const { rate, symbol } = PedirMonedaLocalStorage();
  const currency = ((value * rate[symbol]) / rate.ARS).toFixed(2);
  return `$ ${currency.toLocaleString("es-AR")}`;
};

export default GetCurrencyExchange;

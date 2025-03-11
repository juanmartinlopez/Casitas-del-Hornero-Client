import { useDispatch } from "react-redux";
import { setCurrencySymbol } from "../../redux/Actions/Actions.js";
import "./currency.css";
import logocurrency from "../../assets/icons/dolar.png";

const SymbolsCurrency = () => {
  const dispatch = useDispatch();

  const onChangeCurrency = (event) => {
    dispatch(setCurrencySymbol(event.target.value));
  };

  return (
    <div className="currency-container">
      <img src={logocurrency} alt='logocurrency' className="logocurrency" />
      <select name="select" onChange={onChangeCurrency} className="select-bar" defaultValue="ARS">
        <option value="ARS">Peso argentino</option>
        <option value="BOB">Boliviano boliviano</option>
        <option value="BRL">Real brasileño</option>
        <option value="CLP">Peso chileno</option>
        <option value="COP">Peso colombiano</option>
        <option value="EUR">euros</option>
        <option value="GBP">Libra esterlina británica</option>
        <option value="MXN">Peso Mexicano</option>
        <option value="PEN">Nuevo Sol Peruano</option>
        <option value="USD">Dólar de los Estados Unidos</option>
        <option value="UYU">Peso uruguayo</option>
        <option value="VES">Venezolano Bolívar Soberano</option>
      </select>
    </div>
  );
};

export default SymbolsCurrency;

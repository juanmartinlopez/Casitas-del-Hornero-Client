import CleanCheckInCheckOut from "./Check/CleanCheckinCheckout";
import GuardarCheckInCheckOut from "./Check/GuardarCheckInCheckOut";
import PedirCheckInCheckOut from "./Check/PedirCheckInCheckOut";

import GuardarMonedaLocalStorage from "./Money/GuardarMonedaLocalStorage";
import PedirMonedaLocalStorage from "./Money/PedirMonedaLocalStorage";

import GuardarDatosParaCambiarPassword from "./PutPasswordLocalStorage/GuardarDatosParaCambiarPassword";
import PedirEmailLocalStorage from "./PutPasswordLocalStorage/PedirEmailLocalStorage";

import ClearLocalStorage from "./User/CleanLocalStorage";
import GuardarLocalStorage from "./User/GuardarLocalStorage";
import PedirLocalStorage from "./User/PedirLocalStorage";

import cargarDivisas from "../Divices";

export {
  cargarDivisas,
  CleanCheckInCheckOut,
  ClearLocalStorage,
  GuardarCheckInCheckOut,
  GuardarDatosParaCambiarPassword,
  GuardarLocalStorage,
  GuardarMonedaLocalStorage,
  PedirCheckInCheckOut,
  PedirEmailLocalStorage,
  PedirLocalStorage,
  PedirMonedaLocalStorage,
};

//?---------------------------- IMPORTS --------------------------------

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Detail,
  Error404,
  FormGoogle,
  FormularioHotel,
  FormularioTipoHab,
  Home,
  Login,
  Logout,
  OlvidasteLaPassword,
  Profile,
  Register,
  RestablecerContraseña,
  Trolley,
} from "./pages";

//?----------------- APP ------------------------------------
function App() {
  const [countCarrito, setCountCarrito] = useState(0);
  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegistroGoogle" element={<FormGoogle />} />
        <Route path="/OlvidasteLaPassword" element={<OlvidasteLaPassword />} />
        <Route
          path="/RestablecerContraseña"
          element={<RestablecerContraseña />}
        />
        <Route path="/Logout" element={<Logout />} />

        <Route
          path="/"
          element={
            <Home
              countCarrito={countCarrito}
              setCountCarrito={setCountCarrito}
            />
          }
        />

        <Route
          path="/Detail/:id"
          element={
            <Detail
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Trolley
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
            />
          }
        />

        <Route
          path="/Perfil"
          element={
            <Profile
              countCarrito={countCarrito}
              setCountCarrito={setCountCarrito}
            />
          }
        />

        <Route path="/FormHotel" element={<FormularioHotel />} />
        <Route path="/FormRoomType" element={<FormularioTipoHab />} />

        <Route
          path="/aboutus"
          element={<AboutUs countCarrito={countCarrito} />}
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;

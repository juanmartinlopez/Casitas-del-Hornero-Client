import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTrolley,
  DeleteAllTrolley,
  DeleteTrolley,
  putAmountTrolley,
} from "../../redux/Actions/Actions";
import { PedirCheckInCheckOut, PedirLocalStorage } from "../Index";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendario from "../Calendar/FullCalendar";
import styleLight from "./Trolley.module.css";
import styleDark from "./TrolleyDark.module.css";
import swal from "sweetalert";

const Trolleys = ({ setCountCarrito, countCarrito }) => {
  const URL_BASE = "https://casitasdelhornero.onrender.com";
  const dispatch = useDispatch();
  const User = PedirLocalStorage();
  const Trolley = useSelector((state) => state.Trolley);
  const ObjetoTrolley = useSelector((state) => state.ObjetoTrolley);
  const check = PedirCheckInCheckOut();
  const [isLoading, setIsLoading] = useState(true);
  const [TotalPrecio, setTotalPrecio] = useState([]);
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  function calcularDiferenciaEnDias(fecha1, fecha2) {
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);
    const diferenciaEnMilisegundos = Math.abs(date2 - date1);
    const milisegundosEnUnDia = 24 * 60 * 60 * 1000;
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / milisegundosEnUnDia
    );
    return diferenciaEnDias;
  }

  const Tiempo = calcularDiferenciaEnDias(check.CheckIn, check.CheckOut);

  useEffect(() => {
    if (!User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      ReservaExitosa: "Room(s) reserved successfully!!!",
      Aceptar: "Accept",
      BorrarCarrito: "Clear cart",
      Reservar: "Reserve",
      Precio: "Price",
      Personas: "People",
      PrecioTotal: "Total price",
      CantidadDisponible: "Rooms availables",
      Eliminar: "Delete",
      Por: "For",
      Noches: "nights",
      Hasta: "To",
      Desde: "From",
      Precio: "Price",
      Cancelar: "Cancel",
      VaciarCarrito: "Are you sure you want to empty the cart?",
    },
    es: {
      ReservaExitosa: "Habitacion/es reservadas con exito!!!",
      Aceptar: "Aceptar",
      BorrarCarrito: "Vaciar Carrito",
      Reservar: "Reservar",
      Precio: "Precio",
      Personas: "Personas",
      PrecioTotal: "Precio Total",
      CantidadDisponible: "Habitaciones disponibles",
      Eliminar: "Eliminar",
      Por: "Por",
      Noches: "noches",
      Hasta: "Hasta",
      Desde: "Desde",
      Precio: "Precio",
      Cancelar: "Cancelar",
      VaciarCarrito: "¿Estás seguro que deseas vaciar el carrito?",
    },
  };

  if (!User) {
    return null;
  }

  const ArrayMP = Trolley.map((tro) => {
    const unit_price = tro.price * Tiempo;
    return {
      id: tro.id,
      amount: tro.amount,
      unit_price,
      name: tro.name,
      hotelname: tro.hotelName,
    };
  });
  const ArrayBooking = Trolley.map((tro) => {
    return { id: tro.id, amount: tro.amount };
  });
  const totalPrecio = Trolley.reduce((total, { price, amount }) => {
    return total + Math.ceil(price * amount);
  }, 0);
  //*---------------------------------contador de cafa tipo de habitacion:

  setCountCarrito(Trolley.length);

  useEffect(() => {
    if (isLoading) {
      const checkIn = check.CheckIn;
      const checkOut = check.CheckOut;
      dispatch(GetTrolley(User.id, checkIn, checkOut));
      setIsLoading(false);
    }
  }, [ObjetoTrolley, Trolley]);

  const FuncionReservar = async (idUser) => {
    if (Trolley.length) {
      try {
        const checkIn = check.CheckIn;
        const checkOut = check.CheckOut;
        await axios.put(
          `${URL_BASE}/booking/${idUser}?checkIn=${checkIn}&checkOut=${checkOut}`,
          ArrayBooking
        );

        const res = await axios.post(`${URL_BASE}/payment`, ArrayMP);

        window.location.href = res.data.response.body.init_point;

        swal({
          text: translations[idioma].ReservaExitosa,
          icon: "success",
          buttons: translations[idioma].Aceptar,
        });
        dispatch(DeleteAllTrolley(idUser));
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      }
    } else {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  //*---------------------modificacion del contador:

  const FuncionCount = async (value, idUser, id_Rommtype) => {
    await dispatch(putAmountTrolley(value, idUser, id_Rommtype));
    const checkIn = check.CheckIn;
    const checkOut = check.CheckOut;
    dispatch(GetTrolley(User.id, checkIn, checkOut));

    if (ObjetoTrolley.amount) {
      const objeto = Trolley.find((tro) => tro.id === id_Rommtype);

      const PrecioBase = objeto.price;

      const newAmount =
        value === "up" ? ObjetoTrolley.amount + 1 : ObjetoTrolley.amount - 1;
      const newPrice = PrecioBase * newAmount;
    }
  };

  //*---------------------------------------------------------

  const FuncionDeleteCarrito = (idUser, idTypeRoom) => {
    setCountCarrito(countCarrito - 1);
    dispatch(DeleteTrolley(idUser, idTypeRoom));
  };

  const FuncionDeleteAllCarritos = (idUser) => {
    swal({
      title: translations[idioma].VaciarCarrito,
      icon: "warning",
      buttons: {
        cancel: translations[idioma].Cancelar,
        confirm: translations[idioma].Aceptar,
      },
    }).then(async (result) => {
      if (result) {
        // El usuario ha hecho clic en el botón de confirmación
        setCountCarrito((countCarrito = 0));
        await dispatch(DeleteAllTrolley(idUser));
      }
    });
  };

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.trolleyContainer}>
        <section className={style.section}>
          {Trolley?.map(
            ({ id, name, image, price, stock, people, amount, hotelName }) => (
              <div className={style.CardCarrito} key={id}>
                {/*--- divImg ---*/}
                <div>
                  <img className={style.img} src={image} />
                  <div>
                    <button
                      style={{
                        backgroundColor: "rgb(231, 87, 87)",
                        color: "white",
                        borderRadius: " 5px",
                        border: "none",
                        padding: "10px 20px",
                        width: "200px",
                      }}
                      // className={style.BotonElinimarCarrito}
                      onClick={() => FuncionDeleteCarrito(User.id, id)}
                    >
                      {translations[idioma].Eliminar}
                    </button>
                  </div>
                </div>
                {/*--- divInfo ---*/}
                <div>
                  <h2>{hotelName}</h2>
                  <h3>{name}</h3>
                  <p>
                    {translations[idioma].Personas}: {people}
                  </p>
                  <p>
                    {translations[idioma].Precio}:{`$  ${price}`}
                  </p>
                </div>
                {/* divStock */}
                <div className={style.divStock}>
                  <div>
                    <p>
                      {translations[idioma].CantidadDisponible}:{" "}
                      <span>{stock}</span>
                    </p>
                  </div>
                  <section>
                    <button
                      value="down"
                      className={style.botonCount}
                      onClick={() => FuncionCount("down", User.id, id, stock)}
                      disabled={amount <= 1}
                    >
                      -
                    </button>
                    <div className={style.spanCount}>
                      {ObjetoTrolley.id === id ? ObjetoTrolley.amount : amount}
                    </div>
                    <button
                      value="up"
                      className={style.botonCount}
                      onClick={() => FuncionCount("up", User.id, id, stock)}
                      disabled={amount === stock || amount > stock}
                    >
                      +
                    </button>
                  </section>
                </div>
                <div className={style.divTiempo}>
                  <p>
                    {translations[idioma].Por} {Tiempo}{" "}
                    {translations[idioma].Noches}
                  </p>
                  <p>
                    {translations[idioma].Desde} {check.CheckIn}
                  </p>
                  <p>
                    {translations[idioma].Hasta} {check.CheckOut}
                  </p>
                </div>
                <div>
                  <p className={style.priceRooms}>
                    {translations[idioma].Precio}: $
                    {Math.floor(price * Tiempo * amount)}
                  </p>
                </div>
              </div>
            )
          )}
        </section>
        <div>
          <div className={style.abajo}>
            <div className={style.divTotalPrecio}>
              <h2 className={style.totalPrice}>
                {translations[idioma].PrecioTotal}: ${totalPrecio * Tiempo}
              </h2>
            </div>
            <div className={style.divBotonEliminarTodo}>
              <button
                className={style.botonEliminar}
                onClick={() => FuncionDeleteAllCarritos(User.id)}
              >
                {translations[idioma].BorrarCarrito}
              </button>
              <button
                onClick={() => FuncionReservar(User.id, User.email)}
                className={style.button}
              >
                <span>{translations[idioma].Reservar}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Trolleys;

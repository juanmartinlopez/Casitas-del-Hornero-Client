import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import style from "./Trolley.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTrolley,
  DeleteAllTrolley,
  DeleteTrolley,
  putAmountTrolley,
} from "../../redux/Actions/Actions";
import { PedirCheckInCheckOut, PedirLocalStorage, TrolleyCard } from "../Index";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendario from "../Calendar/FullCalendar";

const Trolleys = ({ setCountCarrito, countCarrito }) => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const dispatch = useDispatch();
  const User = PedirLocalStorage();
  const Trolley = useSelector((state) => state.Trolley);
  const ObjetoTrolley = useSelector((state) => state.ObjetoTrolley);
  const [isLoading, setIsLoading] = useState(true);
  const [TotalPrecio, setTotalPrecio] = useState([]);
  const check = PedirCheckInCheckOut();
  const [array,setArray] = ([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  if (!User) {
    return null;
  }
  // const [ObjetoCount, setObjetoCount] = useState({});

  const ArrayCarritoModificado = Trolley.map((tro) => {
    // setObjetoCount({ id: tro.id, count: tro.amount });
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

  const FuncionReservar = async (idUser, email) => {
    const checkIn = check.CheckIn;
    const checkOut = check.CheckOut;
    if (Trolley.length) {
      try {
        await axios.get(
          `${URL_BASE}/cart/${idUser}?checkIn=${checkIn}&checkOut=${checkOut}`
        );
        await axios.put(
          `${URL_BASE}/booking/${idUser}`,
          ArrayCarritoModificado
        );
        swal({
          text: "Habitacion/es reservadas con exito!!!",
          icon: "success",
          buttons: "Aceptar",
        });
        dispatch(DeleteAllTrolley(idUser));
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    } else {
      swal({
        text: "No hay ningun Hotel Para reservar",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  //*---------------------modificacion del contador:

  const FuncionCount = async (value, idUser, id_Rommtype) => {
    await dispatch(putAmountTrolley(value, idUser, id_Rommtype));
    const checkIn = check.CheckIn;
    const checkOut = check.CheckOut;
    dispatch(GetTrolley(User.id, checkIn, checkOut));
    //dispatch(UpdateTrolley(updatedTrolley)); // Actualiza el estado del carrito con el nuevo arreglo

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
    setCountCarrito((countCarrito = 0));
    dispatch(DeleteAllTrolley(idUser));
  };

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.divBotonEliminarTodo}>
        <button
          className={style.botonEliminar}
          onClick={() => FuncionDeleteAllCarritos(User.id)}
        >
          Vaciar Carrito
        </button>
        <button
          onClick={() => FuncionReservar(User.id, User.email)}
          className={style.button}
        >
          <span>Reservar</span>
        </button>
      </div>
      <section className={style.section}>
        {Trolley?.map(({ id, name, image, price, stock, people, amount, array, setArray, hotelName }) => {
          return (
            <TrolleyCard
              key={id}
              id={id}
              name={name}
              image={image}
              price={price}
              stock={stock}
              people={people}
              amount={amount}
              array={array}
              setArray={setArray}
              hotelName={hotelName}
            />
          );
        }
        )}
      </section>

      <div className={style.divTotalPrecio}>
        <h1 className={style.h1}>Precio Total : ${totalPrecio}</h1>
      </div>

      <Footer />
    </>
  );
};

export default Trolleys;

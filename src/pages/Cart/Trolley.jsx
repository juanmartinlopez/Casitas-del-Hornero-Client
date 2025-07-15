import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Footer, NavBar } from "../../components/index";

import {
  DeleteAllTrolley,
  DeleteTrolley,
  GetTrolley,
  putAmountTrolley,
} from "../../redux/Actions/Actions";

import {
  PedirCheckInCheckOut,
  PedirLocalStorage,
} from "../../utils/LocalStorage/index";

const Trolleys = ({ setCountCarrito, countCarrito }) => {
  const URL_BASE = import.meta.env.VITE_API;
  const dispatch = useDispatch();
  const User = PedirLocalStorage();
  const Trolley = useSelector((state) => state.Trolley);
  const ObjetoTrolley = useSelector((state) => state.ObjetoTrolley);
  const check = PedirCheckInCheckOut();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        text: error.response.data.error,
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
      title: "¿Estás seguro que deseas vaciar el carrito?",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Aceptar",
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
    <div className="min-h-screen bg-primary-color">
      <NavBar countCarrito={countCarrito} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-color to-primary-color py-12">
        <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-color mb-3">
              Tu Carrito de Reservas
            </h1>
            <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
              Revisa tus habitaciones seleccionadas y confirma tu reserva
            </p>
            <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8 bg-primary-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Trolley && Trolley.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {Trolley?.map(
                  ({
                    id,
                    name,
                    image,
                    price,
                    stock,
                    people,
                    amount,
                    hotelName,
                  }) => (
                    <div
                      key={id}
                      className="bg-secondary-color rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-important-color/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* Image Section */}
                        <div className="relative">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-48 md:h-full object-cover rounded-lg"
                          />
                          <div className="absolute top-3 right-3">
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                              onClick={() => FuncionDeleteCarrito(User.id, id)}
                              title="Eliminar de carrito"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h2 className="text-xl font-bold text-text-color mb-1">
                              {hotelName}
                            </h2>
                            <h3 className="text-lg font-semibold text-important-color">
                              {name}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-secundary-text-color">
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Personas: {people}
                              </span>
                              <span>Precio base: ${price}</span>
                            </div>
                          </div>

                          {/* Stock and Quantity Controls */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-sm text-secundary-text-color">
                              Habitaciones disponibles:{" "}
                              <span className="font-semibold text-text-color">
                                {stock}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm text-secundary-text-color">
                                Cantidad:
                              </span>
                              <div className="flex items-center bg-primary-color rounded-lg border border-important-color/20">
                                <button
                                  className="p-2 text-text-color hover:bg-important-color/10 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() =>
                                    FuncionCount("down", User.id, id, stock)
                                  }
                                  disabled={amount <= 1}
                                >
                                  -
                                </button>
                                <div className="px-4 py-2 text-text-color font-semibold min-w-[3rem] text-center">
                                  {ObjetoTrolley.id === id
                                    ? ObjetoTrolley.amount
                                    : amount}
                                </div>
                                <button
                                  className="p-2 text-text-color hover:bg-important-color/10 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() =>
                                    FuncionCount("up", User.id, id, stock)
                                  }
                                  disabled={amount === stock || amount > stock}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Stay Details */}
                          <div className="bg-primary-color/50 rounded-lg p-4 space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                              <div className="text-secundary-text-color">
                                <span className="font-medium">Duración:</span>{" "}
                                {Tiempo} noches
                              </div>
                              <div className="text-secundary-text-color">
                                <span className="font-medium">Desde:</span>{" "}
                                {check.CheckIn}
                              </div>
                              <div className="text-secundary-text-color">
                                <span className="font-medium">Hasta:</span>{" "}
                                {check.CheckOut}
                              </div>
                            </div>
                            <div className="text-right pt-2 border-t border-important-color/10">
                              <span className="text-lg font-bold text-important-color">
                                Subtotal: ${Math.floor(price * Tiempo * amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary-color rounded-xl shadow-lg p-6 border border-important-color/10 sticky top-6">
                  <h2 className="text-2xl font-bold text-text-color mb-6">
                    Resumen de Reserva
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-secundary-text-color">
                      <span>Habitaciones:</span>
                      <span>{Trolley.length}</span>
                    </div>
                    <div className="flex justify-between text-secundary-text-color">
                      <span>Duración:</span>
                      <span>{Tiempo} noches</span>
                    </div>
                    <div className="border-t border-important-color/10 pt-4">
                      <div className="flex justify-between text-xl font-bold text-important-color">
                        <span>Total:</span>
                        <span>${totalPrecio * Tiempo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      className="w-full bg-important-color hover:bg-important-color/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                      onClick={() => FuncionReservar(User.id, User.email)}
                    >
                      Proceder a Reservar
                    </button>
                    <button
                      className="w-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      onClick={() => FuncionDeleteAllCarritos(User.id)}
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="text-6xl text-secundary-text-color mb-4">🛒</div>
              <h3 className="text-2xl font-semibold text-text-color mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-secundary-text-color mb-6">
                ¡Explora nuestras casitas y encuentra la perfecta para ti!
              </p>
              <button
                className="bg-important-color hover:bg-important-color/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => navigate("/Home")}
              >
                Explorar Casitas
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trolleys;

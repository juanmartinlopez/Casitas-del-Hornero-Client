import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

const Booking = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.Booking);

  useEffect(() => {
    dispatch(getBooking(User.id, User.rol));
  }, [dispatch]);

  return (
    <div>
      {booking?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booking.map((book, index) => {
            return (
              <div
                key={index}
                className="bg-secondary-color/30 backdrop-blur-sm rounded-xl border border-important-color/20 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-important-color/20"
              >
                <div className="flex items-center mb-4">
                  <div className="inline-block p-3 rounded-full bg-important-color/20 mr-4">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-color">
                      {book.hotelName}
                    </h3>
                    <p className="text-sm text-secundary-text-color">
                      Reserva #{index + 1}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary-color/50 rounded-lg">
                    <span className="text-secundary-text-color">
                      Precio individual:
                    </span>
                    <span className="text-important-color font-semibold text-lg">
                      ${book.individualPrice}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-important-color/10 rounded-lg border border-important-color/30">
                    <span className="text-text-color font-semibold">
                      Total pagado:
                    </span>
                    <span className="text-important-color font-bold text-xl">
                      ${book.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-8 rounded-full bg-important-color/10 mb-6">
            <span className="text-6xl">📅</span>
          </div>
          <h3 className="text-2xl font-bold text-text-color mb-4">
            No tienes reservas aún
          </h3>
          <p className="text-lg text-secundary-text-color max-w-md mx-auto">
            Explora nuestros hoteles y realiza tu primera reserva para disfrutar
            de una experiencia única
          </p>
        </div>
      )}
    </div>
  );
};

export default Booking;

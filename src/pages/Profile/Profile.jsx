import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileAdmin from "./ProfileAdmin/ProfileAdmin";
import ProfileColaborator from "./ProfileColaborator/ProfileColaborator";
import ProfileUser from "./ProfileUser/ProfileUser";

import { PedirLocalStorage } from "../../utils/LocalStorage/index";

const Profile = ({ countCarrito, setCountCarrito }) => {
  let User = PedirLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate("/");
    }
  }, [User, navigate]);

  if (!User) {
    return null;
  }

  let { rol } = User;

  return (
    <div className="min-h-screen bg-primary-color">
      {rol === 1 ? (
        <ProfileUser
          countCarrito={countCarrito}
          setCountCarrito={setCountCarrito}
        />
      ) : rol === 2 ? (
        <ProfileColaborator />
      ) : rol === 3 ? (
        <ProfileAdmin />
      ) : (
        <div className="min-h-screen bg-primary-color flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-secundary-text-color mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-text-color mb-2">
              Acceso no autorizado
            </h3>
            <p className="text-secundary-text-color">
              No tienes permisos para acceder a esta sección
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

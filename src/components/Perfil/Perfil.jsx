import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage, PerfilColaborador, PerfilSuperAdmin, PerfilUsuario } from "../Index";
import style from "./Perfil.module.css";

const Perfil = ({countCarrito,setCountCarrito}) => {
    let User = PedirLocalStorage();
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme);

    useEffect(() => {
    if (!User) {
        navigate("/Home");
    }
    }, [User, navigate]);

    if (!User) {
        return null;
    }

    let { rol } = User;

    return (
        <div className={theme === 'light' ? style.section : style.sectiondark}>
        {
            rol===1?(
                <PerfilUsuario
                  countCarrito={countCarrito}
                  setCountCarrito={setCountCarrito}
                />
            ):rol===2?(
                <PerfilColaborador/>
            ):rol===3?(
                <PerfilSuperAdmin/>
            ):(
                <></>
            )
        }
        </div>
    );
};

export default Perfil;
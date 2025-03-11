import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PedirLocalStorage } from "../Index";
import { changeRol, getUsers } from "../../redux/Actions/Actions";
import style from "./GetUser.module.css";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// import DataTable, { createTheme } from "react-data-table-component";

const GetUsers = () => {
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const users = useSelector((state) => state.Users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  const roles = {
    1: "Usuario",
    2: "Proveedor",
    3: "Administrador"
  };


  useEffect(() => {
    dispatch(getUsers(user.id));
  }, [dispatch, user.id]);

  const handleRoleChange = async () => {
    const data = {
      id_user: selectedUserId,
      rol: selectedUserRole,
    };
    await dispatch(changeRol(data));
    setShowOptions(false);
    await dispatch(getUsers(user.id));
  };

  const handleSelectUser = (userId) => {

    setSelectedUserId(userId);
    setShowOptions(true);
  };

  //*---------------------------------FuncionBloque:
  const FuncioBloquear = async (idUser, userEmail, value) => {
    await axios.put(
      `https://casitasdelhornero.onrender.com/user/status/${idUser}`
    );
  
    if (value) {
      await axios.get(
        `https://casitasdelhornero.onrender.com/email/Baneo/${userEmail}`
      );
    } else {
      await axios.get(
        `https://casitasdelhornero.onrender.com/email/Desbaneo/${userEmail}`
      );
    }
  
    await dispatch(getUsers(user.id));
  };

  const columnas = [
    {
      name: "id",
      label: "id",
      options: {
        customBodyRender: (value) => {
          return(
            <div className={style.divId}>
              {value}
            </div>
          )
        }
      }
    },
    {
      name: "username",
      label: "username",
      options: {
        customBodyRender: (value) => {
          return(
            <div className={style.divUserName}>
              {value}
            </div>
          )
        }
      }
    },
    "email",
    {
      name: "status",
      label: "Status",  
      options: {
        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0];
          const userEmail = tableMeta.rowData[2]
          return (
            <div>
              <h1>{value}</h1>
             
              <button
                className={style.botonRol}
                onClick={() => FuncioBloquear(userId, userEmail, value)}
              >
                {value ? "Bloquear" : "Desbloquear"}
              </button>
            </div>
          );
        },
      },
    },

    {
      name: "rol",
      label: "Rol",
      options: {
        customBodyRender: (value, tableMeta) => {
          //* customBodyRender sirve para modificar o actualizar un valor de la tabla
          const userId = tableMeta.rowData[0]; // Obtén el ID del usuario desde los datos de la fila
          return (
            <div >
              {showOptions && selectedUserId === userId ? (
                <select
                  className={style.select}
                  value={selectedUserRole}
                  onChange={(e) => setSelectedUserRole(e.target.value)}
                >
                  <option hidden>Seleccionar Rol</option>
                  <option value="1">Usuario</option>
                  <option value="2">Proveedor</option>
                  <option value="3">Administrador</option>
                </select>
              ) : (
                roles[value]
              )}
              
            
            </div>
          );
        },
      },
    },
    {
      name: "change",
      label: "Change",
      options: {
        customBodyRender: (value, tableMeta) =>{
          const userId = tableMeta.rowData[0]
          return(

            <div>

              <button
              className={style.botonRol}
              onClick={() => handleSelectUser(userId)}
            >
              Cambiar
            </button>
            {showOptions && selectedUserId === userId && (
              <button
                className={style.botonGuardar}
                onClick={handleRoleChange}
              >
                Guardar
              </button>
            )}
            </div>
          )
          
          
        }
      }
    }
  ];
  const options = {
    selectableRows: false, // Desactivar checkboxes en cada fila
  };
  return (
    <MUIDataTable
      className={style.gigachadaowo}
      title="Lista de Usuarios"
      data={users}
      columns={columnas}
      options={options}
    />
  );
};

export default GetUsers;

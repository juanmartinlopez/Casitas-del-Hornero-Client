import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRol, getUsers } from "../../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

const GetUsers = () => {
  const URL_BASE = import.meta.env.VITE_API;
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const users = useSelector((state) => state.Users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  const roles = {
    1: "Usuario",
    2: "Proveedor",
    3: "Administrador",
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
    await axios.put(`${URL_BASE}/user/status/${idUser}`);

    if (value) {
      await axios.get(`${URL_BASE}/email/Baneo/${userEmail}`);
    } else {
      await axios.get(`${URL_BASE}/email/Desbaneo/${userEmail}`);
    }

    await dispatch(getUsers(user.id));
  };

  const columnas = [
    {
      name: "id",
      label: "ID",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="font-mono text-sm text-secundary-text-color">
              #{value}
            </div>
          );
        },
      },
    },
    {
      name: "username",
      label: "Nombre de Usuario",
      options: {
        customBodyRender: (value) => {
          return <div className="font-semibold text-text-color">{value}</div>;
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-secundary-text-color text-sm">{value}</div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Estado",
      options: {
        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0];
          const userEmail = tableMeta.rowData[2];
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    value ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span
                  className={`text-sm font-medium ${
                    value ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {value ? "Activo" : "Bloqueado"}
                </span>
              </div>
              <button
                onClick={() => FuncioBloquear(userId, userEmail, value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  value
                    ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
                }`}
              >
                {value ? "🔒 Bloquear" : "🔓 Desbloquear"}
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
          const userId = tableMeta.rowData[0];
          const getRoleBadge = (role) => {
            const roleConfig = {
              1: { text: "Usuario", class: "bg-blue-100 text-blue-800" },
              2: { text: "Proveedor", class: "bg-purple-100 text-purple-800" },
              3: {
                text: "Administrador",
                class: "bg-important-color/20 text-important-color",
              },
            };
            return (
              roleConfig[role] || {
                text: "Desconocido",
                class: "bg-gray-100 text-gray-800",
              }
            );
          };

          const roleBadge = getRoleBadge(value);

          return (
            <div>
              {showOptions && selectedUserId === userId ? (
                <select
                  value={selectedUserRole}
                  onChange={(e) => setSelectedUserRole(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-important-color/30 bg-secondary-color text-text-color focus:outline-none focus:ring-2 focus:ring-important-color/50"
                >
                  <option hidden>Seleccionar Rol</option>
                  <option value="1">Usuario</option>
                  <option value="2">Proveedor</option>
                  <option value="3">Administrador</option>
                </select>
              ) : (
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${roleBadge.class}`}
                >
                  {roleBadge.text}
                </span>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "change",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0];
          return (
            <div className="space-y-2">
              <button
                onClick={() => handleSelectUser(userId)}
                className="px-3 py-1 rounded-lg bg-important-color/10 text-important-color hover:bg-important-color/20 border border-important-color/30 text-sm font-medium transition-all duration-200"
              >
                ✏️ Cambiar
              </button>
              {showOptions && selectedUserId === userId && (
                <button
                  onClick={handleRoleChange}
                  className="px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 text-sm font-medium transition-all duration-200"
                >
                  💾 Guardar
                </button>
              )}
            </div>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: false, // Desactivar checkboxes en cada fila
    responsive: "standard",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
    searchPlaceholder: "Buscar usuarios...",
    textLabels: {
      body: {
        noMatch: "No se encontraron usuarios",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas de la Tabla",
      },
    },
  };

  return (
    <div className="bg-primary-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-color mb-3">
            Gestión de Usuarios
          </h2>
          <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
            Administra usuarios, roles y estados del sistema
          </p>
          <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
        </div>

        {/* Data Table Container */}
        <div className="bg-secondary-color rounded-xl shadow-2xl shadow-important-color/10 overflow-hidden border border-important-color/10">
          <div className="p-6">
            <MUIDataTable
              title={
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-important-color rounded-full"></div>
                  <span className="text-xl font-semibold text-text-color">
                    Lista de Usuarios
                  </span>
                </div>
              }
              data={users}
              columns={columnas}
              options={options}
            />
          </div>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-16 bg-secondary-color rounded-xl shadow-lg mt-8">
            <div className="text-6xl text-secundary-text-color mb-4">👥</div>
            <h3 className="text-2xl font-semibold text-text-color mb-2">
              No hay usuarios registrados
            </h3>
            <p className="text-secundary-text-color">
              Los usuarios aparecerán aquí cuando se registren en el sistema
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetUsers;

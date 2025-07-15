import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getRequests, getUsers } from "../../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

const GetRequests = () => {
  const { Requests } = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const { Users } = useSelector((state) => state);
  const URL_BASE = import.meta.env.VITE_API;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      if (!Requests.length) {
        dispatch(getRequests(user.id));
      }
    }
  }, [Requests, Users]);

  const handler = async (event, requestId, userId) => {
    try {
      if (event.target.value == "si") {
        await axios.put(`${URL_BASE}/request/${requestId}`);
        await axios.put(`${URL_BASE}/user/`, { id_user: userId, rol: 2 });
        await dispatch(getRequests(user.id));
        await dispatch(getUsers(user.id));
      } else {
        await axios.put(`${URL_BASE}/request/${requestId}`);

        await dispatch(getRequests(user.id));
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const columnas = [
    {
      name: "id",
      label: "ID",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="font-mono text-sm text-secundary-text-color">
              #{value}
            </div>
          );
        },
      },
    },
    {
      name: "UserId",
      label: "ID Usuario",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="font-mono text-sm text-secundary-text-color">
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "username",
      label: "Nombre de Usuario",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
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
      name: "message",
      label: "Mensaje",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-text-color max-w-xs">
              <p className="truncate" title={value}>
                {value}
              </p>
            </div>
          );
        },
      },
    },
    {
      name: "date",
      label: "Fecha",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="text-text-color">
              <p className="font-medium text-sm">{value.slice(0, 10)}</p>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Estado",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const requestId = tableMeta.rowData[0];
          const userId = tableMeta.rowData[1];
          return (
            <div className="space-y-2">
              {value === false ? (
                <select
                  onChange={(event) => handler(event, requestId, userId)}
                  className="px-3 py-1 rounded-lg border border-important-color/30 bg-secondary-color text-text-color focus:outline-none focus:ring-2 focus:ring-important-color/50 text-sm"
                >
                  <option hidden>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                      ⏳ Pendiente
                    </span>
                  </option>
                  <option value="si" className="text-green-700">
                    ✅ Aceptar
                  </option>
                  <option value="no" className="text-red-700">
                    ❌ Rechazar
                  </option>
                </select>
              ) : (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  ✅ Finalizada
                </span>
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
    searchPlaceholder: "Buscar solicitudes...",
    textLabels: {
      body: {
        noMatch: "No se encontraron solicitudes",
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
            Gestión de Solicitudes
          </h2>
          <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
            Administra las solicitudes de proveedores y cambios de rol
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
                    Peticiones del Sistema
                  </span>
                </div>
              }
              data={Requests}
              columns={columnas}
              options={options}
            />
          </div>
        </div>

        {/* Empty State */}
        {Requests.length === 0 && (
          <div className="text-center py-16 bg-secondary-color rounded-xl shadow-lg mt-8">
            <div className="text-6xl text-secundary-text-color mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-text-color mb-2">
              No hay solicitudes pendientes
            </h3>
            <p className="text-secundary-text-color">
              Las solicitudes aparecerán aquí cuando los usuarios las envíen
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetRequests;

import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAdmin } from "../../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

const GetHotels = () => {
  const URL_BASE = import.meta.env.VITE_API;
  const { HotelsAdmin } = useSelector((data) => data);
  const dispatch = useDispatch();
  const user = PedirLocalStorage();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      if (!HotelsAdmin.length) {
        dispatch(getHotelsAdmin(user.id));
      }
    }
  }, [dispatch]);

  const FuncioBloquear = async (id_Hotel) => {
    await axios.put(`${URL_BASE}/hotels/status/${id_Hotel}`);
    await dispatch(getHotelsAdmin(user.id));
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
      name: "name",
      label: "Nombre del Hotel",
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
      name: "phoneNumber",
      label: "Teléfono",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="text-text-color font-medium">{value}</div>;
        },
      },
    },
    {
      name: "rating",
      label: "Categoría",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                {"★".repeat(value)} ({value})
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "valoration",
      label: "Valoración",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rating = parseFloat(value);
          const colorClass =
            rating >= 4.5
              ? "bg-green-100 text-green-800"
              : rating >= 3.5
              ? "bg-blue-100 text-blue-800"
              : "bg-orange-100 text-orange-800";

          return (
            <div className="text-center">
              <span
                className={`${colorClass} px-2 py-1 rounded-full text-sm font-medium`}
              >
                {rating ? rating.toFixed(1) : "N/A"}
              </span>
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
          const id_Hotel = tableMeta.rowData[0];
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
                onClick={() => FuncioBloquear(id_Hotel)}
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
      name: "province",
      label: "Provincia",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-text-color">
              <span className="bg-important-color/10 text-important-color px-2 py-1 rounded-full text-sm font-medium">
                📍 {value}
              </span>
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
    searchPlaceholder: "Buscar hoteles...",
    textLabels: {
      body: {
        noMatch: "No se encontraron hoteles",
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
            Gestión de Hoteles
          </h2>
          <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
            Administra el estado y información de todos los hoteles registrados
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
                    Hoteles del Sistema
                  </span>
                </div>
              }
              data={HotelsAdmin}
              columns={columnas}
              options={options}
            />
          </div>
        </div>

        {/* Empty State */}
        {HotelsAdmin.length === 0 && (
          <div className="text-center py-16 bg-secondary-color rounded-xl shadow-lg mt-8">
            <div className="text-6xl text-secundary-text-color mb-4">🏨</div>
            <h3 className="text-2xl font-semibold text-text-color mb-2">
              No hay hoteles registrados
            </h3>
            <p className="text-secundary-text-color">
              Los hoteles aparecerán aquí cuando se registren en el sistema
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetHotels;

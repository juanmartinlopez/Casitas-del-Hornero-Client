import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../../utils/LocalStorage/index";

const GetBookings = () => {
  const user = PedirLocalStorage();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { BookingsAdmin } = useSelector((state) => state);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      if (!BookingsAdmin.length) {
        dispatch(getAllBookings(user.id, user.rol));
      }
    }
  }, [BookingsAdmin]);

  const columnas = [
    {
      name: "hotelName",
      label: "Hotel Name",
      options: {
        customBodyRender: (value) => {
          return <div className="font-semibold text-text-color">{value}</div>;
        },
      },
    },
    {
      name: "userEmail",
      label: "Email Usuario",
      options: {
        customBodyRender: (value) => {
          return <div className="text-secundary-text-color">{value}</div>;
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
              <p className="font-medium">{value.slice(0, 10)}</p>
            </div>
          );
        },
      },
    },
    {
      name: "checkIn",
      label: "Check In",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="text-text-color">
              <p className="text-sm">{value.slice(0, 16)}</p>
            </div>
          );
        },
      },
    },
    {
      name: "checkOut",
      label: "Check Out",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="text-text-color">
              <p className="text-sm">{value.slice(0, 16)}</p>
            </div>
          );
        },
      },
    },
    {
      name: "amount",
      label: "Cantidad",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-center">
              <span className="bg-important-color/10 text-important-color px-2 py-1 rounded-full text-sm font-medium">
                {value}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "individualPrice",
      label: "Precio Individual",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-text-color">
              <p className="font-semibold">${value}</p>
            </div>
          );
        },
      },
    },
    {
      name: "totalPrice",
      label: "Precio Total",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="text-center">
              <span className="bg-gradient-to-r from-important-color to-important-color/80 text-white px-3 py-1 rounded-lg font-bold text-lg shadow-lg">
                ${value}
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
    searchPlaceholder: "Buscar reservas...",
    textLabels: {
      body: {
        noMatch: "No se encontraron reservas",
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
    customTableBodyFooterRender: ({ data }) => {
      return null;
    },
  };

  return (
    <div className="bg-primary-color min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-color mb-3">
            Gestión de Reservas
          </h2>
          <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
            Administra y supervisa todas las reservas realizadas en el sistema
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
                    Reservas del Sistema
                  </span>
                </div>
              }
              data={BookingsAdmin}
              columns={columnas}
              options={options}
            />
          </div>
        </div>

        {/* Empty State */}
        {BookingsAdmin.length === 0 && (
          <div className="text-center py-16 bg-secondary-color rounded-xl shadow-lg mt-8">
            <div className="text-6xl text-secundary-text-color mb-4">📋</div>
            <h3 className="text-2xl font-semibold text-text-color mb-2">
              No hay reservas disponibles
            </h3>
            <p className="text-secundary-text-color">
              Las reservas aparecerán aquí cuando se realicen
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetBookings;

import { Line, Bar, Doughnut } from "react-chartjs-2";
import "./Estadisticas.css";
import {
  // en line chart debo importar LineElement
  // en Bar es BarElement
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { useEffect } from "react";
import axios from "axios";
import { PedirLocalStorage } from "../components/Index";
//*---------grafico de lineas:

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Colors
);

const EstadisticasLinealTodosLosBookings = ({ TodosLosBookings }) => {
  const Usuario = [];
  const Precio = [];

  for (let i = 0; i < TodosLosBookings.length; i++) {
    Usuario.push(TodosLosBookings[i].userEmail);
    Precio.push(TodosLosBookings[i].totalPrice);
  }
  const data = {
    labels: Usuario,
    datasets: [
      {
        label: "Usuarios que reservaron y valor del pago",
        data: Precio,
        backgroundColor: "orange",
        borderWidth: 5, // es el borde de las barras
        borderColor: "gray",
        borderWidth: 5, // el borde de la barra
        inflateAmount: 0, // tamaño de las barras tanto alto como ancho
      },
    ],
  };

  let options = {
    responsive: true, // es responsivo
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      title: {
        aling: true,
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoBar">
      <Bar data={data} options={options} />
    </div>
  );
};

const EstadisticasLinealValoracionHoteles = ({ ValoracionHoteles }) => {
  //*---------------------------------Data Del Grafico:
  //? Data es la informacion referente en la que se va a ver en el grafico. ejemplo(precios , ventas , fechas , lo que sea).

  const valoracion = [];
  const Hoteles = [];

  for (let i = 0; i < ValoracionHoteles.length; i++) {
    valoracion.push(ValoracionHoteles[i].valoration);
    Hoteles.push(ValoracionHoteles[i].name);
  }

  let data = {
    labels: Hoteles, // Labels seria el eje X de la grafica y lo que se va a  mostrar.
    datasets: [
      {
        label: "Valoraciones de los Hoteles",
        data: valoracion,
        fill: true, // seria el arrea de la linea (todo lo que hay por debajo)
        borderColor: "gray", // los estilos en commilllas
        borderWidth: 5,
        borderRadius: 5,
        backgroundColor: "orange",
        pointRadius: 6,
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        inflateAmount: 0
      },
    ],
  };

  //* datasets ==> [] ??? Datasets es un array porque cada objeto es solo una linea , por lo tanto puedo crear varias lineas en objetos diferentes en un mismo grafico

  //label : "datos user" ==> seria el "titulo"  de la estadistica
  //data: ==>  seria los datos a mostrar
  // Fill : true ==>   si las lines van a ser rectas o curvas
  //borderColor: red ==> clor de los bordes de la linea.
  //backgroundColor: yellow ==> colo de fondo del grafico
  //pointRadius: 5 ===> el tamaño del punto del grafico.
  //pointBorderColor : blue ===> es el color que se le pone al punto del grafico .
  //pointBackgroundColor: blue ===> El color de fondo del puto del grafico.

  //*-----------------------OPTIONS:
  //* Las opciones trabajan en la grafica no en las lineas.
  //* Es donde voy a determinar de como quiero que funcione mi grafica.

  let options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoLinea">
      <Bar data={data} options={options} />
    </div>
  );
};

//*----------------------------------------Barra:
//import { Bar } from 'react-chartjs-2';
//BarElement
//Bar

const EstadisticasBarraHotelMasReservado = ({ HotelMasReservado }) => {


  const reservas = [];
  const NameHotel = [];

  for (let i = 0; i < HotelMasReservado.length; i++) {
    reservas.push(HotelMasReservado[i].cant);
    NameHotel.push(HotelMasReservado[i].hotelFind.name);
  }

  const data = {
    labels: NameHotel,
    datasets: [
      {
        label: "Hoteles mas reservados",
        data: reservas,
        backgroundColor: "orange",
        borderWidth: 5, // es el borde de las barras
        borderColor: "gray",
        borderRadius: 5, // el borde de la barra
        inflateAmount: 0, // tamaño de las barras tanto alto como ancho
      },
    ],
  };

  let options = {
    responsive: true, // es responsivo
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      title: {
        aling: true,
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoBar">
      <Bar data={data} options={options} />
    </div>
  );
};
//--------------------------------------------------------------------------------//
const EstadisticasBarraMesMasReservado = ({ MesMasReservado }) => {


  const Cantidad = [];
  const Meses = [];

  for (let i = 0; i < MesMasReservado.length; i++) {
    Meses.push(MesMasReservado[i].name);
    Cantidad.push(MesMasReservado[i].cant);
  }

  const data = {
    labels: Meses,
    datasets: [
      {
        label: "Meses mas reservados",
        data: Cantidad,
        backgroundColor: "orange",
        borderWidth: 5, // es el borde de las barras
        borderColor: "gray",
        borderRadius: 5, // el borde de la barra
        inflateAmount: 0, // tamaño de las barras tanto alto como ancho
      },
    ],
  };

  let options = {
    responsive: true, // es responsivo
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      title: {
        aling: true,
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoBar">
      <Bar data={data} options={options} />
    </div>
  );
};

//*----------------------------------------Doughnut:
//import { Doughnut } from 'react-chartjs-2';
//Doughnut

const EstadisticasLinealUsuarioQueMasReservo = ({ UsuarioQueMasReservo }) => {

  const Reserva = [];
  const Usuario = [];

  for (let i = 0; i < UsuarioQueMasReservo.length; i++) {
    Reserva.push(UsuarioQueMasReservo[i].cant);
    Usuario.push(UsuarioQueMasReservo[i].user.username);
  }

  let data = {
    labels: Usuario, // Labels seria el eje X de la grafica y lo que se va a  mostrar.
    datasets: [
      {
        label: "Cantidad de reservas por usuario",
        data: Reserva,
        fill: true, // seria el arrea de la linea (todo lo que hay por debajo)
        borderColor: "gray", // los estilos en commilllas
        backgroundColor: "orange",
        borderWidth: 5,
        pointRadius: 6,
        borderRadius: 5,
        pointBorderColor: "black",
        pointBackgroundColor: "white",
      },
    ],
  };

  let options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoLinea">
      <Bar data={data} options={options} />
    </div>
  );
};

//*------------------------------------------------------------------------------*//
const EstadisticasLinealProvinciasMasReservada = ({
  ProvinciasMasReservada,
}) => {

  const Provincias = [];
  const Reservas = [];

  for (let i = 0; i < ProvinciasMasReservada.length; i++) {
    Reservas.push(ProvinciasMasReservada[i].cant);
    Provincias.push(ProvinciasMasReservada[i].name);
  }

  let data = {
    labels: Provincias, // Labels seria el eje X de la grafica y lo que se va a  mostrar.
    datasets: [
      {
        label: "Provincias donde mas se reservo",
        data: Reservas,
        fill: true, // seria el arrea de la linea (todo lo que hay por debajo)
        borderColor: "orange", // los estilos en commilllas
        // backgroundColor: "blue",
        pointRadius: 6,
        pointBorderColor: "black",
        pointBackgroundColor: "white",
      },
    ],
  };

  let options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoLinea">
      <Line data={data} options={options} />
    </div>
  );
};

export {
  EstadisticasLinealValoracionHoteles,
  EstadisticasLinealTodosLosBookings,
  EstadisticasBarraMesMasReservado,
  EstadisticasBarraHotelMasReservado,
  EstadisticasLinealUsuarioQueMasReservo,
  EstadisticasLinealProvinciasMasReservada,
};

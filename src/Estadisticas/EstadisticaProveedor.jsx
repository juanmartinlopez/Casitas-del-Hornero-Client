import { Line, Bar } from "react-chartjs-2";
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

const EstadisticasLinealPartner = ({ MesDondeMasSeReservoPartner }) => {
  const Usuario = [];
  const Reserva = [];

  for (let i = 0; i < MesDondeMasSeReservoPartner.length; i++) {
    Usuario.push(MesDondeMasSeReservoPartner[i].name);
    Reserva.push(MesDondeMasSeReservoPartner[i].cant);
  }

  let data = {
    labels: Usuario, // Labels seria el eje X de la grafica y lo que se va a  mostrar.
    datasets: [
      {
        label: "Meses Donde Mas Se Reservo",
        data: Reserva,
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
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            return value + " Reservas"; // Agregar 'Reservas' al valor en el eje Y
          },
        },
        title: {
          display: true,
          text: "Cantidad de Reservas", // Agregar título al eje Y
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="ContainerGraficoLinea">
      <Line data={data} options={options} />
    </div>
  );
};

//*----------------------------------------Barra:
//import { Bar } from 'react-chartjs-2';
//BarElement
//Bar

const EstadisticasBarraPartner = ({ HotelesMasReservadosPartner }) => {
  const NameHotel = [];
  const Reserva = [];

  for (let i = 0; i < HotelesMasReservadosPartner.length; i++) {
    NameHotel.push(HotelesMasReservadosPartner[i].hotel.name);
    Reserva.push(HotelesMasReservadosPartner[i].cant);
  }

  const data = {
    labels: NameHotel,
    datasets: [
      {
        label: "Hotel/es Donde Mas Se Reservo",
        data: Reserva,
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

export { EstadisticasLinealPartner, EstadisticasBarraPartner };

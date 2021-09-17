import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const VerticalBar = (props) => {
  const [labels, setLabels] = useState([dias]);

  const dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const backgroundColor = [];
  const numbers = [12, 19, 3, 5, 20, 3, 15];
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  useEffect(() => {
    console.log(props.fecha);
    if (props.fecha === 1) {
      setLabels(dias);
    }
    if (props.fecha === 2) {
      setLabels(semanas);
    }
    if (props.fecha === 3) {
      setLabels(meses);
    }
  }, [props.fecha]);

  var v = 0;
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > v) {
      v = numbers[i];
    }
  }

  for (i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] === v) {
      backgroundColor.push("rgba(75, 192, 192, 0.8)");
    } else {
      backgroundColor.push(colors[i]);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: numbers,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="vertical-bar">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalBar;

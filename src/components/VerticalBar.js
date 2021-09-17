import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const VerticalBar = (props) => {
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
  const [labels, setLabels] = useState([dias]);

  const backgroundColor = [];
  const numbersDias = [];
  const numbersMeses = [];
  const numbersSemanas = [];
  const [numbers, setNumbers] = useState([12, 20, 3, 5, 15, 3, 19]);
  const colors = [
    "rgba(255, 40, 180, 0.2)",
    "rgba(54, 162, 10, 0.2)",
    "rgba(255, 100, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(193, 99, 255, 0.2)",
    "rgba(280, 111, 64, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  useEffect(() => {
    if (props.fecha === 1) {
      setLabels(dias);
      setNumbers(numbersDias);
    }
    if (props.fecha === 2) {
      setLabels(semanas);
      setNumbers(numbersSemanas);
    }
    if (props.fecha === 3) {
      setLabels(meses);
      setNumbers(numbersMeses);
    }
  }, [props.fecha]);

  var v = 0;
  for (var i = 0; i < 12; i++) {
    numbersMeses.push(Math.random() * 100);

    // console.log(numbers.length);
  }
  for (i = 0; i < 5; i++) {
    numbersSemanas.push(Math.random() * 100);

    // console.log(numbers.length);
  }
  for (i = 0; i < 7; i++) {
    numbersDias.push(Math.random() * 100);
  }
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] > v) {
      v = numbers[i];
    }
  }
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] === v) {
      backgroundColor.push("rgba(0, 255, 0, 0.7)");
    } else {
      backgroundColor.push(colors[i]);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Mayor número",
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const VerticalBar = (props) => {
  const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
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

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [time, setTime] = useState("");

  const [labels, setLabels] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const backgroundColor = [];
  const [label, setLabel] = useState("");
  const numbersSemanas = [5, 8, 4, 6];
  var labelTest = [];
  var numberTest = [];
  const colors = [
    "rgba(255, 40, 180, 0.2)",
    "rgba(54, 162, 10, 0.2)",
    "rgba(255, 100, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(100, 255, 0, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(100, 100, 99, 0.2)",
  ];

  const handleSales = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/report/sales/${date}/${props.fecha}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        if (data[0] !== undefined) {
          // console.log("Esta ejecutando");
          if (props.fecha === "D") {
            for (let i = 0; i < data.length; i++) {
              for (let x = 0; x < 1; x++) {
                labelTest.push(data[i].days[x].nameDaySpanish);
                if (props.venta === 1) {
                  numberTest.push(JSON.parse(data[i].days[x].totalQuantityDay));
                } else if (props.venta === 2) {
                  numberTest.push(JSON.parse(data[i].days[x].totalMountDay));
                }
              }
            }
            for (let i = 0; i < 7; i++) {
              if (!labelTest.includes(dias[i])) {
                labelTest.splice(i, 0, dias[i]);
                numberTest.splice(i, 0, 0);
              }
            }
            setLabels(labelTest);
            setNumbers(numberTest);
            setTime(data[0].rankOfTime);
          } else if (props.fecha === "M") {
            for (let i = 0; i < data.length; i++) {
              for (let x = 0; x < 1; x++) {
                labelTest.push(data[i].months[x].nameMonthSpanish);
                if (props.venta === 1) {
                  setLabel("Cantidad de ventas");
                  numberTest.push(
                    JSON.parse(data[i].months[x].totalQuantityMonth)
                  );
                } else if (props.venta === 2) {
                  setLabel("S/.");
                  numberTest.push(
                    JSON.parse(data[i].months[x].totalMountMonth)
                  );
                }
              }
            }
            for (let i = 0; i < 12; i++) {
              if (!labelTest.includes(meses[i])) {
                labelTest.splice(i, 0, meses[i]);
                numberTest.splice(i, 0, 0);
              }
            }
            setLabels(labelTest);
            setNumbers(numberTest);
            setTime(data[0].rankOfTime);
          }
          // else if (props.fecha === "S") {
          //   setTime("Octubre");
          // }

          // console.log(data);
          // console.log(labelTest);
          // console.log(numberTest);
        } else if (data[0] === undefined) {
          setLabels([]);
          setNumbers([]);
          setTime("");
        }

        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    return rspApi;
  };
  var v = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > v) {
      v = numbers[i];
    }
  }
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === v) {
      backgroundColor.push("rgba(255, 221, 0, 0.7)");
    } else {
      backgroundColor.push(colors[i]);
    }
  }

  useEffect(() => {
    if (props.fecha !== "" && props.venta !== 0) {
      handleSales();
    }
  }, [props.fecha, props.venta]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="vertical-bar">
      {props.fecha !== "" && props.venta !== 0 && labels.length !== 0 ? (
        <div
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{
            __html: ` <h3>Mostrando datos en las fechas de</h3> <p>${time}</p> `,
          }}
        />
      ) : props.fecha !== "" && props.venta !== 0 && labels.length === 0 ? (
        <div
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{
            __html: ` <h3>No hay registros para la búsqueda</h3>`,
          }}
        />
      ) : null}

      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalBar;

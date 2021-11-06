import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
Date.prototype.restDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};
Date.prototype.addYear = function (year) {
  const date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() + year);
  return date;
};
Date.prototype.restYear = function (year) {
  const date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() - year);
  return date;
};

const VerticalBar = (props) => {
  // const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
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
  const [longDates, setLongDates] = useState(today);
  const [date, setDate] = useState(
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );

  var year = today.getFullYear();
  const [time, setTime] = useState("");

  const [labels, setLabels] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const backgroundColor = [];
  const [label, setLabel] = useState("");
  const [listData, setListData] = useState([]);
  const [textoVentas, setTextoVentas] = useState("Cantidad");
  // const numbersSemanas = [5, 8, 4, 6];
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
        console.log(data);
        if (data.rankOfTime !== undefined) {
          // console.log("Esta ejecutando");
          if (props.fecha === "D") {
            for (let i = 0; i < data.listDays.length; i++) {
              labelTest.push(data.listDays[i].nameDaySpanish);
              if (props.venta === 1) {
                setLabel("Cantidad de ventas");
                numberTest.push(JSON.parse(data.listDays[i].totalQuantityDay));
                setTextoVentas("Cantidad");
              } else if (props.venta === 2) {
                setLabel("S/.");
                numberTest.push(JSON.parse(data.listDays[i].totalMountDay));
                setTextoVentas("Ventas");
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
            setTime(data.rankOfTime);
          } else if (props.fecha === "M") {
            for (let i = 0; i < data.listMonths.length; i++) {
              labelTest.push(data.listMonths[i].nameMonthSpanish);
              if (props.venta === 1) {
                setLabel("Cantidad de ventas");
                numberTest.push(
                  JSON.parse(data.listMonths[i].totalQuantityMonth)
                );
                setTextoVentas("Cantidad");
              } else if (props.venta === 2) {
                setLabel("S/.");
                numberTest.push(JSON.parse(data.listMonths[i].totalMountMonth));
                setTextoVentas("Ventas");
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
            setTime(data.rankOfTime + " del " + year);
          }
          // else if (props.fecha === "S") {
          //   setTime("Octubre");
          // }

          // console.log(data);
          // console.log(labelTest);
          // console.log(numberTest);
        } else if (data.listDays === undefined) {
          setLabels([]);
          setNumbers([]);
          setTime("");
        }

        return response;
      })
      .catch((error) => {
        console.log(error);
        setLabels([]);
        setNumbers([]);
        setTime("");
      });
    return rspApi;
  };

  const handleGetSalesConsolidate = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/report/salesConsolidate/${date}/${props.fecha}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        setListData(data);
        console.log(data);

        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    return rspApi;
  };

  const handleDates = (id) => {
    if (props.fecha === "D") {
      if (id === 1) {
        const dat = new Date(longDates);
        const longDate = dat.restDays(7);
        setLongDates(longDate);
        const shorDate =
          longDate.getFullYear() +
          "-" +
          (longDate.getMonth() + 1) +
          "-" +
          longDate.getDate();

        setDate(shorDate);
        console.log(date);
      } else if (id === 2) {
        const dat = new Date(longDates);
        const longDate = dat.addDays(7);
        setLongDates(longDate);
        const shorDate =
          longDate.getFullYear() +
          "-" +
          (longDate.getMonth() + 1) +
          "-" +
          longDate.getDate();
        setDate(shorDate);
        console.log(date);
      }
    } else if (props.fecha === "M") {
      if (id === 1) {
        const dat = new Date(longDates);
        const longDate = dat.restYear(1);
        setLongDates(longDate);
        const shorDate =
          longDate.getFullYear() +
          "-" +
          (longDate.getMonth() + 1) +
          "-" +
          longDate.getDate();
        year = longDate.getFullYear();
        setDate(shorDate);
        console.log(year);
      } else if (id === 2) {
        const dat = new Date(longDates);
        const longDate = dat.addYear(1);
        setLongDates(longDate);
        const shorDate =
          longDate.getFullYear() +
          "-" +
          (longDate.getMonth() + 1) +
          "-" +
          longDate.getDate();
        year = longDate.getFullYear();
        console.log(year);
        setDate(shorDate);
      }
    }
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
      handleGetSalesConsolidate();
    }
  }, [props.fecha, props.venta, date]);

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            size="medium"
            aria-label="arrowLeft"
            color="inherit"
            style={{ marginRight: "15px" }}
            onClick={() => handleDates(1)}
          >
            <ArrowBackIos />
          </IconButton>
          <div
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: ` <h3>Mostrando datos en las fechas de</h3> <p>${time}</p> `,
            }}
          />
          <IconButton
            size="medium"
            aria-label="arrowLeft"
            color="inherit"
            style={{ marginRight: "15px" }}
            onClick={() => handleDates(2)}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      ) : props.fecha !== "" && props.venta !== 0 && labels.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            size="medium"
            aria-label="arrowLeft"
            color="inherit"
            style={{ marginRight: "15px" }}
            onClick={() => handleDates(1)}
          >
            <ArrowBackIos />
          </IconButton>
          <div
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: ` <h3>No hay registros para la búsqueda en las fechas de </h3><p>${date}</p>`,
            }}
          />
          <IconButton
            size="medium"
            aria-label="arrowLeft"
            color="inherit"
            style={{ marginRight: "15px" }}
            onClick={() => handleDates(2)}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      ) : null}

      <Bar data={data} options={options} />

      <TableContainer className="table">
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="font-tittle">Servicio</TableCell>
              <TableCell className="font-tittle">{textoVentas}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData &&
              listData.map(
                ({
                  serviceName,
                  mountTotalFormat,
                  mountTotal,
                  quantityService,
                }) => (
                  <TableRow key={mountTotal}>
                    <TableCell className="font">
                      {props.fecha !== "" && props.venta !== 0
                        ? serviceName
                        : null}
                    </TableCell>
                    <TableCell className="font">
                      {props.venta === 1
                        ? quantityService
                        : props.venta === 2
                        ? mountTotalFormat
                        : null}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VerticalBar;

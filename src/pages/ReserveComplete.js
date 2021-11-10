import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
// import Logo from "../assets/images/separalo-logo-for-email.svg";

export const ReserveComplete = () => {
  const history = useHistory();

  const { message } = JSON.parse(localStorage.getItem("data"));
  const { data } = JSON.parse(localStorage.getItem("data"));

  const handleRedirect = () => {
    if (
      sessionStorage.getItem("logged") === "true" &&
      sessionStorage.getItem("workflow") === "C"
    ) {
      history.push("/customer-appointment");
      // history.go();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="page-container" style={{ padding: 0 }}>
      <div className="confirm-page">
        <div className="content-container" style={{ maxWidth: "600px" }}>
          <img
            src="https://elasticbeanstalk-us-east-2-257249679707.s3.us-east-2.amazonaws.com/internal-api/branding/separalo-logo-for-email.png"
            alt="¡logo separalo.pe!"
            style={{ maxHeight: "1000000px" }}
          />
          <h1>¡Gracias por reservar tu cita!</h1>
          <p
            style={{
              width: "62%",
              margin: "auto",
              paddingBottom: "1rem",
              textAlign: "justify",
            }}
          >
            Con el siguiente código{" "}
            <p
              style={{
                color: "#5829dd",
                display: "inline-block",
                margin: "0",
                paddin: "0",
              }}
            >
              {message}
            </p>{" "}
            confirmamos que hemos separado tu cita. Para continuar debes hacer
            la transferencia bancaria.
          </p>
          {/* <div className="precio-container">
            <div className="precio">S/. {price}</div>
          </div> */}

          <TableContainer className="table-reserva">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">
                    Cuenta de ahorros soles Banco de Crédito del Perú (BCP)
                  </TableCell>
                  <TableCell className="font-tittle">M16 S.A.C.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="font">
                    Número de cuenta: 194-05364837-0-26
                  </TableCell>
                  <TableCell className="font">RUC: 20601855471</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font">
                    Código interbancario (CCI): 002 194 105 36 48 37 026 98
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <p
            style={{
              margin: "20px auto 0 auto",
              padding: 0,
              width: "62%",
              textAlign: "justify",
            }}
          >
            Tu cita quedará confirmada cuando envíes tu voucher a:
          </p>
          <div className="precio-container" style={{ margin: "20px 0" }}>
            <div
              className="precio"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              reservas@separalo.pe
            </div>
          </div>

          <div style={{ margin: "20px 0" }}>
            <p
              style={{
                color: "#5829dd",
                textAlign: "left",
              }}
            >
              Información de tu cita:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <p>Nombre del servicio</p>
                  <p style={{ fontWeight: "bold" }}>{data[0].titleService}</p>
                </div>
                <div>
                  <p>Categoría</p>
                  <p style={{ fontWeight: "bold" }}>{data[0].nameCategory}</p>
                </div>
              </div>
              <hr
                style={{
                  color: "#ffdd00",
                  width: "0",
                  borderLeft: "1px solid #ffdd00",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <p>Fecha de su cita</p>
                  <p style={{ fontWeight: "bold" }}>
                    {data[0].dateReservation}
                  </p>
                </div>
                <div>
                  <p>Hora de su cita</p>
                  <p style={{ fontWeight: "bold" }}>
                    {data[0].timeReservation}
                  </p>
                </div>
              </div>
              <hr
                style={{
                  color: "#ffdd00",
                  width: "0",
                  borderLeft: "1px solid #ffdd00",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <p>Duración de su cita</p>
                  <p style={{ fontWeight: "bold" }}>
                    {data[0].durationReservation}
                  </p>
                </div>
                <div>
                  <p>Costo por la cita</p>
                  <p style={{ fontWeight: "bold", color: "#5829dd" }}>
                    {data[0].price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <span className="mensaje">
            Una vez que hayas pagado notificaremos al negocio. Recuerda
            presentarte al local 10 minutos antes de tu cita.
          </span>
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="btn-primary_reserva"
            fullWidth
            onClick={handleRedirect}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
};

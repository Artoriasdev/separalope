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
import Logo from "../assets/images/logo-separalo@3x.svg";

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
          <img src={Logo} style={{ maxWidth: "300px" }} />
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
            confirmamos que tu reserva ha sido satisfactoria. Para continuar
            debes hacer la transferencia bancaria a
          </p>
          {/* <div className="precio-container">
            <div className="precio">S/. {price}</div>
          </div> */}

          <TableContainer className="table-reserva">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">
                    Cuenta de ahorros soles Banco Interbank
                  </TableCell>
                  <TableCell className="font-tittle">M16 S.A.C.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="font">
                    Número de cuenta: 00033876487348723
                  </TableCell>
                  <TableCell className="font">RUC: 20601855471</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font">
                    Número de cuenta interbancario (CCI):
                    00033876487348723789898
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
            Luego no olvides enviar tu voucher con tus datos personales a
          </p>
          <div className="precio-container" style={{ margin: "20px 0" }}>
            <div
              className="precio"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              contacto@separalo.pe
            </div>
          </div>

          <div style={{ margin: "20px 0" }}>
            <p
              style={{
                color: "#5829dd",
                textAlign: "left",
              }}
            >
              Información de tu reserva:
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
            Una vez enviado el voucher de pago, se le enviará un mensaje a su
            correo electrónico confirmando su pago, el mismo día de su cita le
            enviaremos un mensaje SMS, recuerde estar unos minutos antes.
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

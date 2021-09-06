import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const ReserveComplete = (props) => {
  const history = useHistory();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    handlePrecio();
  });

  const handlePrecio = () => {
    const id = props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServicesById/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { price } = response.data.data[0];

        setPrice(price);

        return response;
      });
    return rspApi;
  };

  const handleRedirect = () => {
    if (sessionStorage.getItem("logged") === "true") {
      history.push("/customer-appointment");
      history.go();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="page-container" style={{ padding: 0 }}>
      <div className="confirm-page">
        <div className="content-container" style={{ maxWidth: "600px" }}>
          <h1>¡Gracias por confirmar tu clase!</h1>
          <p
            style={{
              width: "62%",
              margin: "auto",
              paddingBottom: "1rem",
              textAlign: "justify",
            }}
          >
            Se te ha enviado un correo con la información de tu clase, para
            continuar debes hacer la transferencia bancaria de
          </p>
          <div className="precio-container">
            <div className="precio">S/. {price}</div>
          </div>
          <p
            style={{
              margin: "0 auto",
              padding: 0,
              width: "62%",
              textAlign: "justify",
            }}
          >
            Luego no olvides enviar tu voucher con tus datos personales a
          </p>
          <span className="correo font-p">sepáralope@sepáralo.pe</span>
          <TableContainer className="table-reserva">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">
                    Cuenta de ahorros soles Banco Scotiabank
                  </TableCell>
                  <TableCell className="font-tittle">
                    SEPÁRALOPE.PE S.A.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="font">
                    Número de cuenta: 00033876487348723
                  </TableCell>
                  <TableCell className="font">RUC: 84756834768437</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font">
                    Código interbancario (CCI): 00033876487348723789898
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <span className="mensaje">
            Una vez enviado el voucher de pago, se le enviara un mensaje a su
            correo electrónico confirmando su pago y el link de Zoom para su
            clase, el mismo dia de su sesión le enviaremos un mensaje SMS,
            recuerde estar unos minutos antes de su sesión.
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

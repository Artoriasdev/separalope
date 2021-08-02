import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { Component } from "react";
import Container from "../Modal/Container/ContainerService";
import ModalError from "./ModalError";

class BusinessServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerText: "Agregar servicio",
      disclaimerModal: "",
      showModalError: false,
    };
  }

  componentDidMount() {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusiness";

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          console.log(response);

          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesion expirada, porfavor vuelva a iniciar sesion",
            });
            setTimeout(() => {
              this.props.history.push("/login/B");
            }, 3000);
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  }

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
  };

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  rows = [
    this.createData(
      "Ice cream sandwich",
      "Clases de inglés básico para niños. Nivel 3 a 5 años",
      "1 hora(s)",
      "S/.30.0",
      "Ver citas pendientes"
    ),
    this.createData(
      "Eclair",
      "Terapias de coaching personalizado para alcanzar tus metas",
      "1 hora(s)",
      "S/.50.0",
      "Ver citas pendientes"
    ),
    this.createData(
      "Cupcake",
      "Cuenta para eliminar",
      "2 hora(s)",
      "S/.30.0",
      "Ver citas pendientes"
    ),
    this.createData(
      "Gingerbread",
      "Necesitas 300 clases para ser como yo",
      "2 hora(s)",
      "S/.75.0",
      "Ver citas pendientes"
    ),
  ];

  render() {
    return (
      <>
        <ModalError
          show={this.state.showModalError}
          closeCallback={this.toggleModalError}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalError>

        <div>
          <h4>Inicio &gt; Mis servicios</h4>
          <h1>Mis servicios</h1>
          <h3>Tus servicios</h3>
          <Container triggerText={this.state.triggerText} />

          <div style={{ display: "block" }}>
            <h4>Estos son los servicios que han sido registrados</h4>
          </div>

          <TableContainer
            style={{
              width: "85%",
              borderRadius: "10px 10px",
              margin: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead
                style={{
                  background: "#f3f3f3",
                }}
              >
                <TableRow>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Descripcion</TableCell>
                  <TableCell className="font-tittle">Duracion</TableCell>
                  <TableCell className="font-tittle">Precio</TableCell>
                  <TableCell className="font-tittle" align="center">
                    Citas
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font">{row.name}</TableCell>
                    <TableCell className="font">{row.calories}</TableCell>
                    <TableCell className="font">{row.fat}</TableCell>
                    <TableCell className="font">{row.carbs}</TableCell>
                    <TableCell className="font" align="center">
                      {row.protein}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default BusinessServices;

import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Fade,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Search, Timer } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import Code from "../../assets/images/code.svg";
import Usuario from "../../assets/images/usuario.svg";
import Hora from "../../assets/images/hora.svg";
import fecha from "../../assets/images/fecha.svg";
import Cerrar from "../../assets/images/Cerrar.svg";
import "animate.css";

class FutureAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      modal: false,
      forceRedirect: false,
      message: "",
      card: false,
      cardData: [],
    };
  }

  componentDidMount() {
    try {
      this.handleGetReservationConfirmByBusiness();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetReservationConfirmByBusiness = () => {
    const id = this.props.id;
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationConfirmByBusiness/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          appointments: data,
        });
        console.log(data);

        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("tradename");
          sessionStorage.removeItem("logo");
          this.setState({
            modal: true,
            message:
              "Su sesión ha expirado. Por favor vuelva a iniciar sesión.",
            forceRedirect: true,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          });
        }
      });
    return rspApi;
  };

  handleCard = (id) => {
    const data = this.state.appointments.find(
      (arreglo) => arreglo.codeReservation === id
    );
    console.log(id);
    console.log(data);
    this.setState({
      card: true,
      cardData: [data],
    });
  };

  handleCardClose = () => {
    this.setState({ card: false });
  };

  handleClose = () => {
    this.setState({ modal: false });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/");
      this.props.history.go();
    }
  };

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={() => this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.modal}>
            <div className="modal-message-container">
              <p>{this.state.message}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.handleClose}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
        <div className="appointment-cards">
          <TableContainer className="table">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Categoría</TableCell>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Fecha</TableCell>
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle" width="12%">
                    Usuario
                  </TableCell>
                  <TableCell className="font-tittle">
                    Nombres y Apellidos
                  </TableCell>
                  <TableCell className="font-tittle" align="center">
                    Código Reserva
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.appointments.map(
                  ({
                    id,
                    category,
                    titleService,
                    dateReservation,
                    timeReservation,
                    emailCustomer,
                    nameCustomer,
                    codeReservation,
                  }) => (
                    <TableRow key={id}>
                      <TableCell className="font">{category}</TableCell>
                      <TableCell className="font">{titleService}</TableCell>
                      <TableCell className="font">{dateReservation}</TableCell>
                      <TableCell className="font">{timeReservation}</TableCell>
                      <TableCell
                        className="font"
                        style={{
                          textDecoration: "underline",
                          color: "#0862B5",
                        }}
                      >
                        {emailCustomer}
                      </TableCell>
                      <TableCell className="font">{nameCustomer}</TableCell>
                      <TableCell
                        onClick={() => this.handleCard(codeReservation)}
                        className="font"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {codeReservation}
                        <Search
                          style={{
                            marginBottom: "-4px",
                            color: "#5950A2",
                            marginLeft: "5px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {this.state.card ? (
            <div className="mdal animate__animated animate__fadeIn">
              <div className="overlay" onClick={() => this.handleCardClose()} />
              <div className="mdal_content">
                {this.state.cardData &&
                  this.state.cardData.map(
                    ({
                      titleService,
                      emailCustomer,
                      dateReservation,
                      durationReservation,
                      timeReservation,
                      codeReservation,
                    }) => (
                      <Card
                        style={{
                          width: 275,
                          display: "inline-block",
                          padding: "20px",
                        }}
                        variant="elevation"
                        key={titleService}
                      >
                        <CardContent
                          style={{ padding: "0", textAlign: "right" }}
                        >
                          <IconButton
                            aria-label="close"
                            style={{ margin: "0" }}
                            onClick={this.handleCardClose}
                          >
                            <img src={Cerrar} alt="cerrar" />
                          </IconButton>
                        </CardContent>
                        <CardContent
                          className="font-p"
                          style={{
                            color: "#5950A2",
                            fontSize: "22px",
                            fontWeight: "bold",
                            lineHeight: "25px",
                            paddingTop: "0",
                          }}
                        >
                          Historial de citas
                        </CardContent>
                        <CardContent className="font-tittle">
                          {titleService}
                        </CardContent>
                        <hr style={{ width: "90%", margin: "0 auto" }} />
                        <CardContent className="font">
                          <img
                            src={Usuario}
                            alt="correo"
                            style={{
                              marginRight: "20px",
                              marginBottom: "-4px",
                            }}
                          />
                          {emailCustomer}
                        </CardContent>
                        <CardContent className="font">
                          <img
                            src={fecha}
                            alt="fecha"
                            style={{
                              marginRight: "20px",
                              marginBottom: "-4px",
                            }}
                          />
                          {dateReservation}
                        </CardContent>
                        <CardContent className="font">
                          <Timer
                            style={{
                              marginBottom: "-4px",
                              fontSize: "25px",
                              marginLeft: "-3px",
                              marginRight: "16px",
                              padding: "0",
                            }}
                          />
                          {durationReservation}
                        </CardContent>
                        <CardContent className="font">
                          <img
                            src={Hora}
                            alt="hora"
                            style={{
                              marginRight: "18px",
                              marginBottom: "-4px",
                            }}
                          />
                          {timeReservation}
                        </CardContent>
                        <CardContent className="font">
                          <img
                            src={Code}
                            alt="codigo"
                            style={{
                              marginRight: "20px",
                              marginBottom: "-4px",
                            }}
                          />
                          {codeReservation}
                        </CardContent>
                      </Card>
                    )
                  )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default FutureAppointments;

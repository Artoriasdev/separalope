import {
  Backdrop,
  Breadcrumbs,
  Button,
  Fade,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import Axios from "axios";
import React from "react";
import { Component } from "react";
import Container from "../Modal/Container/ContainerService";

const styles = (theme) => ({
  renderMobile: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
});

class BusinessServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      triggerText: "Agregar servicio",
      message: "",
      modal: false,
      forceRedirect: false,
      response: false,
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

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusiness`;

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          if (response.data.response === "true") {
            this.handleGetList();
          } else {
            this.setState({
              modal: true,
              message: "Usted no esta autorizado para ver esta información",
              forceRedirect: true,
            });
          }

          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              modal: true,
              message: "Sesión expirada, porfavor vuelva a iniciar sesión",
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
    } catch (error) {
      console.log(error);
    }
  }

  handleGetList = () => {
    const id = sessionStorage.getItem("id");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusiness/${id}`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          dataList: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/login/B");
      this.props.history.go();
    }
  };

  handleEdit = (id) => {
    this.props.history.push(`/business/services/details/${id}/1/0`);
  };

  handleAppointment = (id) => {
    this.props.history.push(`/business/services/appointment/${id}/1/0`);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={this.handleClose}
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

        <div className="page-container" style={{ padding: "0" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="medium" />}
            aria-label="breadcrumb"
            className="font"
          >
            <Link href="/" color="textPrimary">
              Inicio
            </Link>
            <Link
              color="textSecondary"
              href="/business/services"
              // onClick={handleClick}
            >
              Mis servicios
            </Link>
          </Breadcrumbs>
          <div
            className="form-profile"
            style={{ width: "100%", marginLeft: "0" }}
          >
            <h1>Mis servicios</h1>

            <Container
              triggerText={this.state.triggerText}
              history={this.props.history}
            />
          </div>

          <hr />

          <h3>Estos son los servicios que han sido registrados</h3>
          <TableContainer className="table">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className={`${classes.renderMobile} font-tittle`}>
                    Descripción
                  </TableCell>
                  <TableCell className="font-tittle">Categoría</TableCell>
                  <TableCell className="font-tittle">Duración</TableCell>
                  <TableCell className="font-tittle" width="12%">
                    Precio
                  </TableCell>
                  <TableCell className="font-tittle" align="center">
                    Citas
                  </TableCell>
                  <TableCell className="font-tittle" align="center">
                    Editar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.dataList.map(
                  ({
                    id,
                    title,
                    description,
                    duration,
                    currencySymbol,
                    price,
                    category,
                  }) => (
                    <TableRow key={id}>
                      <TableCell className="font">{title}</TableCell>
                      <TableCell
                        className={`${classes.renderMobile} font`}
                        width="25%"
                      >
                        {description}
                      </TableCell>
                      <TableCell className="font">{category}</TableCell>
                      <TableCell className="font">{duration}</TableCell>
                      <TableCell className="font">
                        {currencySymbol + " " + price}
                      </TableCell>
                      <TableCell className="font" align="center">
                        <button
                          className="font"
                          onClick={() => this.handleAppointment(id)}
                        >
                          Ver citas pendientes
                        </button>
                      </TableCell>
                      <TableCell className="font" align="center">
                        <button
                          className="font"
                          onClick={() => this.handleEdit(id)}
                        >
                          Editar servicio
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(BusinessServices);

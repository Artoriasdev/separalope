import {
  Backdrop,
  Breadcrumbs,
  Button,
  Fade,
  Link,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import VerticalBar from "../components/VerticalBar";
import { NavigateNext } from "@material-ui/icons";

class BusinessReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha: "",
      ventas: 0,
      message: "",
      modal: false,
      forceRedirect: false,
      listData: [],
      today: new Date(),
      date: "",
      textoVentas: "Cantidad",
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

      const rspApi = axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
          } else {
            this.setState({
              modal: true,
              message: "Usted no esta autorizado para ver esta información",
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
      this.setState({
        listData: [],
      });
    }
  }

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    if (formField === "fecha") {
      this.setState({
        fecha: value,
      });

      console.log(this.state.date);
    } else if (formField === "venta") {
      this.setState({
        ventas: value,
      });
      if (value === 1) {
        this.setState({
          textoVentas: "Cantidad",
        });
      } else if (value === 2) {
        this.setState({
          textoVentas: "Ventas",
        });
      }
    }
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
  render() {
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
        <div className="page-container" style={{ padding: 0 }}>
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
              href="/business/reports"
              // onClick={handleClick}
            >
              Mis Reportes
            </Link>
          </Breadcrumbs>
          <h1>Mis reportes</h1>
          <h3 className="register__subtitle">
            Estos son los reportes obtenidos hasta la fecha <br />
            Podrá ver los resultados diarios, semanales y mensuales
          </h3>
          <div>
            <div className="vertical-bar">
              <div className="files">
                <div className="txt-left-nomid">
                  <p>Resultado por :</p>
                  <Select
                    value={this.state.fecha}
                    name="fecha"
                    onChange={this.handleDocumentChange}
                    required
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem selected={true} disabled value={""}>
                      Seleccione
                    </MenuItem>
                    <MenuItem value={"D"}>Días</MenuItem>
                    {/* <MenuItem value={"S"}>Semanas</MenuItem>  */}
                    <MenuItem value={"M"}>Meses</MenuItem>
                  </Select>
                </div>
                <div className="txt-right-nomid">
                  <p>Tipo:</p>
                  <Select
                    value={this.state.ventas}
                    name="venta"
                    onChange={this.handleDocumentChange}
                    required
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem selected={true} disabled value={0}>
                      Seleccione
                    </MenuItem>
                    <MenuItem value={1}>Cantidad</MenuItem>
                    <MenuItem value={2}>Ventas</MenuItem>
                  </Select>
                </div>
              </div>
            </div>

            <VerticalBar
              fecha={this.state.fecha}
              venta={this.state.ventas}
              handleDate={this.handleDate}
            />
          </div>
        </div>
      </>
    );
  }
}

export default BusinessReports;

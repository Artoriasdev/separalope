import { MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import VerticalBar from "./VerticalBar";
import ModalError from "./ModalError";

class BusinessReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha: 1,
      ventas: 1,
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

      const rspApi = axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            console.log("");
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no esta autorizado para ver esta información",
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
              showModalError: true,
              disclaimerModal:
                "Sesión expirada, porfavor vuelva a iniciar sesión",
            });
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  }

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    if (formField === "fecha") {
      this.setState({
        fecha: value,
      });
    } else if (formField === "venta") {
      this.setState({
        ventas: value,
      });
    }
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
    this.props.history.go();
  };
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
        <div className="page-container" style={{ padding: 0 }}>
          <h1>Mis reportes</h1>
          <h3 className="register__subtitle">
            Estos son los reportes obtenidos hasta la fecha <br />
            Podrá ver los resultados diarios, semanales y mensuales
          </h3>
          <div>
            <div className="vertical-bar">
              <div className="files">
                <div className="txt-left">
                  <p>Resultado por :</p>
                  <Select
                    value={this.state.fecha}
                    name="fecha"
                    onChange={this.handleDocumentChange}
                    required
                    variant="outlined"
                    fullWidth
                    displayEmpty={false}
                  >
                    <MenuItem selected={true} disabled value={0}>
                      Resultados
                    </MenuItem>
                    <MenuItem value={1}>Días</MenuItem>
                    <MenuItem value={2}>Semanas</MenuItem>
                    <MenuItem value={3}>Meses</MenuItem>
                  </Select>
                </div>
                <div className="txt-right">
                  <p>Tipo:</p>
                  <Select
                    value={this.state.ventas}
                    name="venta"
                    onChange={this.handleDocumentChange}
                    required
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem disabled value={0}>
                      Tipo
                    </MenuItem>
                    <MenuItem value={1}>Servicios</MenuItem>
                    <MenuItem value={2}>Ventas</MenuItem>
                  </Select>
                </div>
              </div>
            </div>

            <VerticalBar fecha={this.state.fecha} venta={this.state.ventas} />
          </div>
        </div>
      </>
    );
  }
}

export default BusinessReports;

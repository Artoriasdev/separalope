import {
  Breadcrumbs,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import Axios from "axios";
import React from "react";
import { Component } from "react";
import Container from "../Modal/Container/ContainerService";
import ModalError from "./ModalError";

class BusinessServicesCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
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
          if (response.data.response === "true") {
            this.handleGetList();
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
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesion expirada, porfavor vuelva a iniciar sesion",
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
    const cat = this.props.match.params.value;
    const tk = sessionStorage.getItem("tk");

    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServicesByBusinessAndCategory/${1}/${cat}`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        dataList: data,
      });

      return response;
    });
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
  };

  handleTemp = () => {
    this.props.history.push("/business/services/details");
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

        <div style={{ padding: "20px  70px" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="medium" />}
            aria-label="breadcrumb"
            className="font"
          >
            <Link color="inherit" href="/">
              Inicio
            </Link>
            <Link
              color="textPrimary"
              href="/business/services"
              // onClick={handleClick}
            >
              Mis servicios
            </Link>
          </Breadcrumbs>
          <h1>Mis servicios</h1>
          <h3>Tus servicios</h3>
          <Container triggerText={this.state.triggerText} />

          <div style={{ display: "block" }}>
            <h4>Estos son los servicios que han sido registrados</h4>
          </div>

          <Button
            variant="contained"
            color="secondary"
            className="btn-primary"
            style={{ marginTop: "10px", marginBottom: "20px" }}
            onClick={this.handleTemp}
          >
            Ir a detalles citas
          </Button>

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
                  <TableCell className="font-tittle">Stock</TableCell>
                  <TableCell className="font-tittle">Precio</TableCell>
                  <TableCell className="font-tittle" align="center">
                    Citas
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.dataList.map(
                  ({
                    id,
                    title,
                    description,
                    totalStock,
                    currencySymbol,
                    price,
                  }) => (
                    <TableRow key={id}>
                      <TableCell className="font">{title}</TableCell>
                      <TableCell className="font">{description}</TableCell>
                      <TableCell className="font">{totalStock}</TableCell>
                      <TableCell className="font">
                        {currencySymbol + " " + price}
                      </TableCell>
                      <TableCell className="font" align="center">
                        Ver citas pendientes
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

export default BusinessServicesCategory;

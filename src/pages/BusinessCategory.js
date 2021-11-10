import React from "react";
import { Component } from "react";
import Axios from "axios";
import Container from "../Modal/Container/Container";
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Fade,
  Link,
  Modal,
  TextField,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

class BusinessCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      triggerText: "Agregar categoría",
      message: "",
      modal: false,
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
            const { data } = response.data;

            sessionStorage.setItem("id", data[0].id);
            sessionStorage.setItem("tradename", data[0].name);
            sessionStorage.setItem("logo", data[0].logo);

            this.handleGetCategorys();
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

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/category/getCategories`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response.data;
        this.setState({
          typeCategorys: data,
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

  handleRedirect = (id) => {
    this.props.history.push(`/business/services-category/${id}`);
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    this.props.history.push("/login/B");
    this.props.history.go();
  };

  render() {
    return (
      <div className="page-container" style={{ padding: "0" }}>
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
        <div className="category">
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
              href="/business/category"
              // onClick={handleClick}
            >
              Categorías
            </Link>
          </Breadcrumbs>
          <h1>Categorías</h1>
          {/* <div>
            <h3
              style={{ marginTop: "30px", marginBottom: "5px" }}
              className="register__subtitle"
            >
              Si no ubicas tu categoría, ingresa a cuál perteneces.
            </h3>
            <TextField
              className="TxtField"
              name="searchText"
              placeholder="¿Qué estás buscando?"
              variant="standard"
              label="Buscador"
              style={{ margin: "0 20px 20px 0", width: "40%" }}
            />

            <Button
              size="large"
              color="primary"
              variant="contained"
              className="btn-primary"
              style={{ margin: "5px 0" }}
              type="submit"
            >
              Buscar
            </Button>
          </div> */}

          <Container
            triggerText={this.state.triggerText}
            history={this.props.history}
          />

          <div className="category-container">
            <ul>
              {this.state.typeCategorys &&
                this.state.typeCategorys.map(({ id, image, logo, name }) => (
                  <li key={id} onClick={() => this.handleRedirect(id)}>
                    <div
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                      className="card"
                    >
                      <div className="container">
                        <span className="svg">
                          <img src={logo} alt={name} title={name} />
                        </span>
                        <span className="name">
                          <p>{name}</p>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessCategory;

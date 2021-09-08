import React from "react";
import { Component } from "react";
import Axios from "axios";
import Container from "../Modal/Container/Container";
import { Breadcrumbs, Button, Link, TextField } from "@material-ui/core";
import ModalError from "./ModalError";
import { NavigateNext } from "@material-ui/icons";

class BusinessCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      triggerText: "Agregar categoría",
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
            const { data } = response.data;

            sessionStorage.setItem("id", data[0].id);
            sessionStorage.setItem("tradename", data[0].name);
            sessionStorage.setItem("logo", data[0].logo);

            this.handleGetCategorys();
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
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  }

  // componentDidMount() {
  //   try {
  //     this.handleGetCategorys();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;
      this.setState({
        typeCategorys: data,
      });

      return response;
    });
    return rspApi;
  };

  handleRedirect = (id) => {
    this.props.history.push(`/business/services-category/${id}`);
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
      <div className="page-container" style={{ padding: "0", width: "80%" }}>
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
            href="/business/category"
            // onClick={handleClick}
          >
            Categorías
          </Link>
        </Breadcrumbs>
        <h1>Categorías</h1>
        <div>
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
        </div>

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
    );
  }
}

export default BusinessCategory;

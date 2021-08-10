import React from "react";
import { Component } from "react";
import Axios from "axios";
import Container from "../Modal/Container/Container";
import { Breadcrumbs, Button, Link, TextField } from "@material-ui/core";
import ModalError from "./ModalError";
import { NavigateNext } from "@material-ui/icons";

class BusinessMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      triggerText: "Agregar categoria",
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
          if (response.data.response === "true") {
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
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
  };

  render() {
    return (
      <div style={{ padding: "20px  30px" }}>
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
            Categorias
          </Link>
        </Breadcrumbs>
        <h1>Categorias</h1>
        <form>
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
            style={{ margin: "0 20px 20px 0", width: "80vh" }}
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
        </form>

        {/* aqui va el container */}
        <Container triggerText={this.state.triggerText} />

        <ul>
          {this.state.typeCategorys &&
            this.state.typeCategorys.map(({ id, image, logo, name }) => (
              <li
                key={id}
                style={{ display: "inline-block", position: "relative" }}
              >
                <a
                  style={{
                    backgroundImage: `url(${image})`,
                    textDecoration: "none",
                  }}
                  className="card"
                  href="#"
                >
                  <div
                    style={{
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                      background: "rgba(0, 0, 0, 0.3)",
                      paddingTop: "80px",
                    }}
                  >
                    <span
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#ffdd00",
                        paddingTop: "35px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingBottom: "5px",
                      }}
                    >
                      <img src={logo} alt={name} title={name} />
                    </span>
                    <span>
                      <p
                        style={{
                          color: "#ffff",
                          marginTop: "15px",
                          padding: "0px",
                          fontSize: "18px",
                        }}
                      >
                        {name}
                      </p>
                    </span>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default BusinessMenu;

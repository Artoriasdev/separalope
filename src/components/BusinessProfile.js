import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import { Breadcrumbs, Button, Link, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import { NavigateNext, PowerSettingsNew, Save } from "@material-ui/icons";
import ModalError from "./ModalError";
import ModalSucess from "./ModalSucess";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import FullPageLoader from "./FullPageLoader";

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: [],
      logo: "",
      name: "",
      edit: false,
      showModalError: false,
      showModalSuccess: false,
      disclaimerModal: "",
      isLoading: false,
    };
  }
  handleEdit = () => {
    this.setState({ edit: true });
    console.log(this.state.edit);
  };

  componentDidMount() {
    try {
      (async () => {
        await this.handleGetData();
      })();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusiness";

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            console.log(data);
            sessionStorage.setItem("tradename", data[0].name);
            this.setState({
              typeData: data,
              logo: data[0].logo,
              name: data[0].name,
            });
            sessionStorage.setItem("logo", this.state.typeData[0].logo);

            const Formik = this.form;
            Formik.setFieldValue("nombreCompañia", this.state.typeData[0].name);
            Formik.setFieldValue(
              "nombreComercial",
              this.state.typeData[0].tradename
            );
            Formik.setFieldValue(
              "numeroDocumento",
              this.state.typeData[0].documentNumber
            );
            Formik.setFieldValue("correo", this.state.typeData[0].email);
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no está autorizado para ver esta información",
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
              isLoading: false,
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
  };
  handleEditData = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/updateBusiness";

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);
        this.setState({
          isLoading: true,
        });
        if (response.data.response === "true") {
          this.setState({
            showModalSuccess: true,
            disclaimerModal: response.data.message,
            isLoading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalError: true,
          disclaimerModal:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          isLoading: false,
        });
      });

    return rspApi;
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
    this.props.history.go();
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSuccess: false,
    });
    this.props.history.go();
  };

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("tradename");
    sessionStorage.removeItem("logo");
    this.props.history.go(this.props.history.push("/"));
  };

  handleAttach = (e) => {
    let file = e.target.files[0];
    let ext = file.name.split(".").pop();
    // console.log(name);
    // console.log(file);
    // console.log(ext);

    if (ext === "jpg" || ext === "png") {
      const sizeFile = file.size;
      if (sizeFile < 1048576) {
        console.log(sizeFile);
        this.handleUploadLogoBusiness(file);
      } else {
        this.setState({
          showModalError: true,
          disclaimerModal: "La foto debe pesar menos de 1mb",
        });
      }
    } else {
      this.setState({
        showModalError: true,
        disclaimerModal: "El archivo debe ser formato .jpg o .png",
      });
    }
  };

  handleUploadLogoBusiness = async (logo) => {
    let data = new FormData();
    data.append("file", logo);
    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/uploadLogoBusiness";

    const rspApi = axios
      .post(linkEditApi, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);

        if (response.data.response === "true") {
          this.props.history.go();
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({
            showModalError: true,
            unableText: "Su sesión ha expirado. Vuelva a intentarlo.",
            forceRedirect: true,
          });
        } else {
          this.setState({
            showModalError: true,
            disclaimerModal:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            isLoading: false,
          });
        }
      });

    return rspApi;
  };

  render() {
    return (
      <>
        <FullPageLoader isLoading={this.state.isLoading} />
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
        <ModalSucess
          show={this.state.showModalSuccess}
          closeCallback={this.toggleModalSuccess}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalSucess>
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ margin: "30px" }}
        >
          <Link color="inherit" href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Mi Perfil
          </Link>
          <Link
            color="textSecondary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Datos de la empresa
          </Link>
        </Breadcrumbs>

        <div className="header-profile-container">
          <div className="header-profile">
            <img src={this.state.logo} alt="test" />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <label
                id="foto"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Cambiar foto
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  onChange={this.handleAttach}
                  style={{ display: "none" }}
                />
              </label>
              <span>*Max 1mb</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <span>Tamaño recomendado: 300 x 250 pixeles</span>
            </div>
            <div className="title">
              <p>{this.state.name}</p>
            </div>
            <div className="button-container">
              <div>
                <button onClick={this.handleRedirect} className="button_ref">
                  Datos de la empresa
                </button>
              </div>
              <div className="button">
                <button
                  onClick={this.handleRedirectBank}
                  className="button_ref"
                >
                  Datos bancarios
                </button>
              </div>

              <div className="logout">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PowerSettingsNew />}
                  className="btn-logout"
                  onClick={this.handleLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="form">
          <h1>Datos de negocio</h1>
          <Button
            variant="contained"
            color="secondary"
            className="btn-primary"
            startIcon={<Edit />}
            style={{ marginTop: "-14px" }}
            onClick={this.handleEdit}
          >
            Editar datos
          </Button>
          <hr />
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              nombreCompañia: "",
              nombreComercial: "",
              numeroDocumento: "",
              correo: "",
            }}
            validate={(values) => {
              const { numeroDocumento, correo } = values;

              let errors = {};

              if (numeroDocumento.length < 11) {
                errors.numeroDocumento =
                  "El número de documento debe ser de 11 dígitos.";
              }

              if (!EMAIL_REGEXP.test(correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const dataModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
              };

              dataModel.businessName = values.nombreCompañia;
              dataModel.tradeName = values.nombreComercial;
              dataModel.documentNumber = values.numeroDocumento;
              dataModel.email = values.correo;

              (async () => {
                await this.handleEditData(dataModel);
              })();

              // aqui los getter y handler
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
            }) => (
              <form name="formData" onSubmit={handleSubmit}>
                <h2>Datos de la empresa</h2>
                <div className="files">
                  <div className="txt-left">
                    <TextField
                      name="nombreCompañia"
                      className="TxtField"
                      variant="outlined"
                      label="Nombre de la compañía"
                      fullWidth
                      value={values.nombreCompañia}
                      error={errors.nombreCompañia && touched.nombreCompañia}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      required
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                  <div className="txt-right">
                    <TextField
                      name="nombreComercial"
                      className="TxtField"
                      variant="outlined"
                      label="Nombre comercial"
                      fullWidth
                      value={values.nombreComercial}
                      error={errors.nombreComercial && touched.nombreComercial}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      disabled={!this.state.edit}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                </div>
                <div className="files">
                  <div className="txt-left">
                    <TextField
                      name="numeroDocumento"
                      className="TxtField"
                      variant="outlined"
                      label="RUC"
                      fullWidth
                      value={values.numeroDocumento}
                      error={errors.numeroDocumento && touched.numeroDocumento}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      required
                      inputProps={{
                        maxLength: 11,
                      }}
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="numeroDocumento"
                      component="div"
                    />
                  </div>
                  <div className="txt-right">
                    <TextField
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      label="Correo de la empresa"
                      fullWidth
                      value={values.correo}
                      error={errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="correo"
                      component="div"
                    />
                  </div>
                </div>
                {this.state.edit ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      style={{ marginTop: "10px" }}
                    >
                      Guardar datos
                    </Button>
                  </div>
                ) : null}
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default BusinessProfile;

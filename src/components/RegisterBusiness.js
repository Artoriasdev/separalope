import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import Axios from "axios";
import { ErrorMessage, Formik } from "formik";

import { TextField, Button, Modal, Fade, Backdrop } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";

class RegisterBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeDocs: [],
      typeCategorys: [],
      showModalSucesss: false,
      disclaimerModal: "",
      response: false,
    };
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("tk") !== null &&
      sessionStorage.getItem("workflow") === "B"
    ) {
      this.props.history.push("/business/category");
    } else if (
      sessionStorage.getItem("tk") !== null &&
      sessionStorage.getItem("workflow") === "C"
    ) {
      this.props.history.push("/");
    } else {
      try {
        this.handleGetDocuments();
        this.handleGetCategorys();
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleInfoSubmit = async (BusinessModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/registerBusiness";

    const rspApi = Axios.post(linkRegisterApi, BusinessModel, {
      headers: headers,
    }).then((response) => {
      const { data } = response;

      if (data.response === "false") {
        this.setState({
          showModalSucesss: true,
          disclaimerModal: data.message,
        });
      }
      return response;
    });

    return rspApi;
  };

  handleLogin = async (username, password) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/authenticate";

    var LoginModel = {
      username: username,
      password: password,
      workflow: "B",
    };

    const rspApi = Axios.post(linkLoginApi, LoginModel, {
      headers: headers,
    })
      .then((response) => {
        if (response.data.response === "true") {
          sessionStorage.setItem("tk", response.data.data.token);
          sessionStorage.setItem("logged", response.data.response);
          sessionStorage.setItem(
            "info",
            JSON.stringify(response.data.data.listMenu)
          );
          sessionStorage.setItem("workflow", "B");
        }
        console.log(response);
        return response;
      })
      .catch(({ response }) => {
        console.log(response);
      });
    return rspApi;
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/business/category");
    }
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.showModalSucesss}
          closeAfterTransition
          onClose={this.toggleModalSuccess}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.showModalSucesss}>
            <div className="modal-message-container">
              <p>{this.state.disclaimerModal}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.toggleModalSuccess}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>

        <div
          className="page-container"
          style={{ width: "500px", margin: "50px auto" }}
        >
          <h3 className="register__subtitle">Doy un servicio</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              razon: "",
              nombre: "",
              nroDocumento: "",
              correo: "",
              contraseña: "",
              repContraseña: "",
            }}
            validate={(values) => {
              const { nroDocumento, correo } = values;

              let errors = {};

              if (nroDocumento.length < 11) {
                errors.nroDocumento =
                  "*El número de documento debe ser de 11 dígitos.";
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
              const BusinessModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              };

              BusinessModel.businessName = values.razon;
              BusinessModel.tradeName = values.nombre;
              BusinessModel.email = values.correo;
              BusinessModel.mobile = values.celular;
              BusinessModel.documentNumber = values.nroDocumento;
              BusinessModel.password = values.contraseña;
              BusinessModel.confirmPassword = values.repContraseña;
              BusinessModel.idCategory = values.categoria;

              (async () => {
                const responseSubmit = await this.handleInfoSubmit(
                  BusinessModel
                );

                const { response } = responseSubmit.data;

                if (response === "true") {
                  this.setState({
                    showModalSucesss: true,
                    disclaimerModal: "¡Registro grabado satisfactoriamente!",
                    response: true,
                  });
                  this.handleLogin(
                    BusinessModel.email,
                    BusinessModel.confirmPassword
                  );
                }
              })();
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
              <form name="formRegister" onSubmit={handleSubmit}>
                <div className="files">
                  <TextField
                    name="razon"
                    className="TxtField"
                    variant="outlined"
                    label="Razón social"
                    required
                    fullWidth
                    value={values.razon}
                    error={errors.razon && touched.razon}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  <TextField
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    label="Nombre comercial"
                    required
                    fullWidth
                    value={values.nombre}
                    error={errors.nombre && touched.nombre}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <TextField
                    name="nroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="RUC"
                    placeholder="Ingresa tu número de documento"
                    required
                    fullWidth
                    value={values.nroDocumento}
                    error={errors.nroDocumento && touched.nroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    inputProps={{ maxLength: 11 }}
                    autoComplete="off"
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error"
                    name="nroDocumento"
                    component="div"
                  />

                  <TextField
                    name="correo"
                    className="TxtField"
                    variant="outlined"
                    label="Correo electrónico"
                    type="email"
                    required
                    fullWidth
                    value={values.correo}
                    error={errors.correo && touched.correo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error"
                    name="correo"
                    component="div"
                  />
                </div>

                <div className="files">
                  <TextField
                    name="contraseña"
                    type="password"
                    className="TxtField"
                    variant="outlined"
                    label="Contraseña"
                    required
                    fullWidth
                    value={values.contraseña}
                    error={errors.contraseña && touched.contraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <TextField
                    name="repContraseña"
                    type="password"
                    className="TxtField"
                    variant="outlined"
                    label="Repetir contraseña"
                    required
                    fullWidth
                    value={values.repContraseña}
                    error={errors.repContraseña && touched.repContraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  type="submit"
                  fullWidth
                >
                  Regístrar
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default RegisterBusiness;

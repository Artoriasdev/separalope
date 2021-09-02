import Axios from "axios";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import { handleRegexDisable } from "../utils/utilitaries";
import ModalSucess from "./ModalSucess";
import { TextField, MenuItem, Backdrop, Modal, Fade } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../utils/constants";
import { EMAIL_REGEXP } from "../utils/regexp";

class RegisterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDocs: [],
      typeCategorys: [],
      showModalSucesss: false,
      disclaimerModal: "",
      response: "",
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
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleGetDocuments = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getDocumentTypes";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        typeDocs: data,
      });

      return response;
    });
    return rspApi;
  };

  handleInfoSubmit = (CustomerModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/registerCustomer";

    const rspApi = Axios.post(linkRegisterApi, CustomerModel, {
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
      workflow: "C",
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
          sessionStorage.setItem("workflow", "C");
          this.handleGetDataCustomer();
        }
        console.log(response);
        return response;
      })
      .catch(({ response }) => {
        console.log(response);
      });
    return rspApi;
  };

  handleGetDataCustomer = () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/getCustomer";

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          const { data } = response.data;

          sessionStorage.setItem("name", data[0].name);
          sessionStorage.setItem("lastName", data[0].lastName);

          return response;
        })
        .catch((error) => {
          console.log(error);
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      if (localStorage.getItem("reserve") === "true") {
        this.props.history.push(`/reserve/${localStorage.getItem("id")}`);
        localStorage.removeItem("reserve");
        localStorage.removeItem("id");
      } else this.props.history.push("/");
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

        <div className="page-container" style={{ width: "500px" }}>
          <h3 className="register__subtitle">Soy un cliente</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              nombre: "",
              apellido: "",
              correo: "",
              celular: "",
              contraseña: "",
              repContraseña: "",
              documentos: "",
              nroDocumento: "",
            }}
            validate={(values) => {
              const { correo, celular } = values;

              let errors = {};

              if (!EMAIL_REGEXP.test(correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

              if (!celular) {
                errors.numCelular = " ";
              } else if (celular.startsWith("0")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("1")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("2")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("3")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("4")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("5")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("6")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("7")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("8")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.length < 9) {
                errors.celular = "*El número de celular debe tener 9 dígitos.";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const CustomerModel = {
                confirmPassword: "",
                documentNumber: "",
                documentType: "",
                email: "",
                lastName: "",
                mobile: "",
                name: "",
                password: "",
              };

              CustomerModel.name = values.nombre;
              CustomerModel.lastName = values.apellido;
              CustomerModel.email = values.correo;
              CustomerModel.mobile = values.celular;
              CustomerModel.documentType = values.documentos;
              CustomerModel.documentNumber = values.nroDocumento;
              CustomerModel.password = values.contraseña;
              CustomerModel.confirmPassword = values.repContraseña;

              (async () => {
                const responseSubmit = await this.handleInfoSubmit(
                  CustomerModel
                );

                const { response } = responseSubmit.data;

                if (response === "true") {
                  this.setState({
                    showModalSucesss: true,
                    disclaimerModal: "¡Registro grabado satisfactoriamente!",
                    response: true,
                  });
                  this.handleLogin(
                    CustomerModel.email,
                    CustomerModel.confirmPassword
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
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    label="Nombres"
                    required
                    fullWidth
                    value={values.nombre}
                    error={errors.nombre && touched.nombre}
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
                    name="apellido"
                    className="TxtField"
                    variant="outlined"
                    label="Apellidos"
                    required
                    fullWidth
                    value={values.apellido}
                    error={errors.apellido && touched.apellido}
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
                  <Select
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    variant="outlined"
                    value={values.documentos}
                    error={errors.documentos && touched.documentos}
                    name="documentos"
                    displayEmpty
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem disabled value={""}>
                      <span className="empty--option">Tipo de documento</span>
                    </MenuItem>
                    {this.state.typeDocs &&
                      this.state.typeDocs.map(({ id, descriptionLarge }) => (
                        <MenuItem key={id} value={id}>
                          {descriptionLarge}
                        </MenuItem>
                      ))}
                  </Select>

                  <TextField
                    name="nroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="Número de documento"
                    required
                    fullWidth
                    value={values.nroDocumento}
                    error={errors.nroDocumento && touched.nroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    type="number"
                    inputProps={{ min: "0", max: "99999999999" }}
                    autoComplete="off"
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <TextField
                    name="celular"
                    className="TxtField"
                    variant="outlined"
                    label="Número de celular"
                    fullWidth
                    value={values.celular}
                    error={errors.celular && touched.celular}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    inputProps={{
                      maxLength: 9,
                    }}
                    onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error"
                    name="celular"
                    component="div"
                  />

                  <TextField
                    name="correo"
                    className="TxtField"
                    variant="outlined"
                    label="Correo electrónico"
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
                  disabled={isSubmitting}
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

export default RegisterCustomer;

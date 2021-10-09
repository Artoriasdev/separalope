import Axios from "axios";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Component } from "react";

import { handleRegexDisable } from "../utils/utilitaries";

import {
  TextField,
  MenuItem,
  Backdrop,
  Modal,
  Fade,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import { EMAIL_REGEXP } from "../utils/regexp";
import FullPageLoader from "./FullPageLoader";
import { Visibility, VisibilityOff } from "@material-ui/icons";

class RegisterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDocs: [],
      typeCategorys: [],
      showModalSucesss: false,
      disclaimerModal: "",
      response: "",
      isLoading: false,
      show: false,
      show2: false,
      checked: false,
      termsModal: false,
      errorTerms: false,
      terms: [],
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
        this.handleGetTerms();
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

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDocumentTypes`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        const element = data.filter(
          (element) => element.descriptionLarge !== "RUC"
        );

        console.log(element);

        this.setState({
          typeDocs: element,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalSucesss: true,
          disclaimerModal:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "documentos") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("nroDocumento", "", false);
    }
    if (formField === "nroDocumento") {
      const { documentos } = formik.state.values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = this.state.typeDocs.find(
        (arreglo) => arreglo.id === documentos
      );
      if (id === undefined) {
        this.setState({
          showModalSucesss: true,
          disclaimerModal: "Porfavor elija el Tipo de documento",
        });
      } else {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (documentos === "04" || documentos === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue("ingreso", valor, true);
      formik.setFieldValue(formField, value, true);
    }
  };

  handleInfoSubmit = (CustomerModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/registerCustomer`;

    const rspApi = Axios.post(linkRegisterApi, CustomerModel, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response;
        this.setState({
          isLoading: true,
        });

        if (data.response === "false") {
          this.setState({
            showModalSucesss: true,
            disclaimerModal: data.message,
            isLoading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalSucesss: true,
          disclaimerModal:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });

    return rspApi;
  };

  handleLogin = async (username, password) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/authenticate`;

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

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/getCustomer`;

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

  handleGetTerms = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getTemplates/2`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response.data;
        // console.log(data);

        this.setState({
          terms: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalSucesss: true,
          disclaimerModal:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          errorTerms: true,
        });
      });
    return rspApi;
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
      } else {
        setTimeout(() => {
          this.props.history.push("/");
          this.props.history.go();
        }, 500);
      }
    } else if (this.state.errorTerms === true) {
      this.props.history.push("/");
    }
  };

  handleShowPassword = (id) => {
    if (id === 1) {
      this.setState({
        show: !this.state.show,
      });
    } else if (id === 2) {
      this.setState({
        show2: !this.state.show2,
      });
    }
  };

  handleCheck = () => {
    const Formik = this.form;
    if (this.state.checked === true) {
      this.setState({
        checked: false,
      });
      Formik.setFieldValue("checkbox", false, true);
    } else if (this.state.checked === false) {
      this.setState({
        termsModal: true,
      });
    }
  };

  handleTerms = (id) => {
    const Formik = this.form;
    if (id === 1) {
      this.setState({
        checked: true,
        termsModal: false,
      });
      Formik.setFieldValue("checkbox", true, true);
    } else if (id === 2) {
      this.setState({
        termsModal: false,
      });
    }
  };

  handleMayus = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    formik.setFieldValue(formField, value.toUpperCase(), true);
  };

  render() {
    return (
      <>
        <FullPageLoader isLoading={this.state.isLoading} />
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

        <Dialog
          open={this.state.termsModal}
          onClose={() => this.handleTerms(2)}
          scroll="paper"
        >
          {this.state.terms.map(({ id, value }) => (
            <DialogContent key={id}>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </DialogContent>
          ))}
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              className="font-p btn-primary"
              color="primary"
              onClick={() => this.handleTerms(1)}
              variant="contained"
              style={{
                margin: "5px 5px 3px 0",
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              Aceptar
            </Button>
            <Button
              className="font-p btn-primary"
              color="primary"
              onClick={() => this.handleTerms(2)}
              variant="contained"
              style={{
                margin: "5px 0 3px 5px",
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              Rechazar
            </Button>
          </DialogActions>
        </Dialog>

        <div className="page-container">
          <div className="login">
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
                maxLengthValue: 8,
                minLengthValue: 1,
                ingreso: "[0-9]",
                checkbox: false,
              }}
              validate={(values) => {
                const {
                  correo,
                  celular,
                  nroDocumento,
                  maxLengthValue,
                  documentos,
                  minLengthValue,
                  checkbox,
                } = values;

                let errors = {};

                if (!EMAIL_REGEXP.test(correo)) {
                  errors.correo = EMAIL_INVALID;
                } else if (correo.length < E_MINLENGTH) {
                  errors.correo = EMAIL_MINLENGTH;
                }
                if (!nroDocumento) {
                  errors.nroDocumento = "";
                } else if (
                  documentos === "04" &&
                  nroDocumento.length < minLengthValue
                ) {
                  errors.nroDocumento = `*El número de documento debe tener un minimo de ${minLengthValue} dígitos`;
                } else if (
                  documentos === "07" &&
                  nroDocumento.length < minLengthValue
                ) {
                  errors.nroDocumento = `*El número de documento debe tener un minimo de ${minLengthValue} dígitos`;
                } else if (
                  documentos === "01" &&
                  nroDocumento.length < maxLengthValue
                ) {
                  errors.nroDocumento = `*El número de documento debe ser de ${maxLengthValue} dígitos`;
                }

                if (celular.startsWith("0")) {
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
                  errors.celular =
                    "*El número de celular debe tener 9 dígitos.";
                }

                if (checkbox === false) {
                  errors.checkbox =
                    "*Desbes aceptar los términos y condiciones";
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

                console.log(CustomerModel);

                (async () => {
                  const responseSubmit = await this.handleInfoSubmit(
                    CustomerModel
                  );
                  const { response } = responseSubmit.data;
                  if (response === "true") {
                    console.log(response);
                    this.setState({
                      isLoading: false,
                      showModalSucesss: true,
                      disclaimerModal: responseSubmit.data.message,
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
                    <div className="txt-left">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombres"
                        required
                        fullWidth
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={this.handleMayus}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right">
                      <TextField
                        name="apellido"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Apellidos"
                        required
                        fullWidth
                        value={values.apellido}
                        error={errors.apellido && touched.apellido}
                        onBlur={handleBlur}
                        onChange={this.handleMayus}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left">
                      <Select
                        style={{
                          backgroundColor: "white",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.documentos}
                        error={errors.documentos && touched.documentos}
                        name="documentos"
                        displayEmpty
                        required
                        onChange={this.handleDocumentChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">
                            Tipo de documento
                          </span>
                        </MenuItem>
                        {this.state.typeDocs &&
                          this.state.typeDocs.map(
                            ({ id, descriptionLarge }) => (
                              <MenuItem key={id} value={id}>
                                {descriptionLarge}
                              </MenuItem>
                            )
                          )}
                      </Select>
                    </div>

                    <div className="txt-right">
                      <TextField
                        name="nroDocumento"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de documento"
                        required
                        fullWidth
                        value={values.nroDocumento}
                        error={errors.nroDocumento && touched.nroDocumento}
                        onBlur={handleBlur}
                        onChange={this.handleDocumentChange}
                        inputProps={{
                          maxLength: values.maxLengthValue,
                          minLength: values.minLengthValue,
                        }}
                        autoComplete="off"
                        onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="nroDocumento"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left">
                      <TextField
                        name="celular"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de celular"
                        fullWidth
                        value={values.celular}
                        error={errors.celular && touched.celular}
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 9,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="celular"
                        component="div"
                      />
                    </div>
                    <div className="txt-right">
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo electrónico"
                        required
                        fullWidth
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="correo"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left">
                      {/* <TextField
                        name="contraseña"
                        type="password"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Contraseña"
                        required
                        fullWidth
                        value={values.contraseña}
                        error={errors.contraseña && touched.contraseña}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      /> */}
                      <OutlinedInput
                        name="contraseña"
                        fullWidth
                        required
                        autoComplete="off"
                        type={this.state.show ? "text" : "password"}
                        value={values.contraseña}
                        error={errors.contraseña && touched.contraseña}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => this.handleShowPassword(1)}
                              edge="end"
                            >
                              {this.state.show ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        style={{ marginBottom: "5px" }}
                        placeholder="Contraseña"
                      />
                    </div>
                    <div className="txt-right">
                      {/* <TextField
                        name="repContraseña"
                        type="password"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Repetir contraseña"
                        required
                        fullWidth
                        value={values.repContraseña}
                        error={errors.repContraseña && touched.repContraseña}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      /> */}
                      <OutlinedInput
                        name="repContraseña"
                        fullWidth
                        required
                        autoComplete="off"
                        type={this.state.show2 ? "text" : "password"}
                        value={values.repContraseña}
                        error={errors.repContraseña && touched.repContraseña}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => this.handleShowPassword(2)}
                              edge="end"
                            >
                              {this.state.show2 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Repetir contraseña"
                      />
                    </div>
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkbox"
                        checked={this.state.checked}
                        onChange={this.handleCheck}
                        color="primary"
                      />
                    }
                    label="Términos y condiciones"
                  />
                  <ErrorMessage
                    className="error"
                    name="checkbox"
                    component="div"
                  />

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Registrar
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterCustomer;

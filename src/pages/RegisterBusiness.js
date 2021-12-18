import React from "react";
import { Component } from "react";
import Axios from "axios";
import { ErrorMessage, Formik } from "formik";

import {
  TextField,
  Button,
  Modal,
  Fade,
  Backdrop,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Checkbox,
  withStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  MATCH,
  PASSN_MINLENGTH,
  PASS_INVALID,
} from "../utils/constants";
import FullPageLoader from "../components/FullPageLoader";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const styles = (theme) => ({
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
    },
  },
});

class RegisterBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeDocs: [],
      typeCategorys: [],
      showModalSucesss: false,
      disclaimerModal: "",
      response: false,
      isLoading: false,
      show: false,
      show2: false,
      checked: false,
      termsModal: false,
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
      this.handleGetDocuments();
      this.handleGetTerms();
    }
  }

  handleInfoSubmit = async (BusinessModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/business/registerBusiness`;

    const rspApi = Axios.post(linkRegisterApi, BusinessModel, {
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

  handleGetTerms = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getTemplates/3`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          terms: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          errorTerms: true,
        });
      });
    return rspApi;
  };

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
      formik.setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
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
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      this.setState({
        isLoading: true,
      });
      setTimeout(() => {
        this.props.history.push("/business/category");
        this.props.history.go();
        this.setState({
          isLoading: false,
        });
      }, 500);
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

  render() {
    const { classes } = this.props;
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
          className={classes.dialog}
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
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        <div className="page-container">
          <div className="login">
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
                checkbox: false,
                nombres: "",
                apellidos: "",
                documentos: "",
                numDocumento: "",
                maxLengthValue: 8,
                minLengthValue: 8,
              }}
              validate={(values) => {
                const {
                  nroDocumento,
                  correo,
                  checkbox,
                  contraseña,
                  repContraseña,
                  numDocumento,
                  minLengthValue,
                } = values;

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

                if (!numDocumento) {
                  errors.numDocumento = "";
                } else if (numDocumento.length < minLengthValue) {
                  errors.numDocumento = `*El número de documento debe tener un mínimo de ${minLengthValue} dígitos`;
                }

                if (!contraseña) {
                  errors.contraseña = "";
                } else if (
                  !PASSWORD_REGEXP.test(contraseña) ||
                  contraseña.length < PASSN_MINLENGTH
                ) {
                  errors.contraseña = PASS_INVALID;
                }

                if (!repContraseña) {
                  errors.repContraseña = "";
                } else if (
                  !PASSWORD_REGEXP.test(repContraseña) ||
                  repContraseña.length < PASSN_MINLENGTH
                ) {
                  errors.repContraseña = PASS_INVALID;
                } else if (contraseña !== repContraseña) {
                  errors.repContraseña = MATCH;
                }

                if (checkbox === false) {
                  errors.checkbox = "Debes aceptar los términos y condiciones";
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
                  legalRepresentativeName: "",
                  legalRepresentativeLastName: "",
                  legalRepresentativeDocumentType: "",
                  legalRepresentativeDocumentNumber: "",
                };

                BusinessModel.businessName = values.razon;
                BusinessModel.tradeName = values.nombre;
                BusinessModel.email = values.correo;
                BusinessModel.documentNumber = values.nroDocumento;
                BusinessModel.password = values.contraseña;
                BusinessModel.confirmPassword = values.repContraseña;
                BusinessModel.legalRepresentativeName = values.nombres;
                BusinessModel.legalRepresentativeLastName = values.apellidos;
                BusinessModel.legalRepresentativeDocumentType =
                  values.documentos;
                BusinessModel.legalRepresentativeDocumentNumber =
                  values.numDocumento;

                (async () => {
                  const responseSubmit = await this.handleInfoSubmit(
                    BusinessModel
                  );

                  const { response } = responseSubmit.data;

                  if (response === "true") {
                    this.setState({
                      showModalSucesss: true,
                      disclaimerModal: responseSubmit.data.message,
                      response: true,
                      isLoading: false,
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
                    <div className="txt-left-nomid">
                      <TextField
                        name="razon"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Razón social"
                        label="Razón social"
                        required
                        fullWidth
                        value={values.razon}
                        error={errors.razon && touched.razon}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombre comercial"
                        label="Nombre comercial"
                        required
                        fullWidth
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="nroDocumento"
                        className="TxtField"
                        variant="outlined"
                        placeholder="RUC"
                        label="RUC"
                        required
                        fullWidth
                        value={values.nroDocumento}
                        error={errors.nroDocumento && touched.nroDocumento}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: 11 }}
                        autoComplete="off"
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="nroDocumento"
                        component="div"
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo electrónico"
                        label="Correo electrónico"
                        type="email"
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
                    <div className="txt-left-nomid">
                      <FormControl
                        variant="outlined"
                        className="txt-left-nomid"
                        style={{ width: "100%", margin: "0" }}
                      >
                        <InputLabel
                          htmlFor="password"
                          error={errors.contraseña && touched.contraseña}
                        >
                          Contraseña
                        </InputLabel>
                        <OutlinedInput
                          id="password"
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
                          placeholder="Contraseña"
                          label="Contraseña"
                        />
                      </FormControl>
                      <ErrorMessage
                        className="error"
                        name="contraseña"
                        component="div"
                      />
                    </div>
                    <div className="txt-right-nomid">
                      <FormControl
                        variant="outlined"
                        className="txt-left-nomid"
                        style={{ width: "100%", margin: "0" }}
                      >
                        <InputLabel
                          htmlFor="password"
                          error={errors.repContraseña && touched.repContraseña}
                        >
                          Repetir contraseña
                        </InputLabel>
                        <OutlinedInput
                          id="password"
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
                          label="Repetir contraseña"
                        />
                      </FormControl>
                      <ErrorMessage
                        className="error"
                        name="repContraseña"
                        component="div"
                      />
                    </div>
                  </div>
                  <h3>Representante legal</h3>
                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="nombres"
                        type="text"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombres"
                        label="Nombres"
                        required
                        fullWidth
                        value={values.nombres}
                        error={errors.nombres && touched.nombres}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <div className="txt-right-nomid">
                      <TextField
                        name="apellidos"
                        type="text"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Apellidos"
                        label="Apellidos"
                        required
                        fullWidth
                        value={values.apellidos}
                        error={errors.apellidos && touched.apellidos}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>
                  <div className="files">
                    <div className="txt-left-nomid">
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
                    <div className="txt-right-nomid">
                      <TextField
                        name="numDocumento"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de documento"
                        label="Número de documento"
                        required
                        fullWidth
                        value={values.numDocumento}
                        error={errors.numDocumento && touched.numDocumento}
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
                        name="numDocumento"
                        component="div"
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

export default withStyles(styles)(RegisterBusiness);

import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import { Save } from "@material-ui/icons";
import ModalError from "./ModalError";
import ModalSucess from "./ModalSucess";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: [],
      typeDocument: [],
      edit: false,
      showModalError: false,
      disclaimerModal: "",
    };
  }
  handleEdit = () => {
    this.setState({ edit: true });
    console.log(this.state.edit);
  };

  componentDidMount() {
    try {
      this.handleGetDocuments();
      (async () => {
        await this.handleGetData();
      })();
    } catch (error) {
      console.log(error);
    }
  }
  handleGetDocuments = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDocumentTypes`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        this.setState({
          typeDocument: data,
        });

        return response;
      });
    return rspApi;
  };

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/getCustomer`;

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            this.setState({
              typeData: data,
            });
            console.log(response);

            const Formik = this.form;
            Formik.setFieldValue("idCliente", this.state.typeData[0].id);
            Formik.setFieldValue("nombre", this.state.typeData[0].name);
            Formik.setFieldValue("apellido", this.state.typeData[0].lastName);
            Formik.setFieldValue(
              "tipoDocumento",
              this.state.typeData[0].documentType
            );
            Formik.setFieldValue(
              "numeroDocumento",
              this.state.typeData[0].documentNumber
            );
            Formik.setFieldValue("celular", this.state.typeData[0].mobile);
            Formik.setFieldValue("correo", this.state.typeData[0].email);
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
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("lastName");
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
  };

  handleEditData = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/updateCustomer`;

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        if (response.data.response === "true") {
          this.setState({
            showModalSuccess: true,
            disclaimerModal: response.data.message,
          });
          sessionStorage.setItem("name", dataModel.name);
          sessionStorage.setItem("lastName", dataModel.lastName);
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalError: true,
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

    if (formField === "tipoDocumento") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numeroDocumento", "", false);
    }
    if (formField === "numeroDocumento") {
      const { tipoDocumento } = formik.state.values;
      let valor = "[0-9]";
      let maxLengthInput = 8;
      if (tipoDocumento === "01") {
        maxLengthInput = 8;
        valor = "[0-9]";
      }
      if (tipoDocumento === "04" || tipoDocumento === "07") {
        maxLengthInput = 12;
        valor = "";
      }
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("ingreso", valor, true);
      formik.setFieldValue(formField, value, true);
    }
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/C");
    this.props.history.go();
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSuccess: false,
    });

    this.props.history.go();
  };

  //componentDidMount ,handlers
  handleRedirectProfile = () => {
    this.props.history.push("/customer/profile");
  };

  handleRedirectPassword = () => {
    this.props.history.push("/customer/password");
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

        <div className="page-container">
          <div className="login">
            <h1>Mi perfil</h1>
            <hr className="hr" />

            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                idCliente: "",
                nombre: "",
                apellido: "",
                tipoDocumento: "",
                numeroDocumento: "",
                celular: "",
                correo: "",
                maxLengthValue: 8,
                ingreso: "[0-9]",
              }}
              validate={(values) => {
                const { numeroDocumento, celular, correo, maxLengthValue } =
                  values;

                let errors = {};

                if (!EMAIL_REGEXP.test(correo)) {
                  errors.correo = EMAIL_INVALID;
                } else if (correo.length < E_MINLENGTH) {
                  errors.correo = EMAIL_MINLENGTH;
                }
                if (!numeroDocumento) {
                  errors.numeroDocumento = "";
                } else if (numeroDocumento.length < maxLengthValue) {
                  errors.numeroDocumento = `*El número de documento debe ser de ${maxLengthValue} dígitos`;
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
                  errors.celular =
                    "*El número de celular debe tener 9 dígitos.";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const dataModel = {
                  id: "",
                  name: "",
                  lastName: "",
                  documentType: "",
                  documentNumber: "",
                  mobile: "",
                  email: "",
                };

                dataModel.id = values.idCliente;
                dataModel.name = values.nombre;
                dataModel.lastName = values.apellido;
                dataModel.documentType = values.tipoDocumento;
                dataModel.documentNumber = values.numeroDocumento;
                dataModel.mobile = values.celular;
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
                  <div className="files">
                    <div className="txt-left">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombres"
                        fullWidth
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={!this.state.edit}
                        autoComplete="off"
                        required
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right">
                      <TextField
                        name="apellido"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Apellidos"
                        fullWidth
                        value={values.apellido}
                        error={errors.apellido && touched.apellido}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        disabled={!this.state.edit}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>
                  <div className="files">
                    <div className="txt-left">
                      <Select
                        value={values.tipoDocumento}
                        error={errors.tipoDocumento && touched.tipoDocumento}
                        name="tipoDocumento"
                        onChange={this.handleDocumentChange}
                        onBlur={handleBlur}
                        disabled={!this.state.edit}
                        required
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem disabled value={""}>
                          Tipo de documento
                        </MenuItem>
                        {this.state.typeDocument &&
                          this.state.typeDocument.map(
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
                        name="numeroDocumento"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de documento"
                        fullWidth
                        value={values.numeroDocumento}
                        error={
                          errors.numeroDocumento && touched.numeroDocumento
                        }
                        onBlur={handleBlur}
                        onChange={this.handleDocumentChange}
                        disabled={!this.state.edit}
                        autoComplete="off"
                        inputProps={{
                          min: "0",
                          maxLength: values.maxLengthValue,
                        }}
                        required
                        onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="numeroDocumento"
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={!this.state.edit}
                        required
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="celular"
                        component="div"
                      />
                    </div>

                    <div className="txt-right">
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo"
                        fullWidth
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={!this.state.edit}
                        required
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      {errors.correo && (
                        <div className="error">
                          El correo electrónico no es válido.
                        </div>
                      )}
                    </div>
                  </div>
                  {this.state.edit ? (
                    <div className="files">
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="btn-primary button"
                        startIcon={<Save />}
                        disabled={isSubmitting}
                        style={{
                          marginTop: "10px",
                          position: "absolute",
                        }}
                      >
                        Guardar datos
                      </Button>
                    </div>
                  ) : null}
                </form>
              )}
            </Formik>
            <div className="files" style={{ justifyContent: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                className="btn-primary"
                startIcon={<Edit />}
                style={{ float: "right", marginTop: "10px" }}
                onClick={this.handleEdit}
              >
                Editar datos
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ClientProfile;

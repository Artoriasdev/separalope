import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import { PowerSettingsNew, Save } from "@material-ui/icons";
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

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getDocumentTypes";

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

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/getCustomer";

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
  };

  handleEditData = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/updateCustomer";

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
      });

    return rspApi;
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/C");
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

        <div
          className="page-container"
          style={{
            width: "40%",
          }}
        >
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
            }}
            validate={(values) => {
              const {
                idCliente,
                nombre,
                apellido,
                tipoDocumento,
                numeroDocumento,
                celular,
                correo,
              } = values;

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
                  <TextField
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    label="Nombres"
                    fullWidth
                    value={values.nombre}
                    error={errors.nombre && touched.nombre}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    autoComplete="off"
                    required
                    style={{
                      marginTop: "30px",
                      marginRight: "5px",
                      marginBottom: "15px",
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
                    fullWidth
                    value={values.apellido}
                    error={errors.apellido && touched.apellido}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    style={{
                      marginTop: "30px",
                      marginLeft: "5px",
                      marginBottom: "15px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    disabled={!this.state.edit}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="files">
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{
                      marginRight: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel id="typeDocument">Tipo de documento</InputLabel>
                    <Select
                      labelId="typeDocument"
                      label="Tipo de documento"
                      value={values.tipoDocumento}
                      error={errors.tipoDocumento && touched.tipoDocumento}
                      name="tipoDocumento"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!this.state.edit}
                      required
                    >
                      {this.state.typeDocument &&
                        this.state.typeDocument.map(
                          ({ id, descriptionLarge }) => (
                            <MenuItem key={id} value={id}>
                              {descriptionLarge}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>

                  <TextField
                    name="numeroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="Número de documento"
                    fullWidth
                    value={values.numeroDocumento}
                    error={errors.numeroDocumento && touched.numeroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    autoComplete="off"
                    type="number"
                    inputProps={{ min: "0" }}
                    required
                    style={{
                      marginLeft: "5px",
                      marginBottom: "10px",
                    }}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    required
                    style={{
                      marginRight: "5px",
                      marginBottom: "10px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
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
                    label="Correo"
                    fullWidth
                    value={values.correo}
                    error={errors.correo && touched.correo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    type="email"
                    required
                    style={{
                      marginLeft: "5px",
                      marginBottom: "10px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  {errors.correo && (
                    <div className="error">
                      El correo electrónico no es válido.
                    </div>
                  )}
                </div>
                {this.state.edit ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
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
      </>
    );
  }
}

export default ClientProfile;

import React from "react";
import { Component } from "react";
import { Formik } from "formik";
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
                "Sesion expirada, porfavor vuelva a iniciar sesion",
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

  handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    this.props.history.go(this.props.history.push("/"));
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
          style={{
            margin: "10vh 0",
          }}
        >
          <div
            className="text_form"
            style={{
              width: "60%",
              margin: "auto",
            }}
          >
            <h1
              style={{
                color: "#5829dd",
              }}
            >
              Mi perfil
            </h1>
            <hr style={{ width: "99%", margin: "0 auto", padding: "0" }} />

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
              validate={{}}
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
                      <InputLabel id="typeDocument">
                        Tipo de documento
                      </InputLabel>
                      <Select
                        labelId="typeDocument"
                        label="Tipo de documento"
                        value={values.tipoDocumento}
                        error={errors.tipoDocumento && touched.tipoDocumento}
                        name="tipoDocumento"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!this.state.edit}
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
                      label="Numero de documento"
                      fullWidth
                      value={values.numeroDocumento}
                      error={errors.numeroDocumento && touched.numeroDocumento}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
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
                      label="Numero de celular"
                      fullWidth
                      value={values.celular}
                      error={errors.celular && touched.celular}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      style={{
                        marginRight: "5px",
                        marginBottom: "10px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
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
                  {this.state.edit ? (
                    <div className="files">
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="btn-primary"
                        startIcon={<Save />}
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
        </div>
      </>
    );
  }
}

export default ClientProfile;

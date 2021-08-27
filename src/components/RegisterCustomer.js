import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import { handleRegexDisable } from "../utils/utilitaries";
import ModalSucess from "./ModalSucess";
import { TextField, MenuItem, Backdrop, Modal, Fade } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";

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
    try {
      this.handleGetDocuments();
    } catch (e) {
      console.log(e);
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

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/login/C");
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
            validate={{}}
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
                    required
                    fullWidth
                    value={values.celular}
                    error={errors.celular && touched.celular}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    required
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
                    type="email"
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
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

export default RegisterCustomer;

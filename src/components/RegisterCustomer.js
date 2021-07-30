import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import { handleRegexDisable } from "../utils/utilitaries";
import ModalSucess from "./ModalSucess";
import { TextField, MenuItem } from "@material-ui/core";
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
  };

  handleInfoSubmit = (CustomerModel) => {
    console.log("entra");
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
      return response;
    });

    return rspApi;
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    this.props.history.push("/login/C");
  };

  render() {
    return (
      <>
        <ModalSucess
          show={this.state.showModalSucesss}
          closeCallback={this.toggleModalSuccess}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalSucess>
        <button
          className="arrow__button"
          onClick={() => this.props.history.goBack()}
        >
          <figure>
            <ArrowCircleSVG />
          </figure>
        </button>

        <div className="auth__main">
          <div className="auth__box-container">
            <h3 className="register__subtitle">Soy un usuario</h3>
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
                  {/* <input
                    type="text"
                    placeholder="Nombres"
                    name="nombre"
                    className="register__input"
                    autoComplete="off"
                    value={values.nombre}
                    onChange={handleChange}
                  /> */}

                  <div className="files">
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
                      placeholder="Apellidos"
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

                    {/* <input
                        type="text"
                        placeholder="Apellidos"
                        name="apellido"
                        className="register__input"
                        value={values.apellido}
                        onChange={handleChange}
                      /> */}
                  </div>

                  <div className="files">
                    {/* <select
                    name="documentos"
                    className="dropdown"
                    value={values.documentos}
                    onChange={handleChange}
                  >
                    <option value="0">Elegir</option>
                    {this.state.typeDocs &&
                      this.state.typeDocs.map(({ id, descriptionLarge }) => (
                        <option key={id} value={id}>
                          {descriptionLarge}
                        </option>
                      ))}
                  </select> */}

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

                    {/* <input
                    type="text"
                    placeholder="Número documento"
                    name="nroDocumento"
                    className="register__input"
                    value={values.nroDocumento}
                    onChange={handleChange}
                  /> */}

                    <TextField
                      name="nroDocumento"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Número de documento"
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
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>

                  <div className="files">
                    {/* <input
                    type="text"
                    placeholder="Celular"
                    name="celular"
                    className="register__input"
                    autoComplete="off"
                    value={values.celular}
                    onChange={handleChange}
                    /> */}

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

                    {/* <input
                    type="text"
                    placeholder="Correo electronico"
                    name="correo"
                    className="register__input"
                    value={values.correo}
                    onChange={handleChange}
                    /> */}

                    <TextField
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Correo electrónico"
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
                  </div>

                  <div className="files">
                    {/* <input
                    type="password"
                    placeholder="Contraseña"
                    name="contraseña"
                    className="register__input"
                    autoComplete="off"
                    value={values.contraseña}
                    onChange={handleChange}
                  /> */}

                    <TextField
                      name="contraseña"
                      type="password"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Contraseña"
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

                    {/* <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repContraseña"
                    className="register__input"
                    value={values.repContraseña}
                    onChange={handleChange}
                  /> */}
                    <TextField
                      name="repContraseña"
                      type="password"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Repetir contraseña"
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
                    style={{
                      margin: "10px 0",
                    }}
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

export default RegisterCustomer;

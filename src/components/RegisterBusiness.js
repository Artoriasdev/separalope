import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import Axios from "axios";
import { Formik } from "formik";
import ModalSucess from "./ModalSucess";
import { TextField, MenuItem, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { handleRegexDisable } from "../utils/utilitaries";

class RegisterBusiness extends Component {
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
      this.handleGetCategorys();
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

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        typeCategorys: data,
      });

      return response;
    });
  };

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
      console.log(response);
      return response;
    });

    return rspApi;
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    this.props.history.push("/login/B");
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

        <div style={{ padding: "20px", width: "500px", margin: "50px auto" }}>
          <h3 className="register__subtitle">Doy un servicio</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              razon: "",
              nombre: "",
              correo: "",
              celular: "",
              contraseña: "",
              repContraseña: "",
              documentos: "",
              nroDocumento: "",
              categoria: "",
            }}
            validate={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const BusinessModel = {
                confirmPassword: "",
                documentNumber: "",
                email: "",
                id: 0,
                tradeName: "",
                mobile: "",
                businessName: "",
                password: "",
                idCategory: "",
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
                  {/* <input
                    type="text"
                    placeholder="Razon social"
                    name="razon"
                    className="register__input"
                    autoComplete="off"
                    value={values.razon}
                    onChange={handleChange}
                  /> */}
                  <TextField
                    name="razon"
                    className="TxtField"
                    variant="outlined"
                    placeholder="Razón social"
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

                  {/* <input
                    type="text"
                    placeholder="Nombre comercial"
                    name="nombre"
                    className="register__input"
                    value={values.nombre}
                    onChange={handleChange}
                  /> */}

                  <TextField
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    placeholder="Nombre comercial"
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
                    placeholder="Correo electrónico"
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
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  {/* <select
                      name="categoria"
                      className="dropdown"
                      value={values.categoria}
                      onChange={handleChange}
                    >
                      <option value="0">Elegir</option>
                      {this.state.typeCategorys &&
                        this.state.typeCategorys.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                    </select> */}

                  <Select
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    variant="outlined"
                    value={values.categoria}
                    error={errors.categoria && touched.categoria}
                    name="categoria"
                    displayEmpty
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem disabled value={""}>
                      <span className="empty--option">Categoria</span>
                    </MenuItem>
                    {this.state.typeCategorys &&
                      this.state.typeCategorys.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
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
      </>
    );
  }
}

export default RegisterBusiness;

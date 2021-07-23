import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";

class RegisterClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDocs: [],
      typeCategorys: [],
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

  render() {
    return (
      <>
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

                this.handleInfoSubmit(CustomerModel);
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
                  <input
                    type="text"
                    placeholder="Nombres"
                    name="nombre"
                    className="register__input"
                    autoComplete="off"
                    value={values.nombre}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Apellidos"
                    name="apellido"
                    className="register__input"
                    value={values.apellido}
                    onChange={handleChange}
                  />

                  <select
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
                  </select>

                  <input
                    type="text"
                    placeholder="Número documento"
                    name="nroDocumento"
                    className="register__input"
                    value={values.nroDocumento}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Celular"
                    name="celular"
                    className="register__input"
                    autoComplete="off"
                    value={values.celular}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Correo electronico"
                    name="correo"
                    className="register__input"
                    value={values.correo}
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="contraseña"
                    className="register__input"
                    autoComplete="off"
                    value={values.contraseña}
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repContraseña"
                    className="register__input"
                    value={values.repContraseña}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    Registrar
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterClient;

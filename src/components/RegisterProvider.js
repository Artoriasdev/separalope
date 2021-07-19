import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import Axios from "axios";
import { Formik } from "formik";

class RegisterProvider extends Component {
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

  handleInfoSubmit = (ProviderModel) => {
    console.log("entra");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    //cambiar link de api
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/registerCustomer";

    const rspApi = Axios.post(linkRegisterApi, ProviderModel, {
      headers: headers,
    }).then((response) => {
      console.log(response);
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
                const ProviderModel = {
                  confirmPassword: "",
                  documentNumber: "",
                  documentType: "",
                  email: "",
                  id: 0,
                  name: "",
                  mobile: "",
                  businessName: "",
                  password: "",
                  category: "",
                };

                ProviderModel.businessName = values.razon;
                ProviderModel.name = values.nombre;
                ProviderModel.email = values.correo;
                ProviderModel.mobile = values.celular;
                ProviderModel.documentType = values.documentos;
                ProviderModel.documentNumber = values.nroDocumento;
                ProviderModel.password = values.contraseña;
                ProviderModel.confirmPassword = values.repContraseña;
                ProviderModel.category = values.categoria;

                // this.handleInfoSubmit(ProviderModel);
                // console.log(values);
                // console.log(ProviderModel);
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
                    placeholder="Razon social"
                    name="razon"
                    className="register__input"
                    autoComplete="off"
                    value={values.razon}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Nombre comercial"
                    name="nombre"
                    className="register__input"
                    value={values.nombre}
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
                    placeholder="Correo electrónico"
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

                  <select
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
                  </select>

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

export default RegisterProvider;

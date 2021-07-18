import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import "../sass/register.scss";

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
      // console.log(response);

      const { data } = response.data;
      //   console.log(data);

      this.setState({
        typeDocs: data,
      });

      return response;
    });
  };

  handleInfoSubmit = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/registerCustomer";

    const rspApi = Axios.post(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      console.log(response);
      return response;
    });
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
            <Formik onSubmit={this.handleInfoSubmit()}>
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
                  />

                  <input
                    type="text"
                    placeholder="Apellidos"
                    name="apellido"
                    className="register__input"
                  />

                  <select name="documentos" className="dropdown">
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
                  />

                  <input
                    type="text"
                    placeholder="Celular"
                    name="celular"
                    className="register__input"
                    autoComplete="off"
                  />

                  <input
                    type="text"
                    placeholder="Correo electronico"
                    name="correo"
                    className="register__input"
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="contraseña"
                    className="register__input"
                    autoComplete="off"
                  />

                  <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="contraseña"
                    className="register__input"
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

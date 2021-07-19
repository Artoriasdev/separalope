import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import "../sass/login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = (LoginModel) => {
    console.log("entra");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    //cambiar link de api
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/registerCustomer";

    const rspApi = Axios.post(linkLoginApi, LoginModel, {
      headers: headers,
    }).then((response) => {
      console.log(response);
      return response;
    });

    return rspApi;
  };
  render() {
    return (
      <div>
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
            <h1>Inicia sesión</h1>

            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                correo: "",
                contraseña: "",
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const LoginModel = {
                  email: "",
                  password: "",
                };

                LoginModel.email = values.correo;
                LoginModel.password = values.contraseña;

                // this.handleLogin(LoginModel)
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
                <form name="formLogin" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Email"
                    name="correo"
                    className="auth__input"
                    autoComplete="off"
                    value={values.correo}
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    name="contraseña"
                    className="auth__input"
                    value={values.contraseña}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    Iniciar sesión
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

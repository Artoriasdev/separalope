import { Button } from "@material-ui/core";
import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";

class Login extends Component {
  handleLogin = async (LoginModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/authenticate";

    const rspApi = Axios.post(linkLoginApi, LoginModel, {
      headers: headers,
    })
      .then((response) => {
        if (response.data.response === "true") {
          if (LoginModel.workflow === "B") {
            this.props.history.push("/business/category");
          }

          if (LoginModel.workflow === "C") {
            this.props.history.push("/");
          }
        }
        return response;
      })
      .catch(({ response }) => {
        console.log(response.data.message);
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
            <h1 className="login_tittle">Inicia sesión</h1>

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
                  username: "",
                  password: "",
                  workflow: "",
                };

                LoginModel.username = values.correo;
                LoginModel.password = values.contraseña;
                LoginModel.workflow = this.props.match.params.value;

                (async () => {
                  await this.handleLogin(LoginModel);
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
                    Iniciar sesion
                  </Button>
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

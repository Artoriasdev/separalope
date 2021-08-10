import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

import { Save, Visibility } from "@material-ui/icons";
import ModalError from "./ModalError";

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],

      viewPassword: false,
    };
  }

  handleViewPassword = () => {
    this.setState({ viewPassword: true });
  };
  handleHidePassword = () => {
    this.setState({ viewPassword: false });
  };

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");

    this.props.history.push("/");
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
  };

  render() {
    return (
      <div style={{ margin: "40px 0", padding: 0 }}>
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

        <div style={{ width: "50%", margin: "auto" }}>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              contraseña: "",
              cambiarContraseña: "",
              repetirContraseña: "",
            }}
            validate={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const dataModel = {
                password: "",
                confirmPassword: "",
              };

              dataModel.password = values.contraseña;
              dataModel.confirmPassword = values.repetirContraseña;

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
              <form name="formPassword">
                <h2
                  style={{
                    marginTop: "15%",
                    marginBottom: "30px",
                    textAlign: "center",
                  }}
                >
                  Cambio de contraseña
                </h2>

                {this.state.viewPassword ? (
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    color="primary"
                    className="btn-primary"
                    style={{ marginBottom: "10px" }}
                    onClick={this.handleHidePassword}
                  >
                    Ocultar contraseñas
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    color="primary"
                    className="btn-primary"
                    style={{ marginBottom: "10px" }}
                    onClick={this.handleViewPassword}
                  >
                    Ver contraseñas
                  </Button>
                )}

                <div className="files">
                  <TextField
                    name="contraseña"
                    className="TxtField"
                    variant="outlined"
                    label="Contraseña actual"
                    value={values.contraseña}
                    error={errors.contraseña && touched.contraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={this.state.viewPassword ? "text" : "password"}
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "49.4444444%",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="files">
                  <TextField
                    name="cambiarContraseña"
                    className="TxtField"
                    variant="outlined"
                    label="Ingresa tu nueva contraseña"
                    fullWidth
                    value={values.cambiarContraseña}
                    error={
                      errors.cambiarContraseña && touched.cambiarContraseña
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={this.state.viewPassword ? "text" : "password"}
                    style={{
                      marginTop: "10px",
                      marginRight: "5px",
                      marginBottom: "15px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <TextField
                    name="repetirContraseña"
                    className="TxtField"
                    variant="outlined"
                    label="Repite tu nueva contraseña"
                    value={values.repetirContraseña}
                    fullWidth
                    error={
                      errors.repetirContraseña && touched.repetirContraseña
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={this.state.viewPassword ? "text" : "password"}
                    style={{
                      marginTop: "10px",

                      marginLeft: "5px",
                      marginBottom: "20px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="btn-primary"
                    startIcon={<Save />}
                    style={{ margin: "10px" }}
                    fullWidth
                  >
                    Cambiar contraseña
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default Password;

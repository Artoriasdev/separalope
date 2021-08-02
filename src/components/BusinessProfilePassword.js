import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import { PowerSettingsNew, Save, Visibility } from "@material-ui/icons";
import ModalError from "./ModalError";

class BusinessProfilePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      editButton: false,
      viewPassword: false,
    };
  }

  handleViewPassword = () => {
    this.setState({ viewPassword: true });
  };
  handleHidePassword = () => {
    this.setState({ viewPassword: false });
  };

  handleEdit = () => {
    this.setState({ editButton: true });
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
    sessionStorage.setItem("tk", "");

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
        <div style={{ marginTop: "50px", marginLeft: "50px" }}>
          <div
            className="header_container"
            style={{
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
              alt="test"
              style={{
                borderRadius: "50%",
                maxWidth: "150px",
              }}
            />
            <div
              style={{
                marginTop: "20px",
                fontSize: "20px",
                fontFamily: "MavenPro-Regular",
                fontWeight: "bold",
              }}
            >
              <p>Rosanaa Maria del Gracia</p>{" "}
              {/* cambiar por el nombre obtenido del back */}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{}}>
                <button
                  onClick={this.handleRedirect}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Datos de la empresa
                </button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={this.handleRedirectBank}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Datos bancarios
                </button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={this.handleRedirectPassword}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Contraseña
                </button>
              </div>
              <div style={{ marginTop: "100px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PowerSettingsNew />}
                  style={{ width: "150px", margin: "0", padding: "5px 0" }}
                  onClick={this.handleLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>

          <div
            className="text_form"
            style={{
              marginTop: "-550px",
              marginLeft: "50vh",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <h1 style={{ display: "inline-block", marginRight: "20px" }}>
              Datos de negocio
            </h1>
            <Button
              variant="contained"
              color="secondary"
              className="btn-primary"
              startIcon={<Edit />}
              style={{ marginTop: "-14px" }}
              onClick={this.handleEdit}
            >
              Editar datos
            </Button>
            <hr style={{ maxWidth: "80%", margin: "0", padding: "0" }} />
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
                <form name="formPassword" style={{ marginTop: "10px" }}>
                  <h2
                    style={{
                      marginTop: "17.43px",
                      marginRight: "20px",
                      display: "inline-block",
                    }}
                  >
                    Contraseñas
                  </h2>

                  {this.state.viewPassword && this.state.editButton ? (
                    <Button
                      variant="contained"
                      startIcon={<Visibility />}
                      color="primary"
                      className="btn-primary"
                      style={{ marginTop: "-14px" }}
                      onClick={this.handleHidePassword}
                      disabled={!this.state.editButton}
                    >
                      Ocultar contraseña
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Visibility />}
                      color="primary"
                      className="btn-primary"
                      style={{ marginTop: "-14px" }}
                      onClick={this.handleViewPassword}
                      disabled={!this.state.editButton}
                    >
                      Ver contraseñas
                    </Button>
                  )}

                  <div className="row">
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
                      disabled={!this.state.editButton}
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
                  <div className="row">
                    <TextField
                      name="cambiarContraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Cambio de contraseña"
                      fullWidth
                      value={values.cambiarContraseña}
                      error={
                        errors.cambiarContraseña && touched.cambiarContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={this.state.viewPassword ? "text" : "password"}
                      disabled={!this.state.editButton}
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
                      label="Repetir la contraseña"
                      value={values.repetirContraseña}
                      fullWidth
                      error={
                        errors.repetirContraseña && touched.repetirContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={this.state.viewPassword ? "text" : "password"}
                      disabled={!this.state.editButton}
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
                  {this.state.editButton ? (
                    <div className="row">
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="btn-primary"
                        startIcon={<Save />}
                        style={{ marginTop: "10px" }}
                      >
                        Guardar contraseña
                      </Button>
                    </div>
                  ) : null}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default BusinessProfilePassword;

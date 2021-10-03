import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

import { Save, Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      disclaimerModal: "",
      viewPassword: false,
      showModalError: false,
      showModalSuccess: false,
      response: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("tk") === null) {
      this.props.history.push("/");
    }
  }

  handleChangePassword = (passwordModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/user/passwordChange`;

    const rspApi = axios
      .post(linkEditApi, passwordModel, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.response === "true") {
          this.setState({
            showModalSucesss: true,
            disclaimerModal: response.data.message,
            response: true,
          });
        } else if (response.data.response === "false") {
          this.setState({
            showModalSucesss: true,
            disclaimerModal: response.data.message,
          });
        }
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 401) {
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("lastName");
          this.setState({
            showModalSucesss: true,
            disclaimerModal: "Sesión expirada, porfavor vuelva a inciar sesión",
            response: true,
          });
        } else {
          this.setState({
            showModalSuccess: true,
            disclaimerModal:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          });
        }
      });

    return rspApi;
  };

  handleViewPassword = () => {
    this.setState({ viewPassword: true });
  };
  handleHidePassword = () => {
    this.setState({ viewPassword: false });
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/");
      this.props.history.go();
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

        <div className="page-container">
          <div className="login">
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
                  currentPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                };

                dataModel.currentPassword = values.contraseña;
                dataModel.newPassword = values.cambiarContraseña;
                dataModel.confirmNewPassword = values.repetirContraseña;

                // aqui los getter y handler

                (async () => {
                  await this.handleChangePassword(dataModel);
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
                <form name="formPassword" onSubmit={handleSubmit}>
                  <h1
                    style={{
                      marginTop: "5%",
                      marginBottom: "30px",
                      textAlign: "center",
                    }}
                  >
                    Cambio de contraseña
                  </h1>

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
                      startIcon={<VisibilityOff />}
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
                      required
                      fullWidth
                      type={this.state.viewPassword ? "text" : "password"}
                      style={{
                        backgroundColor: "white",
                        marginRight: "51%",
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
                    <div className="txt-left">
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
                        required
                        type={this.state.viewPassword ? "text" : "password"}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right">
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
                        required
                        type={this.state.viewPassword ? "text" : "password"}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>

                  <div className="files">
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      style={{ margin: "10px auto" }}
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
      </>
    );
  }
}

export default Password;

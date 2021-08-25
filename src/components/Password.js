import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

import { Save, Visibility, VisibilityOff } from "@material-ui/icons";
import ModalError from "./ModalError";
import ModalSucess from "./ModalSucess";
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

  handleChangePassword = (passwordModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/passwordChange";

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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Fade in={this.state.showModalSucesss}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "5",
                padding: "20px",
              }}
            >
              <p>{this.state.disclaimerModal}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                style={{
                  margin: "10px 0",
                  width: "80%",
                  textTransform: "capitalize",
                }}
                onClick={this.toggleModalSuccess}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
        <div style={{ margin: "40px 0", padding: 0 }}>
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
                      startIcon={<VisibilityOff />}
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
                      required
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
                      required
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
                      required
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
                      style={{ margin: "10px auto", width: "60%" }}
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

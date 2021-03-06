import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

import { Save, Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { PASSWORD_REGEXP } from "../utils/regexp";
import { MATCH, PASSN_MINLENGTH, PASS_INVALID } from "../utils/constants";

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
            disclaimerModal: "Sesi??n expirada, porfavor vuelva a inciar sesi??n",
            response: true,
          });
        } else {
          this.setState({
            showModalSuccess: true,
            disclaimerModal:
              "Ha ocurrido un error, porfavor refresque la p??gina o intentelo m??s tarde",
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
                contrase??a: "",
                cambiarContrase??a: "",
                repetirContrase??a: "",
              }}
              validate={(values) => {
                const { cambiarContrase??a, repetirContrase??a } = values;
                let errors = {};

                if (!cambiarContrase??a) {
                  errors.cambiarContrase??a = "";
                } else if (
                  cambiarContrase??a.length < PASSN_MINLENGTH ||
                  !PASSWORD_REGEXP.test(cambiarContrase??a)
                ) {
                  errors.cambiarContrase??a = PASS_INVALID;
                }

                if (!repetirContrase??a) {
                  errors.repetirContrase??a = "";
                } else if (
                  !PASSWORD_REGEXP.test(repetirContrase??a) ||
                  repetirContrase??a.length < PASSN_MINLENGTH
                ) {
                  errors.repetirContrase??a = PASS_INVALID;
                } else if (cambiarContrase??a !== repetirContrase??a) {
                  errors.repetirContrase??a = MATCH;
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const dataModel = {
                  currentPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                };

                dataModel.currentPassword = values.contrase??a;
                dataModel.newPassword = values.cambiarContrase??a;
                dataModel.confirmNewPassword = values.repetirContrase??a;

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
                    Cambio de contrase??a
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
                      Ocultar contrase??as
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
                      Ver contrase??as
                    </Button>
                  )}

                  <div className="files">
                    <TextField
                      name="contrase??a"
                      className="TxtField"
                      variant="outlined"
                      label="Contrase??a actual"
                      value={values.contrase??a}
                      error={errors.contrase??a && touched.contrase??a}
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
                    <ErrorMessage
                      className="error"
                      name="contrase??a"
                      component="div"
                    />
                  </div>

                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="cambiarContrase??a"
                        className="TxtField"
                        variant="outlined"
                        label="Ingresa tu nueva contrase??a"
                        fullWidth
                        value={values.cambiarContrase??a}
                        error={
                          errors.cambiarContrase??a && touched.cambiarContrase??a
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type={this.state.viewPassword ? "text" : "password"}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="cambiarContrase??a"
                        component="div"
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <TextField
                        name="repetirContrase??a"
                        className="TxtField"
                        variant="outlined"
                        label="Repite tu nueva contrase??a"
                        value={values.repetirContrase??a}
                        fullWidth
                        error={
                          errors.repetirContrase??a && touched.repetirContrase??a
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type={this.state.viewPassword ? "text" : "password"}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="repetirContrase??a"
                        component="div"
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
                      Cambiar contrase??a
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

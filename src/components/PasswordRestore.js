import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";

class PasswordRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      response: false,
      message: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("tk") === null) {
      try {
        const Formik = this.form;
        Formik.setFieldValue("correo", localStorage.getItem("correo"));
      } catch (e) {
        console.log(e);
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleRecovery = async (RecoveryModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/passwordRestore`;

    const rspApi = axios
      .post(linkLoginApi, RecoveryModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;

        if (data.response === "true") {
          this.setState({
            modal: true,
            message: data.message,
            response: true,
          });
        } else if (data.response === "false") {
          this.setState({
            modal: true,
            message: data.message,
          });
        }
        return response;
      })
      .catch(({ response }) => {
        console.log(response.data.message);
      });
    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.push(`/login/${this.props.match.params.value}`);
      localStorage.removeItem("correo");
    }
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.modal}>
            <div className="modal-message-container">
              <p>{this.state.message}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.handleClose}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
        <div
          className="page-container"
          style={{ width: "30%", margin: "11%  auto", padding: "0" }}
        >
          {this.props.match.params.value === "C" ? (
            <h3 className="register__subtitle">Soy un cliente</h3>
          ) : (
            <h3 className="register__subtitle">Doy un servicio</h3>
          )}
          <h1>Restaurar contraseña</h1>
          <div style={{ textAlign: "center" }}>
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                correo: "",
                contraseña: "",
                repetirContraseña: "",
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                  newPassword: "",
                  confirmNewPassword: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.newPassword = values.contraseña;
                RecoveryModel.confirmNewPassword = values.repetirContraseña;
                RecoveryModel.workflow = this.props.match.params.value;

                (async () => {
                  await this.handleRecovery(RecoveryModel);
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
                  <div className="files">
                    <TextField
                      type="email"
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      label="Correo electronico"
                      value={values.correo}
                      required
                      error={errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "49.4444444%",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                    />
                  </div>
                  <div className="files">
                    <TextField
                      name="contraseña"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Ingresa tu nueva contraseña"
                      required
                      fullWidth
                      value={values.contraseña}
                      error={errors.contraseña && touched.contraseña}
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
                    />
                    <TextField
                      name="repetirContraseña"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Repite tu nueva contraseña"
                      value={values.repetirContraseña}
                      required
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
                    />
                  </div>

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    style={{
                      width: "80%",
                      margin: "10px auto",
                    }}
                    type="submit"
                  >
                    Enviar
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default PasswordRestore;

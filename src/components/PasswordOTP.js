import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";

class PasswordOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      response: false,
      message: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("tk") !== null) {
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
    let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/validatePasswordRecovery`;

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
      this.props.history.push(
        `/password-restore/${this.props.match.params.value}`
      );
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
          <h1>Olvidaste tu contraseña</h1>
          <div style={{ textAlign: "center" }}>
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                correo: "",
                otp: "",
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                  otp: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.otp = values.otp;
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
                      label="Ingrese su correo electrónico"
                      value={values.correo}
                      required
                      error={errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      style={{
                        marginBottom: "10px",
                        marginRight: "5px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                    />
                    <TextField
                      name="otp"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Ingrese su código"
                      value={values.otp}
                      error={errors.otp && touched.otp}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      fullWidth
                      style={{
                        marginBottom: "10px",
                        marginLeft: "5px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                    />
                  </div>
                  <div className="files"></div>

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

export default PasswordOTP;

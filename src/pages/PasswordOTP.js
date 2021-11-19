import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
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
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
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
          style={{ margin: "11%  auto", padding: "0" }}
        >
          <div className="login">
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
                validate={(values) => {
                  const { otp } = values;
                  let errors = {};

                  if (!otp) {
                    errors.otp = "";
                  } else if (otp.length < 5) {
                    errors.otp = "*El código debe ser mayor a 5 dígitos";
                  }

                  return errors;
                }}
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
                      <div className="txt-left-nomid">
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

                          // inputProps={{
                          //   maxLength: 9,
                          // }}
                        />
                      </div>
                      <div className="txt-right-nomid">
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
                          inputProps={{
                            maxLength: 5,
                          }}
                        />
                        <ErrorMessage
                          className="error"
                          name="otp"
                          component="div"
                        />
                      </div>
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
        </div>
      </>
    );
  }
}

export default PasswordOTP;

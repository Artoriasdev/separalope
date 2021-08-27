import { Button, Modal, TextField, Fade, Backdrop } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      response: false,
      message: "",
    };
  }

  handleRecovery = async (RecoveryModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/generatePasswordRecovery";

    const rspApi = axios
      .post(linkLoginApi, RecoveryModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;

        if (data.response === "true") {
          this.setState({
            modal: true,
            response: true,
            message: data.message,
          });
        }
        if (data.response === "false") {
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
        `/password-recovery-otp/${this.props.match.params.value}`
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
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.workflow = this.props.match.params.value;

                (async () => {
                  const responseSubmit = await this.handleRecovery(
                    RecoveryModel
                  );

                  const { response } = responseSubmit.data;

                  if (response === "true") {
                    localStorage.setItem("correo", RecoveryModel.email);
                  }
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
                      label="Ingrese su correo electronico"
                      required
                      value={values.correo}
                      error={errors.correo && touched.correo}
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      style={{
                        marginBottom: "10px",
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
                      textTransform: "capitalize",
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

export default PasswordRecovery;

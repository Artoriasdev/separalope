import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import React, { Component } from "react";
import { MATCH, PASSN_MINLENGTH, PASS_INVALID } from "../utils/constants";
import { PASSWORD_REGEXP } from "../utils/regexp";

class PasswordRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      response: false,
      message: "",
      show: false,
      show2: false,
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
      this.props.history.push(`/login/${this.props.match.params.value}`);
      localStorage.removeItem("correo");
    }
  };

  handleShowPassword = (id) => {
    if (id === 1) {
      this.setState({
        show: !this.state.show,
      });
    } else if (id === 2) {
      this.setState({
        show2: !this.state.show2,
      });
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
            <h1>Restaurar contraseña</h1>
            <div style={{ textAlign: "center" }}>
              <Formik
                ref={(ref) => (this.form = ref)}
                initialValues={{
                  correo: "",
                  contraseña: "",
                  repetirContraseña: "",
                }}
                validate={(values) => {
                  const { contraseña, repetirContraseña } = values;
                  let errors = {};

                  if (!contraseña) {
                    errors.contraseña = "";
                  } else if (
                    !PASSWORD_REGEXP.test(contraseña) ||
                    contraseña.length < PASSN_MINLENGTH
                  ) {
                    errors.contraseña = PASS_INVALID;
                  }

                  if (!repetirContraseña) {
                    errors.repetirContraseña = "";
                  } else if (
                    !PASSWORD_REGEXP.test(repetirContraseña) ||
                    repetirContraseña.length < PASSN_MINLENGTH
                  ) {
                    errors.repetirContraseña = PASS_INVALID;
                  } else if (contraseña !== repetirContraseña) {
                    errors.repetirContraseña = MATCH;
                  }

                  return errors;
                }}
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
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                      />
                    </div>
                    <div className="files">
                      <div className="txt-left">
                        {/* <TextField
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

                          // inputProps={{
                          //   maxLength: 9,
                          // }}
                        /> */}
                        <OutlinedInput
                          name="contraseña"
                          fullWidth
                          required
                          autoComplete="off"
                          type={this.state.show ? "text" : "password"}
                          value={values.contraseña}
                          error={errors.contraseña && touched.contraseña}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => this.handleShowPassword(1)}
                                edge="end"
                              >
                                {this.state.show ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Contraseña"
                        />
                        <ErrorMessage
                          className="error"
                          name="contraseña"
                          component="div"
                        />
                      </div>
                      <div className="txt-right">
                        {/* <TextField
                          name="repetirContraseña"
                          className="TxtField"
                          variant="outlined"
                          placeholder="Repite tu nueva contraseña"
                          value={values.repetirContraseña}
                          required
                          fullWidth
                          error={
                            errors.repetirContraseña &&
                            touched.repetirContraseña
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type={this.state.viewPassword ? "text" : "password"}

                          // inputProps={{
                          //   maxLength: 9,
                          // }}
                        /> */}
                        <OutlinedInput
                          name="repetirContraseña"
                          fullWidth
                          required
                          autoComplete="off"
                          type={this.state.show2 ? "text" : "password"}
                          value={values.repetirContraseña}
                          error={
                            errors.repetirContraseña &&
                            touched.repetirContraseña
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => this.handleShowPassword(2)}
                                edge="end"
                              >
                                {this.state.show2 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Repite tu nueva contraseña"
                        />
                        <ErrorMessage
                          className="error"
                          name="repetirContraseña"
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

export default PasswordRestore;

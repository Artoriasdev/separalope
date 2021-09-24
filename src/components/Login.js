import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Calendar } from "@material-ui/pickers";
import Axios from "axios";
import classNames from "classnames";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import { handleRegexDisable } from "../utils/utilitaries";
import FullPageLoader from "./FullPageLoader";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      response: false,
      message: "",
      isLoading: false,
      show: false,
    };
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("tk") !== null &&
      sessionStorage.getItem("workflow") === "B"
    ) {
      this.props.history.push("/business/category");
    } else if (
      sessionStorage.getItem("tk") !== null &&
      sessionStorage.getItem("workflow") === "C"
    ) {
      this.props.history.push("/");
    }
  }

  handleLogin = async (LoginModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/authenticate";

    const rspApi = Axios.post(linkLoginApi, LoginModel, {
      headers: headers,
    })
      .then((response) => {
        this.setState({
          isLoading: true,
        });
        if (response.data.response === "true") {
          sessionStorage.setItem("tk", response.data.data.token);
          sessionStorage.setItem("logged", response.data.response);
          sessionStorage.setItem(
            "info",
            JSON.stringify(response.data.data.listMenu)
          );
          sessionStorage.setItem("workflow", LoginModel.workflow);

          if (LoginModel.workflow === "B") {
            setTimeout(() => {
              this.setState({
                isLoading: false,
              });
              this.props.history.push("/business/category");
              this.props.history.go();
            }, 500);
          }

          if (LoginModel.workflow === "C") {
            this.handleGetDataCustomer();
            if (localStorage.getItem("reserve") === "true") {
              this.props.history.push(`/reserve/${localStorage.getItem("id")}`);
              localStorage.removeItem("reserve");
              localStorage.removeItem("id");
            } else {
              setTimeout(() => {
                this.setState({
                  isLoading: false,
                });
                this.props.history.go();
                this.props.history.push("/");
              }, 500);
            }
          }
        }
        console.log(response);
        return response;
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.data.response === "false") {
          this.setState({
            modal: true,
            message: response.data.message,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          });
        }
      });
    return rspApi;
  };

  handleGetDataCustomer = () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/getCustomer";

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          const { data } = response.data;

          sessionStorage.setItem("name", data[0].name);
          sessionStorage.setItem("lastName", data[0].lastName);

          return response;
        })
        .catch((error) => {
          console.log(error);
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };
  handleShowPassword = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <>
        <FullPageLoader isLoading={this.state.isLoading} />
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
        <div>
          <button
            className="arrow__button"
            onClick={() => this.props.history.goBack()}
          >
            <figure>
              <ArrowCircleSVG />
            </figure>
          </button>

          <div className="page-container">
            <div className="login">
              {this.props.match.params.value === "C" ? (
                <h3 className="register__subtitle">Soy un cliente</h3>
              ) : (
                <h3 className="register__subtitle">Doy un servicio</h3>
              )}
              <h1>Inicia sesión</h1>

              <Formik
                ref={(ref) => (this.form = ref)}
                initialValues={{
                  correo: "",
                  contraseña: "",
                }}
                // validate={{}}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  const LoginModel = {
                    username: "",
                    password: "",
                    workflow: "",
                  };

                  LoginModel.username = values.correo;
                  LoginModel.password = values.contraseña;
                  LoginModel.workflow = this.props.match.params.value;

                  (async () => {
                    await this.handleLogin(LoginModel);
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
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        label="Correo"
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        required
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
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="files">
                      {/* <TextField
                        name="contraseña"
                        className="TxtField"
                        variant="outlined"
                        label="Contraseña"
                        type="password"
                        value={values.contraseña}
                        error={errors.contraseña && touched.contraseña}
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <figure
                                className={classNames("input__adornment__date")}
                              >
                                <Calendar />
                              </figure>
                            </InputAdornment>
                          ),
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      /> */}
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Contraseña
                        </InputLabel>
                        <OutlinedInput
                          name="contraseña"
                          required
                          id="outlined-adornment-password"
                          type={this.state.show ? "text" : "password"}
                          value={values.contraseña}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleShowPassword}
                                edge="end"
                              >
                                {this.state.show ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Contraseña"
                        />
                      </FormControl>
                    </div>

                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className="btn-primary"
                      style={{
                        margin: "10px 0",
                        textTransform: "capitalize",
                      }}
                      type="submit"
                      fullWidth
                    >
                      Iniciar sesión
                    </Button>
                  </form>
                )}
              </Formik>
              <div className="recover-password-button">
                <a href={`/password-recovery/${this.props.match.params.value}`}>
                  Olvidé mi contraseña
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;

import React from "react";
import { Component } from "react";
import Axios from "axios";
import { ErrorMessage, Formik } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { Save } from "@material-ui/icons";
import axios from "axios";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import FullPageLoader from "../components/FullPageLoader";

class RegisterDataBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeBank: [],
      typeData: [],
      typeAccount: [],
      message: "",
      modal: false,
      disableButton: false,
      isLoading: false,
      error: false,
      forceRedirect: false,
      response: false,
      homeRedirect: false,
    };
  }

  componentDidMount() {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessBankData`;

      const rspApi = axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          // console.log(response.data.data);
          if (response.data.data !== undefined) {
            this.setState({
              modal: true,
              message: "Usted ya cuenta con datos bancarios",

              forceRedirect: true,
            });
          } else if (response.data.response === "false") {
            this.setState({
              modal: true,
              message: "Usted no esta autorizado para ver esta información",

              homeRedirect: true,
            });
          } else {
            this.handleGetTypeBank();
            this.handleGetTypeAccount();
          }

          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              modal: true,
              message: "Sesión expirada, porfavor vuelva a iniciar sesión",
              homeRedirect: true,
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
    } catch (error) {
      console.log(error);
      this.setState({
        modal: true,
        message:
          "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
      });
    }
  }

  handleInfoSubmit = async (BankModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/business/registerBusinessBankData`;

    const rspApi = Axios.post(linkRegisterApi, BankModel, {
      headers: headers,
    })
      .then((response) => {
        console.log(response);
        const { data } = response;
        this.setState({
          isLoading: true,
        });
        if (data.response === "false") {
          this.setState({
            modal: true,
            message: data.message,
            isLoading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401) {
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("logo");
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("tradename");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("id");
          this.setState({
            modal: true,
            message: "Sesión expirada, porfavor vuelva a iniciar sesión",
            isLoading: false,
            homeRedirect: true,
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

  handleGetTypeBank = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getBanks`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        // console.log(data);

        this.setState({
          typeBank: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };

  handleGetTypeAccount = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getBanksAccountType/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        // console.log(data);

        this.setState({
          typeAccount: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };

  //hacer handleChangeDocumentType
  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "bancoId") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("tipoId", "", true);
      formik.setFieldValue("numeroCuenta", "", true);
      formik.setFieldValue("numeroInterbancario", "", true);
      this.handleGetTypeAccount(value);
    }
    if (formField === "tipoId") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numeroCuenta", "", true);
      formik.setFieldValue("numeroInterbancario", "", true);
    }
    if (formField === "numeroCuenta") {
      const { tipoId } = formik.state.values;

      formik.setFieldValue(formField, value, true);
      let maxLengthInput;
      let minLengthInput;

      const id = this.state.typeAccount.find(
        (arreglo) => arreglo.id === tipoId
      );
      if (id === undefined) {
        this.setState({
          modal: true,
          message: "Porfavor elija primero el banco y/o tipo de cuenta",
        });
      } else {
        minLengthInput = id.minLength;
        maxLengthInput = id.maxLength;
      }

      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/business/profile/bank");
    } else if (this.state.forceRedirect === true) {
      this.props.history.push("/business/profile");
    } else if (this.state.homeRedirect === true) {
      this.props.history.push("/");
      this.props.history.go();
    }
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

        <div className="page-container">
          <div className="login">
            <h1>Registra tus datos bancarios</h1>
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                bancoId: "",
                tipoId: "",
                numeroCuenta: "",
                numeroInterbancario: "",
                correoBancario: "",
                maxLengthValue: "",
                minLengthValue: "",
              }}
              validate={(values) => {
                const {
                  numeroCuenta,
                  minLengthValue,
                  correoBancario,
                  bancoId,
                  numeroInterbancario,
                } = values;

                let errors = {};
                if (!correoBancario) {
                  errors.correoBancario = "";
                } else if (!EMAIL_REGEXP.test(correoBancario)) {
                  errors.correoBancario = EMAIL_INVALID;
                } else if (correoBancario.length < E_MINLENGTH) {
                  errors.correoBancario = EMAIL_MINLENGTH;
                }

                if (!numeroCuenta) {
                  errors.numeroCuenta = "";
                } else if (numeroCuenta.length < minLengthValue) {
                  errors.numeroCuenta = `El número de cuenta debe tener ${values.minLengthValue} dígitos`;
                } else if (!numeroCuenta.startsWith("0011") && bancoId === 2) {
                  errors.numeroCuenta =
                    "El número de cuenta debe comenzar con 0011";
                }

                if (!numeroInterbancario) {
                  errors.numeroInterbancario = "";
                } else if (numeroInterbancario.length < 20) {
                  errors.numeroInterbancario =
                    "El número de cuenta interbancaria debe ser de 20 dígitos";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const bankModel = {
                  idBank: "",
                  idBankAccountType: "",
                  accountNumber: "",
                  interbankAccountNumber: "",
                  email: "",
                };

                bankModel.idBank = values.bancoId;
                bankModel.idBankAccountType = values.tipoId;
                bankModel.accountNumber = values.numeroCuenta;
                bankModel.interbankAccountNumber = values.numeroInterbancario;
                bankModel.email = values.correoBancario;

                (async () => {
                  const responseSubmit = await this.handleInfoSubmit(bankModel);

                  const { response } = responseSubmit.data;

                  if (response === "true") {
                    this.setState({
                      isLoading: false,
                      modal: true,
                      message: responseSubmit.data.message,
                      response: true,
                    });
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
                <form name="formBank" onSubmit={handleSubmit}>
                  <div className="files">
                    <Select
                      value={values.bancoId}
                      error={errors.bancoId && touched.bancoId}
                      name="bancoId"
                      onChange={this.handleDocumentChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      fullWidth
                      style={{
                        marginTop: "10px",
                        textAlign: "center",
                        marginBottom: "5px",
                      }}
                      displayEmpty
                    >
                      <MenuItem disabled value={""}>
                        Nombre de banco
                      </MenuItem>
                      {this.state.typeBank &&
                        this.state.typeBank.map(({ id, name }) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <div className="files">
                    <div className="txt-left">
                      <Select
                        value={values.tipoId}
                        error={errors.tipoId && touched.tipoId}
                        name="tipoId"
                        onChange={this.handleDocumentChange}
                        onBlur={handleBlur}
                        required
                        variant="outlined"
                        fullWidth
                        displayEmpty
                      >
                        <MenuItem disabled value={""}>
                          Tipo de cuenta
                        </MenuItem>
                        {this.state.typeAccount &&
                          this.state.typeAccount.map(({ id, description }) => (
                            <MenuItem key={id} value={id}>
                              {description}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                    <div className="txt-right">
                      <TextField
                        name="numeroCuenta"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de cuenta"
                        fullWidth
                        value={values.numeroCuenta}
                        error={errors.numeroCuenta && touched.numeroCuenta}
                        onBlur={handleBlur}
                        onChange={this.handleDocumentChange}
                        required
                        autoComplete="off"
                        inputProps={{
                          maxLength: values.maxLengthValue,
                          minLength: values.minLengthValue,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="numeroCuenta"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="files">
                    <div className="txt-left">
                      <TextField
                        name="numeroInterbancario"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de cuenta interbancario"
                        fullWidth
                        value={values.numeroInterbancario}
                        error={
                          errors.numeroInterbancario &&
                          touched.numeroInterbancario
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        inputProps={{
                          maxLength: 20,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="numeroInterbancario"
                        component="div"
                      />
                    </div>

                    <div className="txt-right">
                      <TextField
                        name="correoBancario"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo de confirmación"
                        fullWidth
                        autoComplete="off"
                        value={values.correoBancario}
                        error={errors.correoBancario && touched.correoBancario}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="correoBancario"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      disabled={isSubmitting}
                      fullWidth
                      style={{ margin: "10px auto" }}
                    >
                      Guardar datos bancarios
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

export default RegisterDataBank;

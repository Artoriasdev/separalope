import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Fade,
  Link,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import { NavigateNext, PowerSettingsNew, Save } from "@material-ui/icons";
import axios from "axios";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import FullPageLoader from "./FullPageLoader";
import Blank from "../assets/images/blank-pfp.svg";

class BusinessProfileBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      typeBank: [],
      logo: "",
      name: "",
      typeAccount: [],
      editButton: false,
      modal: false,
      message: "",
      isLoading: false,
      forceRedirect: false,
      response: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetTypeBank();
      (async () => {
        await this.handleGetData();
        this.handleGetBusiness();
      })();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetBusiness = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusiness`;

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            this.setState({
              logo: data[0].logo,
              name: data[0].name,
            });
          } else {
            this.setState({
              modal: true,
              message: "Usted no está autorizado para ver esta información",
              forceRedirect: true,
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
              forceRedirect: true,
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
    }
  };

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessBankData`;

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            console.log(data);
            this.setState({
              formModel: data,
            });
            console.log(this.state.formModel);
            if (data !== undefined) {
              this.handleGetTypeAccount(this.state.formModel[0].idBank);
              const Formik = this.form;
              Formik.setFieldValue(
                "numeroCuenta",
                this.state.formModel[0].accountNumber
              );
              Formik.setFieldValue(
                "numeroInterbancario",
                this.state.formModel[0].interbankAccountNumber
              );
              Formik.setFieldValue(
                "correoBancario",
                this.state.formModel[0].email
              );
              Formik.setFieldValue("bancoId", this.state.formModel[0].idBank);
              Formik.setFieldValue(
                "tipoId",
                this.state.formModel[0].idAccountType
              );
            }
          } else {
            this.setState({
              modal: true,
              message: "Usted no esta autorizado para ver esta información",
              forceRedirect: true,
            });
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
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
              forceRedirect: true,
            });
          } else {
            this.setState({
              modal: true,
              message:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
              isLoading: false,
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

  handleGetTypeBank = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getBanks";

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

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
          isLoading: false,
        });
      });
    return rspApi;
  };
  //hacer handleChangeDocumentType
  handleGetTypeAccount = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getBanksAccountType/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeAccount: data,
        });
        console.log(data);

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          isLoading: false,
        });
      });
    return rspApi;
  };

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
      const { bancoId } = formik.state.values;
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

      console.log(maxLengthInput, minLengthInput);

      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
      console.log(bancoId);
    }
  };

  handleEditData = async (bankModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/updateBusinessBankData";

    const rspApi = axios
      .put(linkEditApi, bankModel, {
        headers: headers,
      })
      .then((response) => {
        this.setState({
          isLoading: true,
        });
        if (response.data.response === "true") {
          this.setState({
            modal: true,
            message: response.data.message,
            isLoading: false,
            response: true,
          });
        } else if (response.data.response === "false") {
          this.setState({
            modal: true,
            message: response.data.message,
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
            forceRedirect: true,
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

  handleEdit = () => {
    this.setState({ editButton: true });
  };

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleRedirectRegister = () => {
    this.props.history.push("/business/profile/register-data-bank");
  };

  handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("tradename");
    sessionStorage.removeItem("logo");
    this.props.history.go(this.props.history.push("/"));
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/login/B");
      this.props.history.go();
    } else if (this.state.response === true) {
      this.props.history.go();
    }
  };

  handleAttach = (e) => {
    let file = e.target.files[0];
    let ext = file.name.split(".").pop();
    // console.log(name);
    // console.log(file);
    // console.log(ext);

    if (ext === "jpg" || ext === "png" || ext === "jpeg") {
      const sizeFile = file.size;
      if (sizeFile < 1048576) {
        console.log(sizeFile);
        this.handleUploadLogoBusiness(file);
      } else {
        this.setState({
          modal: true,
          message: "La foto debe pesar menos de 1mb",
        });
      }
    } else {
      this.setState({
        modal: true,
        message: "El archivo debe ser formato .jpg o .png",
      });
    }
  };

  handleUploadLogoBusiness = async (logo) => {
    let data = new FormData();
    data.append("file", logo);
    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/uploadLogoBusiness";

    const rspApi = axios
      .post(linkEditApi, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);

        if (response.data.response === "true") {
          this.props.history.go();
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({
            modal: true,
            unableText: "Su sesión ha expirado. Vuelva a intentarlo.",
            forceRedirect: true,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            isLoading: false,
          });
        }
      });

    return rspApi;
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
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ margin: "30px" }}
        >
          <Link href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Mi Perfil
          </Link>
          <Link
            color="textSecondary"
            href="/business/profile/bank"
            // onClick={handleClick}
          >
            Datos bancarios
          </Link>
        </Breadcrumbs>

        <div className="header-profile-container">
          <div className="header-profile">
            <img
              src={this.state.logo === undefined ? Blank : this.state.logo}
              alt={this.state.name}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <label
                id="foto"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Cambiar foto
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  onChange={this.handleAttach}
                  style={{ display: "none" }}
                />
              </label>
              <span>*Max 1mb</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <span>Tamaño recomendado: 300 x 250 pixeles</span>
            </div>
            <div className="title">
              <p>{this.state.name}</p>
            </div>
            <div className="button-container">
              <div>
                <button onClick={this.handleRedirect} className="button_ref">
                  Datos de la empresa
                </button>
              </div>
              <div className="button">
                <button
                  onClick={this.handleRedirectBank}
                  className="button_ref"
                >
                  Datos bancarios
                </button>
              </div>
            </div>

            <div className="logout">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<PowerSettingsNew />}
                className="btn-logout"
                onClick={this.handleLogout}
              >
                Cerrar sesion
              </Button>
            </div>
          </div>
        </div>

        <div className="form">
          <h1>Datos de negocio</h1>
          <Button
            variant="contained"
            color="secondary"
            className="btn-primary"
            startIcon={<Edit />}
            style={{ marginTop: "-14px" }}
            onClick={
              this.state.formModel === undefined ? null : this.handleEdit
            }
          >
            Editar datos
          </Button>
          <hr />

          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              numeroCuenta: "",
              numeroInterbancario: "",
              correoBancario: "",
              bancoId: "",
              tipoId: "",
              maxLengthValue: "",
              minLengthValue: "",
            }}
            validate={(values) => {
              const {
                numeroCuenta,
                maxLengthValue,
                correoBancario,
                bancoId,
                numeroInterbancario,
                minLengthValue,
              } = values;

              let errors = {};

              if (!EMAIL_REGEXP.test(correoBancario)) {
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
                  "El número de cuenta interbancaria debe tener un mínimo 1 dígitos";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const bankModel = {
                accountNumber: "",
                interbankAccountNumber: "",
                email: "",
                idBankAccountType: "",
                idBank: "",
              };

              bankModel.accountNumber = values.numeroCuenta;
              bankModel.interbankAccountNumber = values.numeroInterbancario;
              bankModel.email = values.correoBancario;
              bankModel.idBank = values.bancoId;
              bankModel.idBankAccountType = values.tipoId;

              (async () => {
                await this.handleEditData(bankModel);
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
                <h2 style={{ marginTop: "17.43px" }}>Datos bancarios</h2>

                {this.state.formModel === undefined ? (
                  <div>
                    Usted no cuenta con ningún dato bancario, favor de registrar
                    sus datos{" "}
                    <button
                      onClick={this.handleRedirectRegister}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        marginLeft: "-5px",
                        fontSize: "14px",
                      }}
                    >
                      aquí
                    </button>
                  </div>
                ) : null}

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
                    disabled={!this.state.editButton}
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
                      disabled={!this.state.editButton}
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
                      label="Número de cuenta"
                      fullWidth
                      value={values.numeroCuenta}
                      error={errors.numeroCuenta && touched.numeroCuenta}
                      onBlur={handleBlur}
                      onChange={this.handleDocumentChange}
                      required
                      disabled={!this.state.editButton}
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
                      label="Número de cuenta interbancario"
                      fullWidth
                      disabled={!this.state.editButton}
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
                      label="Correo de confirmación"
                      fullWidth
                      disabled={!this.state.editButton}
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
                {this.state.editButton ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      style={{ marginTop: "10px" }}
                    >
                      Guardar datos bancarios
                    </Button>
                  </div>
                ) : null}
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default BusinessProfileBank;

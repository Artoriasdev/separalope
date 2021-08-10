import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import { PowerSettingsNew, Save } from "@material-ui/icons";
import axios from "axios";
import ModalError from "./ModalError";

class BusinessProfileBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      typeBank: [],
      typeAccount: [],
      editButton: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetTypeBank();
      this.handleGetTypeAccount();
      (async () => {
        await this.handleGetData();
      })();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusinessBankData";

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            this.setState({
              formModel: data,
            });

            console.log(data);

            const Formik = this.form;
            Formik.setFieldValue("banco", this.state.formModel[0].bankName);
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
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no esta autorizado para ver esta información",
            });
          }
          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesion expirada, porfavor vuelva a iniciar sesion",
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
        console.log(data);

        this.setState({
          typeBank: data,
        });

        return response;
      });
  };

  handleGetTypeAccount = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getBanksAccountType/1";

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          typeAccount: data,
        });

        return response;
      });
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
        console.log(response);
        return response;
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
    this.props.history.push("/");
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
  };

  render() {
    return (
      <>
        <ModalError
          show={this.state.showModalError}
          closeCallback={this.toggleModalError}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalError>

        <div style={{ marginTop: "50px", marginLeft: "50px" }}>
          <div
            className="header_container"
            style={{
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
              alt="test"
              style={{
                borderRadius: "50%",
                maxWidth: "150px",
              }}
            />
            <div
              style={{
                marginTop: "20px",
                fontSize: "20px",
                fontFamily: "MavenPro-Regular",
                fontWeight: "bold",
              }}
            >
              <p>Rosanaa Maria del Gracia</p>{" "}
              {/* cambiar por el nombre obtenido del back */}
            </div>
            <div>
              <div style={{}}>
                <button
                  onClick={this.handleRedirect}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Datos de la empresa
                </button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={this.handleRedirectBank}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Datos bancarios
                </button>
              </div>

              <div style={{ marginTop: "100px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PowerSettingsNew />}
                  style={{ width: "150px", margin: "0", padding: "5px 0" }}
                  onClick={this.handleLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>

          <div
            className="text_form"
            style={{
              marginTop: "-470px",
              marginLeft: "25%",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <h1 style={{ display: "inline-block", marginRight: "20px" }}>
              Datos de negocio
            </h1>
            <Button
              variant="contained"
              color="secondary"
              className="btn-primary"
              startIcon={<Edit />}
              style={{ marginTop: "-14px" }}
              onClick={this.handleEdit}
              disabled={this.state.formModel === undefined}
            >
              Editar datos
            </Button>
            <hr style={{ maxWidth: "80%", margin: "0", padding: "0" }} />
          </div>

          <div
            className="text_form"
            style={{
              marginLeft: "25%",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                numeroCuenta: "",
                numeroInterbancario: "",
                correoBancario: "",
                bancoId: "",
                tipoId: "",
              }}
              validate={{}}
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

                // aqui los getter y handler
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
                      Usted no cuenta con ningún dato bancario, favor de
                      registrar sus datos{" "}
                      <button
                        onClick={this.handleRedirectRegister}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        aquí
                      </button>
                    </div>
                  ) : null}

                  <div className="row">
                    <FormControl
                      variant="outlined"
                      fullWidth
                      style={{
                        marginTop: "10px",
                        marginRight: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      <InputLabel id="bankLabel">Nombre de banco</InputLabel>
                      <Select
                        labelId="bankLabel"
                        label="Nombre de banco"
                        value={values.bancoId}
                        error={errors.bancoId && touched.bancoId}
                        name="bancoId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!this.state.editButton}
                      >
                        {this.state.typeBank &&
                          this.state.typeBank.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      fullWidth
                      style={{
                        marginTop: "10px",
                        marginRight: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      <InputLabel id="accountType">Tipo de cuenta</InputLabel>
                      <Select
                        labelId="accountType"
                        label="Tipo de cuenta"
                        value={values.tipoId}
                        error={errors.tipoId && touched.tipoId}
                        name="tipoId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!this.state.editButton}
                      >
                        {this.state.typeAccount &&
                          this.state.typeAccount.map(({ id, description }) => (
                            <MenuItem key={id} value={id}>
                              {description}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <TextField
                      name="numeroCuenta"
                      className="TxtField"
                      variant="outlined"
                      label="Numero de cuenta"
                      fullWidth
                      value={values.numeroCuenta}
                      error={errors.numeroCuenta && touched.numeroCuenta}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.editButton}
                      style={{
                        marginTop: "10px",
                        marginLeft: "5px",
                        marginBottom: "15px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                  <div className="row">
                    <TextField
                      name="numeroInterbancario"
                      className="TxtField"
                      variant="outlined"
                      label="Numero de cuenta interbancario"
                      fullWidth
                      value={values.numeroInterbancario}
                      error={
                        errors.numeroInterbancario &&
                        touched.numeroInterbancario
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.editButton}
                      style={{
                        marginRight: "5px",
                        marginBottom: "10px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />

                    <TextField
                      name="correoBancario"
                      className="TxtField"
                      variant="outlined"
                      label="Correo bancario"
                      fullWidth
                      value={values.correoBancario}
                      error={errors.correoBancario && touched.correoBancario}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.editButton}
                      style={{
                        marginLeft: "5px",
                        marginBottom: "10px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                  {this.state.editButton ? (
                    <div className="row">
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
        </div>
      </>
    );
  }
}

export default BusinessProfileBank;

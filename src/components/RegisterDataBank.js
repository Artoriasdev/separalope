import React from "react";
import { Component } from "react";
import Axios from "axios";
import { Formik } from "formik";
import ModalSucess from "./ModalSucess";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { Save } from "@material-ui/icons";
import axios from "axios";
import ModalError from "./ModalError";

class RegisterDataBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeBank: [],
      typeData: [],
      typeAccount: [],
      disclaimerModal: "",
      showModalSucesss: false,
      showModalError: false,
      disableButton: false,
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

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusinessBankData";

      const rspApi = axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.response === "true") {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted ya cuenta con datos bancarios <br>Redirecionandolo...",
              disableButton: true,
            });
            setTimeout(() => {
              this.props.history.push("/business/profile");
            }, 3000);
          } else if (response.data.response === "false") {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no esta autorizado para ver esta información",
              disableButton: true,
            });
            setTimeout(() => {
              this.props.history.push("/login/B");
            }, 3000);
          } else {
            this.handleInfoSubmit();
            this.handleGetTypeBank();
            this.handleGetTypeAccount();
          }
          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesión expirada, porfavor vuelva a iniciar sesión",
            });
            setTimeout(() => {
              this.props.history.push("/login/B");
            }, 3000);
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  }

  handleInfoSubmit = async (BankModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/registerBusinessBankData";

    const rspApi = Axios.post(linkRegisterApi, BankModel, {
      headers: headers,
    }).then((response) => {
      console.log(response);
      return response;
    });

    return rspApi;
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
    return rspApi;
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
    return rspApi;
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    this.props.history.push("/business/profile");
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
          disabled={this.state.disableButton}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalError>
        <ModalSucess
          show={this.state.showModalSucesss}
          closeCallback={this.toggleModalSuccess}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalSucess>

        <div
          className="page-container"
          style={{ width: "500px", margin: "5% auto" }}
        >
          <h1>Registra tus datos bancarios</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              bancoId: "",
              tipoId: "",
              numeroCuenta: "",
              numeroInterbancario: "",
              correoBancario: "",
            }}
            validate={{}}
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
                    showModalSucesss: true,
                    disclaimerModal: "¡Registro grabado satisfactoriamente!",
                  });
                }
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
                <div className="files">
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
                <div className="files">
                  <TextField
                    name="numeroInterbancario"
                    className="TxtField"
                    variant="outlined"
                    label="Numero de cuenta interbancario"
                    fullWidth
                    value={values.numeroInterbancario}
                    error={
                      errors.numeroInterbancario && touched.numeroInterbancario
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                <div className="files">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="btn-primary"
                    startIcon={<Save />}
                    fullWidth
                    style={{ marginTop: "5px" }}
                  >
                    Guardar datos bancarios
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default RegisterDataBank;

import React from "react";
import { Component } from "react";
import Axios from "axios";
import { Formik } from "formik";
import ModalSucess from "./ModalSucess";
import { TextField, Button } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { Save } from "@material-ui/icons";

class RegisterDataBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeData: [],
      showModalSucesss: false,
      disclaimerModal: "",
    };
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

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    this.props.history.push("/business/profile");
  };

  render() {
    return (
      <>
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

        <div style={{ padding: "20px", width: "500px", margin: "50px auto" }}>
          <h1>Registra tus datos bancarios</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              banco: "",
              numeroCuenta: "",
              numeroInterbancario: "",
              correoBancario: "",
            }}
            validate={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const bankModel = {
                bankName: "",
                accountNumber: "",
                interbankAccountNumber: "",
                email: "",
              };

              bankModel.bankName = values.banco;
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
                  <TextField
                    name="banco"
                    className="TxtField"
                    variant="outlined"
                    label="Nombre del banco"
                    fullWidth
                    value={values.banco}
                    error={errors.banco && touched.banco}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginTop: "10px",
                      marginRight: "5px",
                      marginBottom: "15px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

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
                    style={{ marginTop: "10px" }}
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

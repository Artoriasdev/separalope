import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Button, IconButton, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";

class BusinessProfilePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
    };
  }

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  //componentDidMount ,handlers

  render() {
    return (
      <>
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
            <div style={{ textAlign: "left" }}>
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
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={this.handleRedirectPassword}
                  className="button_ref"
                  style={{ textDecoration: "none" }}
                >
                  Contraseña
                </button>
              </div>
            </div>
          </div>

          <div
            className="text_form"
            style={{
              marginTop: "-300px",
              marginLeft: "50vh",
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
            >
              Editar datos
            </Button>
            <hr style={{ maxWidth: "80%", margin: "0", padding: "0" }} />
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                nombreCompañia: "",
                nombreComercial: "",
                numeroDocumento: "",
                correo: "",
                banco: "",
                numeroCuenta: "",
                numeroInterbancario: "",
                contraseña: "",
                cambiarContraseña: "",
                repetirContraseña: "",
                correoBancario: "",
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const dataModel = {
                  businessName: "",
                  tradeName: "",
                  documentNumber: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                };
                const bankModel = {
                  bankName: "",
                  accountNumber: "",
                  interbankAccountNumber: "",
                  email: "",
                };

                dataModel.businessName = values.nombreCompañia;
                dataModel.tradeName = values.nombreComercial;
                dataModel.documentNumber = values.numeroDocumento;
                dataModel.email = values.correo;
                dataModel.password = values.contraseña;
                dataModel.confirmPassword = values.repetirContraseña;
                bankModel.bankName = values.banco;
                bankModel.accountNumber = values.numeroCuenta;
                bankModel.interbankAccountNumber = values.numeroInterbancario;
                bankModel.email = values.correoBancario;

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
                <form>
                  <h2 style={{ marginTop: "17.43px" }}>Contraseñas</h2>
                  <div className="row">
                    <TextField
                      name="contraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Contraseña actual"
                      fullWidth
                      value={values.contraseña}
                      error={errors.contraseña && touched.contraseña}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
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
                      name="cambiarContraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Cambio de contraseña"
                      fullWidth
                      value={values.cambiarContraseña}
                      error={
                        errors.cambiarContraseña && touched.cambiarContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
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
                      name="repetirContraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Repetir la contraseña"
                      value={values.repetirContraseña}
                      error={
                        errors.repetirContraseña && touched.repetirContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      style={{
                        paddingRight: "5px",
                        marginBottom: "20px",
                        width: "49.44444%",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
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

export default BusinessProfilePassword;

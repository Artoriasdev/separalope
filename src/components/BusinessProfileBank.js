import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import { PowerSettingsNew, Save } from "@material-ui/icons";

class BusinessProfileBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      editButton: false,
    };
  }

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
              <div style={{ marginTop: "100px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PowerSettingsNew />}
                  style={{ width: "150px", margin: "0", padding: "5px 0" }}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>

          <div
            className="text_form"
            style={{
              marginTop: "-550px",
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
              onClick={this.handleEdit}
            >
              Editar datos
            </Button>
            <hr style={{ maxWidth: "80%", margin: "0", padding: "0" }} />
          </div>

          <div
            className="text_form"
            style={{
              marginLeft: "50vh",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
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
                <form name="formBank">
                  <h2 style={{ marginTop: "17.43px" }}>Datos bancarios</h2>

                  <div className="row">
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
                      disabled={!this.state.editButton}
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

import React from "react";
import { Component } from "react";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
    };
  }

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
          </div>

          <div
            className="text_form"
            style={{
              marginTop: "-150px",
              marginLeft: "50vh",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <h1>Datos de negocio</h1>
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
                  <h2>Datos de la empresa</h2>
                  <div className="row">
                    <TextField
                      name="nombreCompañia"
                      className="TxtField"
                      variant="outlined"
                      label="Nombre de la compañia"
                      fullWidth
                      value={values.nombreCompañia}
                      error={errors.nombreCompañia && touched.nombreCompañia}
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
                      name="nombreComercial"
                      className="TxtField"
                      variant="outlined"
                      label="Nombre comercial de la compañia"
                      fullWidth
                      value={values.nombreComercial}
                      error={errors.nombreComercial && touched.nombreComercial}
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
                  <div className="row">
                    <TextField
                      name="numeroDocumento"
                      className="TxtField"
                      variant="outlined"
                      label="Numero de documento"
                      fullWidth
                      value={values.numeroDocumento}
                      error={errors.numeroDocumento && touched.numeroDocumento}
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
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      label="Correo de la empresa"
                      fullWidth
                      value={values.correo}
                      error={errors.correo && touched.correo}
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

export default BusinessProfile;

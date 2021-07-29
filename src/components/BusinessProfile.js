import React from "react";
import { Component } from "react";
import { Formik } from "formik";

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
                  <div class="row">
                    <span>
                      <input
                        class="basic-slide"
                        id="name"
                        name="nombreCompañia"
                        type="text"
                        placeholder="Nombre de la compañia"
                        value={values.nombreCompañia}
                        onChange={handleChange}
                      />
                      <label for="name">Nombre comañia</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="name"
                        name="nombreComercial"
                        type="text"
                        placeholder="Nombre comercial de la compañia"
                        value={values.nombreComercial}
                        onChange={handleChange}
                      />
                      <label for="name">Nombre comercial</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="number"
                        name="numeroDocumento"
                        type="text"
                        placeholder="Numero de documento"
                        value={values.numeroDocumento}
                        onChange={handleChange}
                      />
                      <label for="number">Numero documento</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="email"
                        name="correo"
                        type="email"
                        placeholder="Correo de la empresa"
                        value={values.correo}
                        onChange={handleChange}
                      />
                      <label for="email">Correo</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="name"
                        name="banco"
                        type="text"
                        placeholder="Nombre del banco"
                        value={values.banco}
                        onChange={handleChange}
                      />
                      <label for="name">Banco</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="number"
                        name="numeroCuenta"
                        type="text"
                        placeholder="Numero de cuenta"
                        value={values.numeroCuenta}
                        onChange={handleChange}
                      />
                      <label for="number">Numero cuenta</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="number"
                        name="numeroInterbancario"
                        type="text"
                        placeholder="Numero de cuenta interbancario"
                        value={values.numeroInterbancario}
                        onChange={handleChange}
                      />
                      <label for="number">Numero interbancario</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="email"
                        name="correoBancario"
                        type="email"
                        placeholder="Correo bancario"
                        value={values.correoBancario}
                        onChange={handleChange}
                      />
                      <label for="email">Correo bancario</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="password"
                        name="contraseña"
                        type="password"
                        placeholder="Contraseña actual"
                        value={values.contraseña}
                        onChange={handleChange}
                      />
                      <label for="password">Contraseña actual</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="password"
                        name="cambiarContraseña"
                        type="password"
                        placeholder="Cambio de contraseña"
                        value={values.cambiarContraseña}
                        onChange={handleChange}
                      />
                      <label for="password">Cambiar contraseña</label>
                    </span>
                    <span>
                      <input
                        class="basic-slide"
                        id="password"
                        name="repetirContraseña"
                        type="password"
                        placeholder="Repetir la contraseña"
                        value={values.repetirContraseña}
                        onChange={handleChange}
                      />
                      <label for="password">Repetir contraseña</label>
                    </span>
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

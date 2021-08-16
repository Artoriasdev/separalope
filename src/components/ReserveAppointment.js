import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";

class ReserveAppointment extends Component {
  render() {
    return (
      <div>
        <div style={{ padding: "20px", width: "500px", margin: "50px auto" }}>
          <h1>Reserva tu cita</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              razon: "",
              nombre: "",
              nroDocumento: "",
              correo: "",
              contraseña: "",
              repContraseña: "",
            }}
            validate={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const BusinessModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              };

              BusinessModel.businessName = values.razon;
              BusinessModel.tradeName = values.nombre;
              BusinessModel.email = values.correo;
              BusinessModel.mobile = values.celular;
              BusinessModel.documentNumber = values.nroDocumento;
              BusinessModel.password = values.contraseña;
              BusinessModel.confirmPassword = values.repContraseña;
              BusinessModel.idCategory = values.categoria;
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
              <form name="formRegister" onSubmit={handleSubmit}>
                <div className="files">
                  <TextField
                    name="razon"
                    className="TxtField"
                    variant="outlined"
                    label="Ingresa tu correo electrónico"
                    fullWidth
                    value={values.razon}
                    error={errors.razon && touched.razon}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  <TextField
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    label="Ingresa tu numero de celular"
                    fullWidth
                    value={values.nombre}
                    error={errors.nombre && touched.nombre}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <TextField
                    name="nroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="Profesor"
                    fullWidth
                    value={values.nroDocumento}
                    error={errors.nroDocumento && touched.nroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
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
                    label="Elige la fecha disponible"
                    fullWidth
                    value={values.correo}
                    error={errors.correo && touched.correo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <TextField
                    name="repContraseña"
                    type="text"
                    className="TxtField"
                    variant="outlined"
                    label="Duracion de la clase"
                    fullWidth
                    value={values.repContraseña}
                    error={errors.repContraseña && touched.repContraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  <TextField
                    name="contraseña"
                    type="text"
                    className="TxtField"
                    variant="outlined"
                    label="Elige el horario"
                    fullWidth
                    value={values.contraseña}
                    error={errors.contraseña && touched.contraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="files">
                  <TextField
                    name="precio"
                    type="text"
                    className="TxtField"
                    variant="outlined"
                    label="Precio"
                    fullWidth
                    value={values.precio}
                    error={errors.precio && touched.precio}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "51%",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  style={{
                    margin: "10px 0",
                  }}
                  type="submit"
                  fullWidth
                >
                  Reservar cita
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ReserveAppointment;

import React, { Component } from "react";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";

class Complains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDocs: [],
      isLoading: false,
      modal: false,
      message: "",
      response: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetDocuments();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetDocuments = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getDocumentTypes";

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeDocs: data,
        });

        return response;
      });
    return rspApi;
  };

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "tipoDocumento") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
      const { tipoDocumento } = formik.state.values;
      let maxLengthInput = 8;
      if (tipoDocumento === "01") maxLengthInput = 8;
      if (tipoDocumento === "04" || tipoDocumento === "07") maxLengthInput = 12;
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };
  render() {
    return (
      <div className="page-container">
        <div className="complain-container">
          <h1>Libro de reclamaciones</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              tipoCliente: "",
              tipoDocumento: "",
              numDocumento: "",
              nombre: "",
              apellidos: "",
              correo: "",
              celular: "",
              tipoSolicitud: "",
              categoria: "",
              descripcion: "",
              maxLengthValue: 8,
            }}
            validate={(values) => {
              const { numDocumento, correo, celular, maxLengthValue } = values;

              let errors = {};
              if (!correo) {
                errors.correo = "";
              } else if (!EMAIL_REGEXP.test(correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }
              if (!numDocumento) {
                errors.numDocumento = "";
              } else if (numDocumento.length < maxLengthValue) {
                errors.numDocumento = `*El número de documento debe ser de ${maxLengthValue} dígitos`;
              }

              if (!celular) {
                errors.celular = "";
              } else if (celular.startsWith("0")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("1")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("2")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("3")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("4")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("5")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("6")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("7")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.startsWith("8")) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9.";
              } else if (celular.length < 9) {
                errors.celular = "*El número de celular debe tener 9 dígitos.";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // const complainModel = {
              //   idService: "",
              //   email: "",
              //   mobile: "",
              //   name: "",
              //   lastName: "",
              //   reservationDate: "",
              //   reservationTime: "",
              // };

              (async () => {
                console.log(values);
                //   const responseSubmit = await this.handleInfoSubmit(reserveModel);
                //   const { response } = responseSubmit.data;
                //   if (response === "true") {
                //     this.setState({
                //       modal: true,
                //       message: "¡Registro grabado satisfactoriamente!",
                //       response: true,
                //       isLoading: false,
                //     });
                //   }
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
              <form name="formComplains" onSubmit={handleSubmit}>
                <div className="form-container">
                  <div className="left">
                    <div className="files">
                      <Select
                        style={{
                          backgroundColor: "white",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.tipoCliente}
                        error={errors.tipoCliente && touched.tipoCliente}
                        name="tipoCliente"
                        displayEmpty
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">Tipo de cliente</span>
                        </MenuItem>
                        <MenuItem value="1">Usuario</MenuItem>
                        <MenuItem value="2">Prestador de servicio</MenuItem>
                        <MenuItem value="3">No cliente</MenuItem>
                        {/* {this.state.typeDocs &&
                    this.state.typeDocs.map(({ id, descriptionLarge }) => (
                      <MenuItem key={id} value={id}>
                        {descriptionLarge}
                      </MenuItem>
                    ))} */}
                      </Select>
                    </div>
                    <div className="files">
                      <Select
                        style={{
                          backgroundColor: "white",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.tipoDocumento}
                        error={errors.tipoDocumento && touched.tipoDocumento}
                        name="tipoDocumento"
                        displayEmpty
                        required
                        onChange={this.handleDocumentChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">
                            Tipo de documento
                          </span>
                        </MenuItem>
                        {this.state.typeDocs &&
                          this.state.typeDocs.map(
                            ({ id, descriptionLarge }) => (
                              <MenuItem key={id} value={id}>
                                {descriptionLarge}
                              </MenuItem>
                            )
                          )}
                      </Select>
                    </div>
                    <div className="files" style={{ flexDirection: "column" }}>
                      <TextField
                        name="numDocumento"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Número de documento"
                        value={values.numDocumento}
                        error={errors.numDocumento && touched.numDocumento}
                        onBlur={handleBlur}
                        onChange={this.handleDocumentChange}
                        required
                        fullWidth
                        autoComplete="off"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        inputProps={{
                          maxLength: values.maxLengthValue,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="numDocumento"
                        component="div"
                      />
                    </div>
                    <div className="files">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombres"
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("[a-z A-Z ]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <div className="files">
                      <TextField
                        name="apellidos"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Apellidos"
                        value={values.apellidos}
                        error={errors.apellidos && touched.apellidos}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("[a-z A-Z ]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <div className="files" style={{ flexDirection: "column" }}>
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo"
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="correo"
                        component="div"
                      />
                    </div>

                    <div className="files" style={{ flexDirection: "column" }}>
                      <TextField
                        name="celular"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Celular"
                        value={values.celular}
                        error={errors.celular && touched.celular}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        inputProps={{
                          maxLength: 9,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="celular"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="files">
                      <Select
                        style={{
                          backgroundColor: "white",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.tipoSolicitud}
                        error={errors.tipoSolicitud && touched.tipoSolicitud}
                        name="tipoSolicitud"
                        displayEmpty
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">
                            Tipo de solicitud
                          </span>
                        </MenuItem>
                        <MenuItem value="1">Queja</MenuItem>
                        <MenuItem value="2">Reclamo</MenuItem>
                        {/* {this.state.typeDocs &&
                    this.state.typeDocs.map(({ id, descriptionLarge }) => (
                      <MenuItem key={id} value={id}>
                        {descriptionLarge}
                      </MenuItem>
                    ))} */}
                      </Select>
                    </div>

                    <div className="files">
                      <Select
                        style={{
                          backgroundColor: "white",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.categoria}
                        error={errors.categoria && touched.categoria}
                        name="categoria"
                        displayEmpty
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">Categoría</span>
                        </MenuItem>
                        <MenuItem value="1">Devolución de dinero</MenuItem>
                        <MenuItem value="2">Derechos de arco</MenuItem>
                        {/* {this.state.typeDocs &&
                    this.state.typeDocs.map(({ id, descriptionLarge }) => (
                      <MenuItem key={id} value={id}>
                        {descriptionLarge}
                      </MenuItem>
                    ))} */}
                      </Select>
                    </div>
                    <div className="files">
                      <TextField
                        name="descripcion"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Detalle de solicitud"
                        value={values.descripcion}
                        error={errors.descripcion && touched.descripcion}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        minRows={8}
                        multiline
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>
                </div>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  style={{
                    margin: "10px auto",
                    textTransform: "capitalize",
                    width: "40%",
                    display: "flex",
                  }}
                  type="submit"
                >
                  Registrar queja
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default Complains;

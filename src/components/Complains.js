import React, { Component } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import FullPageLoader from "./FullPageLoader";
import DateFnsUtils from "@date-io/date-fns";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { pickerTheme } from "../utils/constants";
import esLocale from "date-fns/locale/es";
import InputAdornment from "@material-ui/core/InputAdornment";
import classnames from "classnames";
import { CalendarToday } from "@material-ui/icons";

class Complains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDocs: [],
      typeComplaint: [],
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
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };
  handleGetCategoryComplaint = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/complaint/getCategoryComplaint/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeComplaint: data,
        });
        console.log(this.state.typeComplaint);

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
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
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = this.state.typeDocs.find(
        (arreglo) => arreglo.id === tipoDocumento
      );
      if (id === undefined) {
        this.setState({
          modal: true,
          message: "Porfavor elija el Tipo de documento",
        });
      } else {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (tipoDocumento === "04" || tipoDocumento === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue("ingreso", valor, true);
      formik.setFieldValue(formField, value, true);
    }
  };
  handleComplaintChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "tipoSolicitud") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("categoria", "", false);
      this.handleGetCategoryComplaint(value);
    }
  };

  handleInfoSubmit = (complainModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/complaint/registerComplaint";

    const rspApi = axios
      .post(linkRegisterApi, complainModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;
        this.setState({
          isLoading: true,
        });

        if (data.response === "false") {
          this.setState({
            modal: true,
            message: data.message,
            isLoading: false,
          });
        }
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

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/");
    }
  };

  render() {
    const nowDate = new Date();
    nowDate.setFullYear(nowDate.getFullYear() - 2);
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
                minLengthValue: 1,
                ingreso: "",
              }}
              validate={(values) => {
                const {
                  numDocumento,
                  correo,
                  celular,
                  maxLengthValue,
                  tipoDocumento,
                  minLengthValue,
                } = values;

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
                } else if (
                  tipoDocumento === "04" &&
                  numDocumento.length < minLengthValue
                ) {
                  errors.numDocumento = `*El número de documento debe tener un minimo de ${minLengthValue} dígitos`;
                } else if (
                  tipoDocumento === "07" &&
                  numDocumento.length < minLengthValue
                ) {
                  errors.numDocumento = `*El número de documento debe tener un minimo de ${minLengthValue} dígitos`;
                } else if (
                  tipoDocumento === "01" &&
                  numDocumento.length < maxLengthValue
                ) {
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
                  errors.celular =
                    "*El número de celular debe tener 9 dígitos.";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const complainModel = {
                  clientType: "",
                  documentType: "",
                  documentNumber: "",
                  name: "",
                  lastName: "",
                  email: "",
                  mobile: "",
                  requestType: "",
                  requestCategory: "",
                  requestDetail: "",
                };

                complainModel.clientType = values.tipoCliente;
                complainModel.documentType = values.tipoDocumento;
                complainModel.documentNumber = values.numDocumento;
                complainModel.name = values.nombre;
                complainModel.lastName = values.apellidos;
                complainModel.email = values.correo;
                complainModel.mobile = values.celular;
                complainModel.requestType = values.tipoSolicitud;
                complainModel.requestCategory = values.categoria;
                complainModel.requestDetail = values.descripcion;

                (async () => {
                  console.log(complainModel);
                  const responseSubmit = await this.handleInfoSubmit(
                    complainModel
                  );
                  const { response } = responseSubmit.data;
                  const { message } = responseSubmit.data;
                  console.log(message);
                  if (response === "true") {
                    this.setState({
                      modal: true,
                      message: message,
                      response: true,
                      isLoading: false,
                    });
                  }
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
                            marginTop: "10px",
                            marginBottom: "10px",
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
                        >
                          <MenuItem disabled value={""}>
                            <span className="empty--option">
                              Tipo de cliente
                            </span>
                          </MenuItem>
                          <MenuItem value="C">Usuario</MenuItem>
                          <MenuItem value="B">Prestador de servicio</MenuItem>
                          <MenuItem value="U">No cliente</MenuItem>
                        </Select>
                      </div>
                      <div className="files">
                        <Select
                          style={{
                            backgroundColor: "white",
                            marginTop: "10px",
                            marginBottom: "10px",
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
                      <div
                        className="files"
                        style={{ flexDirection: "column" }}
                      >
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
                          onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
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
                          onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
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
                          onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                        />
                      </div>
                      <div
                        className="files"
                        style={{ flexDirection: "column" }}
                      >
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

                      <div
                        className="files"
                        style={{ flexDirection: "column" }}
                      >
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
                        <MuiThemeProvider theme={pickerTheme}>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={esLocale}
                          >
                            <DatePicker
                              cancelLabel="Cancelar"
                              okLabel="Aceptar"
                              disableFuture
                              // maxDate={nowDate}
                              openTo="year"
                              format="dd/MM/yyyy"
                              fullWidth
                              disabled
                              views={["year", "month", "date"]}
                              onChange={handleChange}
                              // disabledDays={this.state.disabledDays}
                              // onDisabledDayError={this.handleDisabledSelect}
                              value={values.fechaIngreso}
                              className="border"
                              name="fechaIngreso"
                              InputProps={{
                                style: {
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  height: 54,
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: "3px",
                                  border: "1px solid #C4C4C4",
                                  paddingLeft: "13px",
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <figure
                                      className={classnames(
                                        "input__adornment__date"
                                      )}
                                    >
                                      <CalendarToday />
                                    </figure>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </MuiThemeProvider>
                      </div>
                      <div className="files">
                        <Select
                          style={{
                            backgroundColor: "white",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                          fullWidth
                          variant="outlined"
                          value={values.tipoSolicitud}
                          error={errors.tipoSolicitud && touched.tipoSolicitud}
                          name="tipoSolicitud"
                          displayEmpty
                          required
                          onChange={this.handleComplaintChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem disabled value={""}>
                            <span className="empty--option">
                              Tipo de solicitud
                            </span>
                          </MenuItem>
                          <MenuItem value="QUE">Queja</MenuItem>
                          <MenuItem value="REC">Reclamo</MenuItem>
                        </Select>
                      </div>

                      <div className="files">
                        <Select
                          style={{
                            backgroundColor: "white",
                            marginTop: "10px",
                            marginBottom: "10px",
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
                        >
                          <MenuItem disabled value={""}>
                            <span className="empty--option">Categoría</span>
                          </MenuItem>
                          {this.state.typeComplaint &&
                            this.state.typeComplaint.map(
                              ({ id, description }) => (
                                <MenuItem key={id} value={id}>
                                  {description}
                                </MenuItem>
                              )
                            )}
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
                          maxRows={9}
                          multiline
                          inputProps={{
                            maxLength: 255,
                          }}
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
                    Registrar solicitud
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default Complains;

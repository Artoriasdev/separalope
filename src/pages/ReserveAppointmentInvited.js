import {
  Backdrop,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import React, { Component } from "react";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import { EMAIL_REGEXP } from "../utils/regexp";
import { handleRegexDisable } from "../utils/utilitaries";
import FullPageLoader from "../components/FullPageLoader";

const styles = (theme) => ({
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
    },
  },
});

class ReserveAppointmentInvited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: [],
      dateData: [],
      hourData: [],
      terms: [],
      modal: false,
      response: false,
      message: "",
      checked: false,
      termsModal: false,
      errorTerms: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetServicesById();
      this.handleGetAvailableDateService();
      this.handleGetAvailableScheduleService();
      this.handleGetTerms();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetServicesById = () => {
    const id = this.props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesById/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          serviceData: data,
        });
        // console.log(data);
        const Formik = this.form;
        Formik.setFieldValue("servicio", this.state.serviceData[0].title);
        Formik.setFieldValue("duracion", this.state.serviceData[0].duration);
        Formik.setFieldValue(
          "precio",
          this.state.serviceData[0].currencySymbol +
            ". " +
            this.state.serviceData[0].price
        );

        return response;
      });
    return rspApi;
  };

  handleGetAvailableDateService = () => {
    const id = this.props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getAvailableDateService/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          dateData: data,
        });
        // console.log(data);

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

  handleGetAvailableScheduleService = (date) => {
    const id = this.props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getAvailableScheduleService/${id}/${date}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          hourData: data,
        });
        // console.log(data);

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

  handleDateChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "fechaDisponible") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("horarioDisponible", "", true);
      this.handleGetAvailableScheduleService(value);
      console.log(value);
    }
  };

  handleInfoSubmit = (reserveModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ``,
    };

    let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/registerReservationInvited`;

    const rspApi = axios
      .post(linkRegisterApi, reserveModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem(
          "lugar",
          JSON.stringify(this.state.serviceData[0].title)
        );
        localStorage.setItem(
          "direccion",
          JSON.stringify(this.state.serviceData[0].businessAddress)
        );
        this.setState({ isLoading: true });

        if (data.response === "true") {
          setTimeout(() => {
            this.setState({
              isLoading: false,
              modal: true,
              message: "¡Registro grabado satisfactoriamente!",
              response: true,
            });
          }, 500);
        } else if (data.response === "false") {
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
        });
      });

    return rspApi;
  };

  handleGetTerms = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getTemplates/2`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          terms: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          errorTerms: true,
        });
      });
    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.push(`/reserve-complete`);
    } else if (this.state.errorTerms === true) {
      this.props.history.goBack();
    }
  };

  handleCheck = () => {
    const Formik = this.form;
    if (this.state.checked === true) {
      this.setState({
        checked: false,
      });
      Formik.setFieldValue("checkbox", false, true);
    } else if (this.state.checked === false) {
      this.setState({
        termsModal: true,
      });
    }
  };

  handleTerms = (id) => {
    const Formik = this.form;
    if (id === 1) {
      this.setState({
        checked: true,
        termsModal: false,
      });
      Formik.setFieldValue("checkbox", true, true);
    } else if (id === 2) {
      this.setState({
        termsModal: false,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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

        <Dialog
          open={this.state.termsModal}
          onClose={() => this.handleTerms(2)}
          scroll="paper"
          className={classes.dialog}
        >
          {this.state.terms.map(({ id, value }) => (
            <DialogContent key={id}>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </DialogContent>
          ))}
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              className="font-p btn-primary"
              color="primary"
              onClick={() => this.handleTerms(1)}
              variant="contained"
              style={{
                margin: "5px 5px 3px 0",
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              Aceptar
            </Button>
            <Button
              className="font-p btn-primary"
              color="primary"
              onClick={() => this.handleTerms(2)}
              variant="contained"
              style={{
                margin: "5px 0 3px 5px",
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        <div className="page-container">
          <div className="login">
            <h1>Reserva tu cita</h1>
            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                correo: "",
                celular: "",
                servicio: "",
                duracion: "",
                precio: "",
                fechaDisponible: "",
                horarioDisponible: "",
                nombre: "",
                apellido: "",
                checkbox: false,
              }}
              validate={(values) => {
                const { correo, celular, checkbox } = values;

                let errors = {};

                if (!correo) {
                  errors.correo = "";
                } else if (!EMAIL_REGEXP.test(correo)) {
                  errors.correo = EMAIL_INVALID;
                } else if (correo.length < E_MINLENGTH) {
                  errors.correo = EMAIL_MINLENGTH;
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

                if (checkbox === false) {
                  errors.checkbox = "Debes aceptar los términos y condiciones";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const reserveModel = {
                  idService: "",
                  email: "",
                  mobile: "",
                  name: "",
                  lastName: "",
                  reservationDate: "",
                  reservationTime: "",
                };

                reserveModel.email = values.correo;
                reserveModel.mobile = values.celular;
                reserveModel.name = values.nombre;
                reserveModel.lastName = values.apellido;
                reserveModel.idService = this.props.match.params.id;
                reserveModel.reservationDate = values.fechaDisponible;
                reserveModel.reservationTime = values.horarioDisponible;

                (async () => {
                  this.handleInfoSubmit(reserveModel);
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
                <form name="formRegister" onSubmit={handleSubmit}>
                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        label="Nombre"
                        fullWidth
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <TextField
                        name="apellido"
                        className="TxtField"
                        variant="outlined"
                        label="Apellidos"
                        fullWidth
                        value={values.apellido}
                        error={errors.apellido && touched.apellido}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>
                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        label="Correo electrónico"
                        fullWidth
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="correo"
                        component="div"
                      />
                    </div>
                    <div className="txt-right-nomid">
                      <TextField
                        name="celular"
                        className="TxtField"
                        variant="outlined"
                        label="Número de celular"
                        fullWidth
                        value={values.celular}
                        error={errors.celular && touched.celular}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        inputProps={{
                          maxLength: 9,
                        }}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error"
                        name="celular"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left-nomid">
                      <TextField
                        name="servicio"
                        className="TxtField"
                        variant="outlined"
                        label="Nombre del servicio"
                        fullWidth
                        value={values.servicio}
                        error={errors.servicio && touched.servicio}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={true}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <TextField
                        name="duracion"
                        type="text"
                        className="TxtField"
                        variant="outlined"
                        label="Duración del servicio"
                        fullWidth
                        value={values.duracion}
                        error={errors.duracion && touched.duracion}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={true}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left-nomid">
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
                        disabled={true}
                        style={{
                          marginBottom: "5px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right-nomid">
                      <Select
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          marginBottom: "5px",
                        }}
                        variant="outlined"
                        value={values.fechaDisponible}
                        error={
                          errors.fechaDisponible && touched.fechaDisponible
                        }
                        name="fechaDisponible"
                        displayEmpty
                        required
                        onChange={this.handleDateChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">
                            Elige la fecha disponible
                          </span>
                        </MenuItem>

                        {this.state.dateData &&
                          this.state.dateData.map(({ keyDate, valueDate }) => (
                            <MenuItem key={keyDate} value={keyDate}>
                              {valueDate}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="files">
                    <Select
                      style={{
                        backgroundColor: "white",
                        marginRight: "51%",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                      fullWidth
                      variant="outlined"
                      value={values.horarioDisponible}
                      error={
                        errors.horarioDisponible && touched.horarioDisponible
                      }
                      name="horarioDisponible"
                      displayEmpty
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem disabled value={""}>
                        <span className="empty--option">Elige el horario</span>
                      </MenuItem>
                      {this.state.hourData.length === 0 ? (
                        <MenuItem disabled value={" "}>
                          <span className="empty--option">
                            Horarios no disponibles
                          </span>
                        </MenuItem>
                      ) : (
                        this.state.hourData &&
                        this.state.hourData.map(({ keyTime, valueTime }) => (
                          <MenuItem key={keyTime} value={keyTime}>
                            {valueTime}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </div>

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkbox"
                        checked={this.state.checked}
                        onChange={this.handleCheck}
                        color="primary"
                      />
                    }
                    label="Términos y condiciones"
                  />
                  <ErrorMessage
                    className="error"
                    name="checkbox"
                    component="div"
                  />

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
      </div>
    );
  }
}

export default withStyles(styles)(ReserveAppointmentInvited);

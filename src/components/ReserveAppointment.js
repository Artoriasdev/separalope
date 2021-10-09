import {
  Backdrop,
  Button,
  Fade,
  MenuItem,
  Modal,
  Select,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import React, { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";
import FullPageLoader from "./FullPageLoader";

class ReserveAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: [],
      serviceData: [],
      dateData: [],
      hourData: [],
      date: "",
      modal: false,
      response: false,
      message: "",
      isLoading: false,
      errorTerms: false,
      checked: false,
      termsModal: false,
      terms: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") === "C") {
      try {
        this.handleGetCustomer();
        this.handleGetServicesById();
        this.handleGetAvailableDateService();
        this.handleGetAvailableScheduleService();
        this.handleGetTerms();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleGetCustomer = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/getCustomer`;

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            this.setState({
              customerData: data,
            });
            console.log(data);

            const Formik = this.form;
            Formik.setFieldValue("celular", this.state.customerData[0].mobile);
            Formik.setFieldValue("correo", this.state.customerData[0].email);
          } else {
            this.setState({
              modal: true,
              message: "Usted no esta autorizado para ver esta información",
            });
          }
          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              modal: true,
              message: "Sesión expirada, porfavor vuelva a iniciar sesión",
              isLoading: false,
            });
          } else {
            this.setState({
              modal: true,
              message:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

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

        this.setState({
          serviceData: data,
        });
        console.log(data);
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

  handleDateChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "fechaDisponible") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("horarioDisponible", "", true);
      this.handleGetAvailableScheduleService(value);
    }
  };

  handleInfoSubmit = (reserveModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/registerReservation`;

    const rspApi = axios
      .post(linkRegisterApi, reserveModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;
        localStorage.setItem("data", JSON.stringify(data));

        if (data.response === "true") {
          setTimeout(() => {
            this.setState({
              modal: true,
              message: "¡Registro grabado satisfactoriamente!",
              response: true,
              isLoading: false,
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
          isLoading: false,
          forceRedirect: true,
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
    } else if (this.state.forceRedirect === true) {
      this.props.history.goBack();
    } else {
      this.props.history.push("/login/C");
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
              Rechazar
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
                checkbox: false,
              }}
              validate={(values) => {
                const { checkbox } = values;
                let errors = {};

                if (checkbox === false) {
                  errors.checkbox = "Debes aceptar los términos y condiciones";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const reserveModel = {
                  idService: "",
                  reservationDate: "",
                  reservationTime: "",
                };

                reserveModel.idService = JSON.parse(this.props.match.params.id);
                reserveModel.reservationDate = values.fechaDisponible;
                reserveModel.reservationTime = values.horarioDisponible;

                this.setState({
                  isLoading: true,
                });

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
                    <div className="txt-left">
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
                        disabled={true}
                        style={{ marginBottom: "5px" }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right">
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
                        disabled={true}
                        style={{
                          marginBottom: "5px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                  </div>

                  <div className="files">
                    <div className="txt-left">
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

                    <div className="txt-right">
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
                    <div className="txt-left">
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
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <div className="txt-right">
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

export default ReserveAppointment;

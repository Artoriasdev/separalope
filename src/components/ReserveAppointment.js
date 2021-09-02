import {
  Backdrop,
  Button,
  Fade,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";

class ReserveAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: [],
      serviceData: [],
      dateData: [],
      modal: false,
      response: false,
      message: "",
    };
  }

  componentDidMount() {
    try {
      this.handleGetCustomer();
      this.handleGetServicesById();
      this.handleGetAvailableDateService();
      this.handleGetAvailableScheduleService();
    } catch (error) {
      console.log(error);
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

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/getCustomer";

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
            this.setState({
              modal: true,
              message: "Sesión expirada, porfavor vuelva a iniciar sesión",
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
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServicesById/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

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
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/getAvailableDateService/${id}`;

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
      });
    return rspApi;
  };

  handleGetAvailableScheduleService = () => {
    const id = this.props.match.params.id;
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/getAvailableScheduleService/${id}/2021-09-06`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          hourData: data,
        });
        // console.log(data);

        return response;
      });
    return rspApi;
  };

  handleInfoSubmit = (reserveModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/registerReservation";

    const rspApi = axios
      .post(linkRegisterApi, reserveModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;

        if (data.response === "false") {
          this.setState({
            modal: true,
            message: data.message,
          });
        }
        return response;
      });

    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/customer-appointment");
    }
  };

  render() {
    return (
      <div>
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
        <div
          className="page-container"
          style={{ width: "500px", marginTop: "50px" }}
        >
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
            }}
            validate={{}}
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

              (async () => {
                const responseSubmit = await this.handleInfoSubmit(
                  reserveModel
                );

                const { response } = responseSubmit.data;

                if (response === "true") {
                  this.setState({
                    modal: true,
                    message: "¡Registro grabado satisfactoriamente!",
                    response: true,
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
              <form name="formRegister" onSubmit={handleSubmit}>
                <div className="files">
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
                    name="duracion"
                    type="text"
                    className="TxtField"
                    variant="outlined"
                    label="Duración de la clase"
                    fullWidth
                    value={values.duracion}
                    error={errors.duracion && touched.duracion}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={true}
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
                    disabled={true}
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

                  <Select
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    variant="outlined"
                    value={values.fechaDisponible}
                    error={errors.fechaDisponible && touched.fechaDisponible}
                    name="fechaDisponible"
                    displayEmpty
                    required
                    onChange={handleChange}
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
                    {this.state.hourData &&
                      this.state.hourData.map(({ keyTime, valueTime }) => (
                        <MenuItem key={keyTime} value={keyTime}>
                          {valueTime}
                        </MenuItem>
                      ))}
                  </Select>
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

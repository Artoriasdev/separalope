import {
  Button,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Backdrop,
  Fade,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";
import FullPageLoader from "../components/FullPageLoader";

class ServiceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      horas: [],
      horarios: [],
      service: [],
      err: {},
      title: "",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
      scheduleAttention: {},
      disable: false,
      modal: false,
      response: false,
      message: "",
      deleteService: false,
      deleted: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") === "B") {
      try {
        this.handleGetCategorys();
        this.handleGetHours();
        this.handleGetAttention();
        this.handleGetServiceForEdit();
      } catch (e) {
        console.log(e);
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/category/getCategories`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          categorias: data,
        });

        return response;
      });
    return rspApi;
  };

  handleGetHours = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getHoursDurationService`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          horas: data,
        });

        return response;
      });
    return rspApi;
  };
  handleGetAttention = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getHoursAttentionService`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          horarios: data,
        });

        return response;
      });
    return rspApi;
  };

  handleGetServiceForEdit = () => {
    const tk = sessionStorage.getItem("tk");
    const id = this.props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServiceForEdit/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        const Formik = this.form;

        this.setState({
          service: data,
          title: data[0].title,
        });
        Formik.setFieldValue("categoria", this.state.service[0].idCategory);
        Formik.setFieldValue("servicio", this.state.service[0].title);
        Formik.setFieldValue("descripcion", this.state.service[0].description);
        Formik.setFieldValue("hora", this.state.service[0].duration);
        Formik.setFieldValue("precio", this.state.service[0].price);
        if (
          this.state.service[0].scheduleAttention.mondayStartTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.lunesHoraInicio",
            this.state.service[0].scheduleAttention.mondayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.mondayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.lunesHoraFinal",
            this.state.service[0].scheduleAttention.mondayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.tuesdayStartTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.martesHoraInicio",
            this.state.service[0].scheduleAttention.tuesdayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.tuesdayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.martesHoraFinal",
            this.state.service[0].scheduleAttention.tuesdayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.wednesdayStartTime !==
          undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.miercolesHoraInicio",
            this.state.service[0].scheduleAttention.wednesdayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.wednesdayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.miercolesHoraFinal",
            this.state.service[0].scheduleAttention.wednesdayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.thursdayStartTime !==
          undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.juevesHoraInicio",
            this.state.service[0].scheduleAttention.thursdayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.thursdayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.juevesHoraFinal",
            this.state.service[0].scheduleAttention.thursdayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.fridayStartTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.viernesHoraInicio",
            this.state.service[0].scheduleAttention.fridayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.fridayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.viernesHoraFinal",
            this.state.service[0].scheduleAttention.fridayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.saturdayStartTime !==
          undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.sabadoHoraInicio",
            this.state.service[0].scheduleAttention.saturdayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.saturdayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.sabadoHoraFinal",
            this.state.service[0].scheduleAttention.saturdayEndTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.sundayStartTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.domingoHoraInicio",
            this.state.service[0].scheduleAttention.sundayStartTime
          );
        }
        if (
          this.state.service[0].scheduleAttention.sundayEndTime !== undefined
        ) {
          Formik.setFieldValue(
            "horarioAtencion.domingoHoraFinal",
            this.state.service[0].scheduleAttention.sundayEndTime
          );
        }

        console.log(this.state.service);

        return response;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 401) {
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
        }
      });
    return rspApi;
  };

  handleEdit = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/service/editService`;

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        this.setState({
          isLoading: true,
        });

        if (response.data.response === "true") {
          this.setState({
            modal: true,
            message: response.data.message,
            response: true,
            isLoading: false,
          });
        }
        return response;
      });

    return rspApi;
  };

  handleRedirectService = () => {
    this.props.history.push(
      `/business/services/details/${this.props.match.params.id}/${this.props.match.params.value}/${this.props.match.params.category}`
    );
  };

  handleRedirectAppointment = () => {
    this.props.history.push(
      `/business/services/appointment/${this.props.match.params.id}/${this.props.match.params.value}/${this.props.match.params.category}`
    );
  };

  handleDeleteService = () => {
    setTimeout(() => {
      const tk = sessionStorage.getItem("tk");
      console.log("consume service");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/deleteService/${this.props.match.params.id}`;

      const rspApi = axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            this.setState({
              modal: true,
              message: response.data.message,
              deleteService: false,
              deleted: true,
            });
          } else if (response.data.response === "false") {
            this.setState({
              modal: true,
              message: response.data.message,
              deleteService: false,
            });
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            modal: true,
            message: "Ha ocurrido un error",
            deleteService: false,
          });
        });
      return rspApi;
    }, 1000);
  };

  handleClose = (key) => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.go();
    } else if (key === 1) {
      this.handleDeleteService();
    } else if (key === 2) {
      this.setState({ deleteService: false });
    } else if (this.state.deleted === true) {
      if (this.props.match.params.value === "1") {
        this.props.history.push("/business/services");
      } else if (this.props.match.params.value === "2") {
        this.props.history.push(
          `/business/services-category/${this.props.match.params.category}`
        );
      }
    } else {
      this.props.history.push("/");
      this.props.history.go();
    }
  };

  handleClick = () => {
    if (this.props.match.params.value === "1") {
      this.props.history.push("/business/services");
    } else if (this.props.match.params.value === "2") {
      this.props.history.push(
        `/business/services-category/${this.props.match.params.category}`
      );
    }
  };
  handleRedirect = () => {
    this.props.history.push(`/reserve/invited/${this.props.match.params.id}`);
  };
  handleDelete = () => {
    this.setState({
      modal: true,
      message: "¿Desea borrar el servicio actual?",
      deleteService: true,
    });
  };

  handleHour = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "horarioAtencion.lunesHoraFinal") {
      const { lunesHoraInicio } = formik.state.values.horarioAtencion;
      if (value > lunesHoraInicio) {
        this.setState({
          err: {},
          lunes: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.martesHoraFinal") {
      const { martesHoraInicio } = formik.state.values.horarioAtencion;
      if (value > martesHoraInicio) {
        this.setState({
          err: {},
          martes: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.miercolesHoraFinal") {
      const { miercolesHoraInicio } = formik.state.values.horarioAtencion;
      if (value > miercolesHoraInicio) {
        this.setState({
          err: {},
          miercoles: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.juevesHoraFinal") {
      const { juevesHoraInicio } = formik.state.values.horarioAtencion;
      if (value > juevesHoraInicio) {
        this.setState({
          err: {},
          jueves: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.viernesHoraFinal") {
      const { viernesHoraInicio } = formik.state.values.horarioAtencion;
      if (value > viernesHoraInicio) {
        this.setState({
          err: {},
          viernes: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.sabadoHoraFinal") {
      const { sabadoHoraInicio } = formik.state.values.horarioAtencion;
      if (value > sabadoHoraInicio) {
        this.setState({
          err: {},
          sabado: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.domingoHoraFinal") {
      const { domingoHoraInicio } = formik.state.values.horarioAtencion;
      if (value > domingoHoraInicio) {
        this.setState({
          err: {},
          domingo: false,
        });
      }
      formik.setFieldValue(formField, value, true);
    }
  };

  handlePrice = (e) => {
    let val = e.target.value;
    const formField = e.target.name;
    const formik = this.form;
    console.log(val);
    if (val.startsWith(" ")) {
      formik.setFieldValue(formField, "", true);
    } else if (isNaN(val)) {
      formik.setFieldValue(formField, "", true);
    } else {
      // is A Number
      val = val >= 0 ? val : "";
      formik.setFieldValue(formField, val, true);
    }
  };

  render() {
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
              {this.state.deleteService ? (
                <>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    onClick={() => this.handleClose(1)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    onClick={() => this.handleClose(2)}
                  >
                    Rechazar
                  </Button>
                </>
              ) : (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  onClick={() => this.handleClose(3)}
                >
                  Aceptar
                </Button>
              )}
            </div>
          </Fade>
        </Modal>
        <div className="page-container" style={{ padding: "0", width: "100%" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="medium" />}
            aria-label="breadcrumb"
            className="font"
            style={{ marginLeft: "50px" }}
          >
            <Link href="/" color="textPrimary">
              Inicio
            </Link>
            <Link
              color="textPrimary"
              onClick={this.handleClick}
              style={{ cursor: "pointer" }}
            >
              Mis Servicios
            </Link>
            <Link color="textSecondary">{this.state.title}</Link>
          </Breadcrumbs>
          <div className="header-profile-container">
            <div className="header-profile">
              <div className="button-container">
                <div>
                  <button
                    onClick={this.handleRedirectService}
                    className="button_ref"
                    style={{ textDecoration: "none" }}
                  >
                    Detalles servicios
                  </button>
                </div>
                <div className="button">
                  <button
                    onClick={this.handleRedirectAppointment}
                    className="button_ref"
                    style={{ textDecoration: "none" }}
                  >
                    Citas agendadas
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="service-detail-container">
            <div className="tittle">
              <h1>Detalles</h1>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                className="btn-primary"
                onClick={this.handleRedirect}
              >
                Agregar cita
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                className="btn-primary"
                onClick={this.handleDelete}
              >
                Eliminar servicio
              </Button>
            </div>

            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                categoria: "",
                servicio: "",
                descripcion: "",
                hora: "",
                precio: "",
                horarioAtencion: {
                  lunesHoraInicio: "",
                  lunesHoraFinal: "",
                  martesHoraInicio: "",
                  martesHoraFinal: "",
                  miercolesHoraInicio: "",
                  miercolesHoraFinal: "",
                  juevesHoraInicio: "",
                  juevesHoraFinal: "",
                  viernesHoraInicio: "",
                  viernesHoraFinal: "",
                  sabadoHoraInicio: "",
                  sabadoHoraFinal: "",
                  domingoHoraInicio: "",
                  domingoHoraFinal: "",
                },
              }}
              validate={(values) => {
                const { horarioAtencion } = values;

                let errors = {};

                if (
                  horarioAtencion.lunesHoraFinal.length <
                  horarioAtencion.lunesHoraInicio.length
                ) {
                  errors.horarioAtencion =
                    "Horario final no menor al horario inicial";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const formModel = {
                  idService: this.props.match.params.id,
                  idCategory: "",
                  title: "",
                  description: "",
                  price: "",
                  duration: "",
                  scheduleAttention: {
                    mondayStartTime: "",
                    mondayEndTime: "",
                    tuesdayStartTime: "",
                    tuesdayEndTime: "",
                    wednesdayStartTime: "",
                    wednesdayEndTime: "",
                    thursdayStartTime: "",
                    thursdayEndTime: "",
                    fridayStartTime: "",
                    fridayEndTime: "",
                    saturdayStartTime: "",
                    saturdayEndTime: "",
                    sundayStartTime: "",
                    sundayEndTime: "",
                  },
                };

                formModel.title = values.servicio;
                formModel.description = values.descripcion;
                formModel.duration = values.hora;
                formModel.price = values.precio;
                formModel.idCategory = values.categoria;

                formModel.scheduleAttention.mondayStartTime =
                  values.horarioAtencion.lunesHoraInicio;
                formModel.scheduleAttention.mondayEndTime =
                  values.horarioAtencion.lunesHoraFinal;
                formModel.scheduleAttention.tuesdayStartTime =
                  values.horarioAtencion.martesHoraInicio;
                formModel.scheduleAttention.tuesdayEndTime =
                  values.horarioAtencion.martesHoraFinal;
                formModel.scheduleAttention.wednesdayStartTime =
                  values.horarioAtencion.miercolesHoraInicio;
                formModel.scheduleAttention.wednesdayEndTime =
                  values.horarioAtencion.miercolesHoraFinal;
                formModel.scheduleAttention.thursdayStartTime =
                  values.horarioAtencion.juevesHoraInicio;
                formModel.scheduleAttention.thursdayEndTime =
                  values.horarioAtencion.juevesHoraFinal;
                formModel.scheduleAttention.fridayStartTime =
                  values.horarioAtencion.viernesHoraInicio;
                formModel.scheduleAttention.fridayEndTime =
                  values.horarioAtencion.viernesHoraFinal;
                formModel.scheduleAttention.saturdayStartTime =
                  values.horarioAtencion.sabadoHoraInicio;
                formModel.scheduleAttention.saturdayEndTime =
                  values.horarioAtencion.sabadoHoraFinal;
                formModel.scheduleAttention.sundayStartTime =
                  values.horarioAtencion.domingoHoraInicio;
                formModel.scheduleAttention.sundayEndTime =
                  values.horarioAtencion.domingoHoraFinal;

                if (
                  formModel.scheduleAttention.mondayStartTime === undefined ||
                  formModel.scheduleAttention.mondayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.mondayStartTime;
                  delete formModel.scheduleAttention.mondayEndTime;
                }
                if (
                  formModel.scheduleAttention.tuesdayStartTime === undefined ||
                  formModel.scheduleAttention.tuesdayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.tuesdayStartTime;
                  delete formModel.scheduleAttention.tuesdayEndTime;
                }
                if (
                  formModel.scheduleAttention.wednesdayStartTime ===
                    undefined ||
                  formModel.scheduleAttention.wednesdayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.wednesdayStartTime;
                  delete formModel.scheduleAttention.wednesdayEndTime;
                }
                if (
                  formModel.scheduleAttention.thursdayStartTime === undefined ||
                  formModel.scheduleAttention.thursdayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.thursdayStartTime;
                  delete formModel.scheduleAttention.thursdayEndTime;
                }
                if (
                  formModel.scheduleAttention.fridayStartTime === undefined ||
                  formModel.scheduleAttention.fridayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.fridayStartTime;
                  delete formModel.scheduleAttention.fridayEndTime;
                }
                if (
                  formModel.scheduleAttention.saturdayStartTime === undefined ||
                  formModel.scheduleAttention.saturdayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.saturdayStartTime;
                  delete formModel.scheduleAttention.saturdayEndTime;
                }
                if (
                  formModel.scheduleAttention.sundayStartTime === undefined ||
                  formModel.scheduleAttention.sundayStartTime === ""
                ) {
                  delete formModel.scheduleAttention.sundayStartTime;
                  delete formModel.scheduleAttention.sundayEndTime;
                }

                if (
                  formModel.scheduleAttention.mondayStartTime >
                  formModel.scheduleAttention.mondayEndTime
                ) {
                  this.setState({
                    err: {
                      lunes:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: true,
                    martes: false,
                    miercoles: false,
                    jueves: false,
                    viernes: false,
                    sabado: false,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.tuesdayStartTime >
                  formModel.scheduleAttention.tuesdayEndTime
                ) {
                  this.setState({
                    err: {
                      martes:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: true,
                    miercoles: false,
                    jueves: false,
                    viernes: false,
                    sabado: false,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.wednesdayStartTime >
                  formModel.scheduleAttention.wednesdayEndTime
                ) {
                  this.setState({
                    err: {
                      miercoles:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: false,
                    miercoles: true,
                    jueves: false,
                    viernes: false,
                    sabado: false,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.thursdayStartTime >
                  formModel.scheduleAttention.thursdayEndTime
                ) {
                  this.setState({
                    err: {
                      jueves:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: false,
                    miercoles: false,
                    jueves: true,
                    viernes: false,
                    sabado: false,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.fridayStartTime >
                  formModel.scheduleAttention.fridayEndTime
                ) {
                  this.setState({
                    err: {
                      viernes:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: false,
                    miercoles: false,
                    jueves: false,
                    viernes: true,
                    sabado: false,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.saturdayStartTime >
                  formModel.scheduleAttention.saturdayEndTime
                ) {
                  this.setState({
                    err: {
                      sabado:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: false,
                    miercoles: false,
                    jueves: false,
                    viernes: false,
                    sabado: true,
                    domingo: false,
                  });
                } else if (
                  formModel.scheduleAttention.sundayStartTime >
                  formModel.scheduleAttention.sundayEndTime
                ) {
                  this.setState({
                    err: {
                      domingo:
                        "El horario final no debe ser menor al horario inicial",
                    },
                    lunes: false,
                    martes: false,
                    miercoles: false,
                    jueves: false,
                    viernes: false,
                    sabado: false,
                    domingo: true,
                  });
                } else {
                  console.log(formModel);
                  console.log(this.state.err);
                  this.setState({
                    err: {},
                    lunes: false,
                    martes: false,
                    miercoles: false,
                    jueves: false,
                    viernes: false,
                    sabado: false,
                    domingo: false,
                  });
                  (async () => {
                    await this.handleEdit(formModel);
                  })();
                }
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
                <form name="formSubmit" onSubmit={handleSubmit}>
                  <div>
                    <div className="files">
                      <Select
                        value={values.categoria}
                        error={errors.categoria && touched.categoria}
                        name="categoria"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        variant="outlined"
                        fullWidth
                        style={{
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                        displayEmpty
                      >
                        <MenuItem disabled value={""}>
                          Categoría
                        </MenuItem>
                        {this.state.categorias &&
                          this.state.categorias.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                              {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                    <div className="files">
                      <div className="txt-left">
                        <TextField
                          name="servicio"
                          className="TxtField"
                          variant="outlined"
                          required
                          fullWidth
                          placeholder="Servicio"
                          value={values.servicio}
                          error={errors.servicio && touched.servicio}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // inputProps={{
                          //   maxLength: 9,
                          // }}
                          onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                        />
                      </div>
                      <div className="txt-right">
                        <Select
                          value={values.hora}
                          error={errors.hora && touched.hora}
                          name="hora"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          fullWidth
                          variant="outlined"
                          displayEmpty
                        >
                          <MenuItem disabled value={""}>
                            Duración
                          </MenuItem>
                          {this.state.horas &&
                            this.state.horas.map(({ id, value }) => (
                              <MenuItem key={id} value={id}>
                                {value}
                              </MenuItem>
                            ))}
                        </Select>
                      </div>
                    </div>
                    <div className="files">
                      <div className="txt-left">
                        <TextField
                          name="descripcion"
                          className="TxtField"
                          variant="outlined"
                          fullWidth
                          required
                          placeholder="Descripción"
                          value={values.descripcion}
                          error={errors.descripcion && touched.descripcion}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          minRows={4}
                          maxRows={5}
                          inputProps={{
                            maxLength: 255,
                          }}
                          onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                        />
                      </div>
                      <div className="txt-right">
                        <TextField
                          name="precio"
                          type="text"
                          className="TxtField"
                          variant="outlined"
                          fullWidth
                          required
                          placeholder="Precio"
                          value={values.precio}
                          error={errors.precio && touched.precio}
                          onBlur={handleBlur}
                          onChange={this.handlePrice}
                          onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                        />
                      </div>
                    </div>
                    <TableContainer
                      style={{
                        width: "100%",
                        borderRadius: "10px 10px",
                        margin: "10px 0",
                      }}
                    >
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead
                          style={{
                            background: "#f3f3f3",
                          }}
                        >
                          <TableRow>
                            <TableCell className="font-tittle">Día</TableCell>
                            <TableCell
                              className="font-tittle"
                              style={{ textAlign: "center" }}
                            >
                              Inicio
                            </TableCell>
                            <TableCell
                              className="font-tittle"
                              style={{ textAlign: "center" }}
                            >
                              Fin
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font">Lunes</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.lunesHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.lunesHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                displayEmpty
                                variant="outlined"
                                fullWidth
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>

                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.lunesHoraFinal}
                                error={this.state.lunes}
                                name="horarioAtencion.lunesHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.lunes ? (
                            <div className="error-table">
                              {this.state.err.lunes}
                            </div>
                          ) : null}
                          <TableRow>
                            <TableCell className="font">Martes</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.martesHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.martesHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.martesHoraFinal}
                                error={this.state.martes}
                                name="horarioAtencion.martesHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.martes ? (
                            <div className="error-table">
                              {this.state.err.martes}
                            </div>
                          ) : null}

                          <TableRow>
                            <TableCell className="font">Miércoles</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={
                                  values.horarioAtencion.miercolesHoraInicio
                                }
                                error={errors.horarioAtencion}
                                name="horarioAtencion.miercolesHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={
                                  values.horarioAtencion.miercolesHoraFinal
                                }
                                error={this.state.miercoles}
                                name="horarioAtencion.miercolesHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.miercoles ? (
                            <div className="error-table">
                              {this.state.err.miercoles}
                            </div>
                          ) : null}
                          <TableRow>
                            <TableCell className="font">Jueves</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.juevesHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.juevesHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.juevesHoraFinal}
                                error={this.state.jueves}
                                name="horarioAtencion.juevesHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.jueves ? (
                            <div className="error-table">
                              {this.state.err.jueves}
                            </div>
                          ) : null}
                          <TableRow>
                            <TableCell className="font">Viernes</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.viernesHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.viernesHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.viernesHoraFinal}
                                error={this.state.viernes}
                                name="horarioAtencion.viernesHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.viernes ? (
                            <div className="error-table">
                              {this.state.err.viernes}
                            </div>
                          ) : null}
                          <TableRow>
                            <TableCell className="font">Sábado</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.sabadoHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.sabadoHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.sabadoHoraFinal}
                                error={this.state.sabado}
                                name="horarioAtencion.sabadoHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.sabado ? (
                            <div className="error-table">
                              {this.state.err.sabado}
                            </div>
                          ) : null}
                          <TableRow>
                            <TableCell className="font">Domingo</TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.domingoHoraInicio}
                                error={errors.horarioAtencion}
                                name="horarioAtencion.domingoHoraInicio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              <Select
                                value={values.horarioAtencion.domingoHoraFinal}
                                error={this.state.domingo}
                                name="horarioAtencion.domingoHoraFinal"
                                onChange={this.handleHour}
                                onBlur={handleBlur}
                                variant="outlined"
                                fullWidth
                                displayEmpty
                              >
                                <MenuItem value="">Seleccione</MenuItem>
                                {this.state.horarios &&
                                  this.state.horarios.map(({ id, value }) => (
                                    <MenuItem key={id} value={id}>
                                      {value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </TableCell>
                          </TableRow>
                          {this.state.domingo ? (
                            <div className="error-table">
                              {this.state.err.domingo}
                            </div>
                          ) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    >
                      Editar servicio
                    </Button>
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

export default ServiceDetail;

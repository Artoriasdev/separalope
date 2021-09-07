import {
  Button,
  FormControl,
  InputLabel,
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
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";

class ServiceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      horas: [],
      horarios: [],
      service: [],
      err: {},
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
    };
  }

  componentDidMount() {
    try {
      this.handleGetCategorys();
      this.handleGetHours();
      this.handleGetAttention();
      this.handleGetServiceForEdit();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

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

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getHoursDurationService";

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

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getHoursAttentionService";

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

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServiceForEdit/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        const Formik = this.form;

        this.setState({
          service: data,
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
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/editService";

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.response === "true") {
          this.setState({
            modal: true,
            message: response.data.message,
            response: true,
          });
        }
        return response;
      });

    return rspApi;
  };

  handleRedirectService = () => {
    this.props.history.push(
      `/business/services/details/${this.props.match.params.id}`
    );
  };

  handleRedirectAppointment = () => {
    this.props.history.push(
      `/business/services/appointment/${this.props.match.params.id}`
    );
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.go();
    }
  };

  render() {
    return (
      <>
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
        <div className="page-container" style={{ padding: "0", width: "100%" }}>
          <div className="header-profile-container">
            <div className="header-profile">
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

          <div style={{ width: "50%", margin: "3% auto" }}>
            <h1>Detalles</h1>

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
              validate={{}}
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        "El horario inicial no debe ser mayor al horario final",
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
                        error={this.state.martes.categoria && touched.categoria}
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
                      <TextField
                        name="servicio"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Servicio"
                        value={values.servicio}
                        error={this.state.martes.servicio && touched.servicio}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <Select
                        value={values.hora}
                        error={this.state.martes.hora && touched.hora}
                        name="hora"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        variant="outlined"
                        fullWidth
                        style={{
                          marginLeft: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
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
                    <div className="files">
                      <TextField
                        name="descripcion"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Descripción"
                        value={values.descripcion}
                        error={
                          this.state.martes.descripcion && touched.descripcion
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                        multiline
                        minRows={4}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />

                      <TextField
                        name="precio"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Precio"
                        value={values.precio}
                        error={this.state.martes.precio && touched.precio}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{
                          marginLeft: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                        // inputProps={{
                        //   maxLength: 9,
                        // }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
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
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.lunesHoraInicio}
                                error={this.state.lunes}
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
                              {this.state.lunes ? (
                                <div className="error">
                                  {this.state.err.lunes}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.lunesHoraFinal}
                                error={this.state.lunes}
                                name="horarioAtencion.lunesHoraFinal"
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
                              {this.state.lunes ? (
                                <div className="error">
                                  {this.state.err.lunes}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Martes</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.martesHoraInicio}
                                error={this.state.martes}
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
                              {this.state.martes ? (
                                <div className="error">
                                  {this.state.err.martes}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.martesHoraFinal}
                                error={this.state.martes}
                                name="horarioAtencion.martesHoraFinal"
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
                              {this.state.martes ? (
                                <div className="error">
                                  {this.state.err.martes}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Miércoles</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={
                                  values.horarioAtencion.miercolesHoraInicio
                                }
                                error={this.state.miercoles}
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
                              {this.state.miercoles ? (
                                <div className="error">
                                  {this.state.err.miercoles}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={
                                  values.horarioAtencion.miercolesHoraFinal
                                }
                                error={this.state.miercoles}
                                name="horarioAtencion.miercolesHoraFinal"
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
                              {this.state.miercoles ? (
                                <div className="error">
                                  {this.state.err.miercoles}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Jueves</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.juevesHoraInicio}
                                error={this.state.jueves}
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
                              {this.state.jueves ? (
                                <div className="error">
                                  {this.state.err.jueves}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.juevesHoraFinal}
                                error={this.state.jueves}
                                name="horarioAtencion.juevesHoraFinal"
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
                              {this.state.jueves ? (
                                <div className="error">
                                  {this.state.err.jueves}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Viernes</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.viernesHoraInicio}
                                error={this.state.viernes}
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
                              {this.state.viernes ? (
                                <div className="error">
                                  {this.state.err.viernes}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.viernesHoraFinal}
                                error={this.state.viernes}
                                name="horarioAtencion.viernesHoraFinal"
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
                              {this.state.viernes ? (
                                <div className="error">
                                  {this.state.err.viernes}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Sábado</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.sabadoHoraInicio}
                                error={this.state.sabado}
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

                              {this.state.sabado ? (
                                <div className="error">
                                  {this.state.err.sabado}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.sabadoHoraFinal}
                                error={this.state.sabado}
                                name="horarioAtencion.sabadoHoraFinal"
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
                              {this.state.sabado ? (
                                <div className="error">
                                  {this.state.err.sabado}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Domingo</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.domingoHoraInicio}
                                error={this.state.domingo}
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
                              {this.state.domingo ? (
                                <div className="error">
                                  {this.state.err.domingo}
                                </div>
                              ) : null}
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <Select
                                value={values.horarioAtencion.domingoHoraFinal}
                                error={this.state.domingo}
                                name="horarioAtencion.domingoHoraFinal"
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
                              {this.state.domingo ? (
                                <div className="error">
                                  {this.state.err.domingo}
                                </div>
                              ) : null}
                            </TableCell>
                          </TableRow>
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

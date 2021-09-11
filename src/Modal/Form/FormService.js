import { Formik } from "formik";
import React, { Component } from "react";
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
import { handleRegexDisable } from "../../utils/utilitaries";
import axios from "axios";

// import Container from "../Container/ContainerService";

export class FormService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      horas: [],
      horarios: [],
      err: {},
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
      disable: false,
      modal: false,
      response: false,
      message: "",
    };
  }

  componentDidMount() {
    const value = this.props.value;
    if (value !== undefined) {
      const Formik = this.form;
      Formik.setFieldValue("categoria", value);
      this.setState({
        disable: true,
      });
    }
    try {
      this.handleGetCategorys();
      this.handleGetHours();
      this.handleGetAttention();
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

  handleSubmitting = async (formModel) => {
    console.log(formModel);
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/registerService";

    const rspApi = axios
      .post(linkRegisterApi, formModel, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.response === "true") {
          this.setState({
            modal: true,
            response: true,
            message: data.message,
          });
        } else if (data.response === "false") {
          this.setState({
            modal: true,

            message: data.message,
          });
        }
        return response;
      })
      .catch((error) => {
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
          });
        }
      });

    return rspApi;
    //
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.history.go();
      this.props.close();
    } else {
      this.props.history.push("/");
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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const formModel = {
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
              formModel.scheduleAttention.wednesdayStartTime === undefined ||
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
                await this.handleSubmitting(formModel);
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
                    disabled={this.state.disable}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                    displayEmpty
                    required
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
                    error={errors.servicio && touched.servicio}
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
                    error={errors.hora && touched.hora}
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
                <div className="files">
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
                    error={errors.precio && touched.precio}
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
                    onInput={handleRegexDisable("[0-9.]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <TableContainer
                  style={{
                    width: "99.9%",
                    borderRadius: "10px 10px",
                    margin: "10px 0",
                  }}
                  className="modal-table"
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
                      </TableRow>
                      {this.state.lunes ? (
                        <div className="error-table" style={{ width: "100%" }}>
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
                      </TableRow>
                      {this.state.martes ? (
                        <div className="error-table" style={{ width: "100%" }}>
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
                            value={values.horarioAtencion.miercolesHoraInicio}
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
                            value={values.horarioAtencion.miercolesHoraFinal}
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
                  Crear servicio
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

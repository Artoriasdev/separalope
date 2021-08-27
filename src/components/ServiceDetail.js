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

  handleRedirectService = () => {
    this.props.history.push("/business/services/details");
  };

  handleRedirectAppointment = () => {
    this.props.history.push("/business/services/appointment");
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
                horariosAtencion: {
                  LunesHoraInicio: "",
                  LunesHoraFinal: "",
                  MartesHoraInicio: "",
                  MartesHoraFinal: "",
                  MiercolesHoraInicio: "",
                  MiercolesHoraFinal: "",
                  JuevesHoraInicio: "",
                  JuevesHoraFinal: "",
                  ViernesHoraInicio: "",
                  ViernesHoraFinal: "",
                  SabadoHoraInicio: "",
                  SabadoHoraFinal: "",
                  DomingoHoraInicio: "",
                  DomingoHoraFinal: "",
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
                  values.horariosAtencion.LunesHoraInicio;
                formModel.scheduleAttention.mondayEndTime =
                  values.horariosAtencion.LunesHoraFinal;
                formModel.scheduleAttention.tuesdayStartTime =
                  values.horariosAtencion.MartesHoraInicio;
                formModel.scheduleAttention.tuesdayEndTime =
                  values.horariosAtencion.MartesHoraFinal;
                formModel.scheduleAttention.wednesdayStartTime =
                  values.horariosAtencion.MiercolesHoraInicio;
                formModel.scheduleAttention.wednesdayEndTime =
                  values.horariosAtencion.MiercolesHoraFinal;
                formModel.scheduleAttention.thursdayStartTime =
                  values.horariosAtencion.JuevesHoraInicio;
                formModel.scheduleAttention.thursdayEndTime =
                  values.horariosAtencion.JuevesHoraFinal;
                formModel.scheduleAttention.fridayStartTime =
                  values.horariosAtencion.ViernesHoraInicio;
                formModel.scheduleAttention.fridayEndTime =
                  values.horariosAtencion.ViernesHoraFinal;
                formModel.scheduleAttention.saturdayStartTime =
                  values.horariosAtencion.SabadoHoraInicio;
                formModel.scheduleAttention.saturdayEndTime =
                  values.horariosAtencion.SabadoHoraFinal;
                formModel.scheduleAttention.sundayStartTime =
                  values.horariosAtencion.DomingoHoraInicio;
                formModel.scheduleAttention.sundayEndTime =
                  values.horariosAtencion.DomingoHoraFinal;

                this.handleSubmitting(formModel);
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
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      >
                        <InputLabel id="categoria">Categoria</InputLabel>
                        <Select
                          labelId="categoria"
                          label="Categoria"
                          value={values.categoria}
                          error={errors.categoria && touched.categoria}
                          name="categoria"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        >
                          {this.state.categorias &&
                            this.state.categorias.map(({ id, name }) => (
                              <MenuItem key={id} value={id}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="files">
                      <TextField
                        name="servicio"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        label="Servicio"
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

                      <TextField
                        name="descripcion"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        label="Descripcion"
                        value={values.descripcion}
                        error={errors.descripcion && touched.descripcion}
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
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <div className="files">
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      >
                        <InputLabel id="hora">Horas</InputLabel>
                        <Select
                          labelId="hora"
                          label="Horas"
                          value={values.hora}
                          error={errors.hora && touched.hora}
                          name="hora"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        >
                          {this.state.horas &&
                            this.state.horas.map(({ id, value }) => (
                              <MenuItem key={id} value={id}>
                                {value}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <TextField
                        name="precio"
                        className="TxtField"
                        variant="outlined"
                        fullWidth
                        required
                        label="Precio"
                        type="number"
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
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
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
                            <TableCell className="font-tittle">Dia</TableCell>
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
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.LunesHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.LunesHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={values.horariosAtencion.LunesHoraFinal}
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.LunesHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Martes</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.MartesHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.MartesHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.MartesHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.MartesHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Miercoles</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.MiercolesHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.MiercolesHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.MiercolesHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.MiercolesHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Jueves</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.JuevesHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.JuevesHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.JuevesHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.JuevesHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Viernes</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.ViernesHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.ViernesHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.ViernesHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.ViernesHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Sabado</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.SabadoHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.SabadoHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.SabadoHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.SabadoHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font">Domingo</TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="inicio">Inicio</InputLabel>
                                <Select
                                  labelId="inicio"
                                  label="Inicio"
                                  value={
                                    values.horariosAtencion.DomingoHoraInicio
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.DomingoHoraInicio"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className="font"
                              style={{ textAlign: "center" }}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel id="fin">Fin</InputLabel>
                                <Select
                                  labelId="fin"
                                  label="Fin"
                                  value={
                                    values.horariosAtencion.DomingoHoraFinal
                                  }
                                  error={
                                    errors.horariosAtencion &&
                                    touched.horariosAtencion
                                  }
                                  name="horariosAtencion.DomingoHoraFinal"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.horarios &&
                                    this.state.horarios.map(({ id, value }) => (
                                      <MenuItem key={id} value={id}>
                                        {value}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className="files">
                    {/* <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="btn-primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    Crear servicio
                  </Button> */}
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

import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

import React from "react";
import { Component } from "react";
import { handleRegexDisable } from "../utils/utilitaries";

class ServiceDetail extends Component {
  createData(name) {
    return { name };
  }

  rows = [
    this.createData("Lunes"),
    this.createData("Martes"),
    this.createData("Miercoles"),
    this.createData("Jueves"),
    this.createData("Viernes"),
    this.createData("Sabado"),
    this.createData("Domingo"),
  ];

  handleRedirectService = () => {
    this.props.history.push("/business/services/details");
  };

  handleRedirectAppointment = () => {
    this.props.history.push("/business/services/appointment");
  };

  render() {
    return (
      <div style={{ margin: "40px 0" }}>
        <div
          className="header_container"
          style={{
            width: "200px",
            textAlign: "center",
            marginLeft: "5%",
            marginTop: "100px",
          }}
        >
          <div>
            <div>
              <button
                onClick={this.handleRedirectService}
                className="button_ref"
                style={{ textDecoration: "none" }}
              >
                Detalles servicios
              </button>
            </div>
            <div style={{ marginTop: "20px" }}>
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

        <div style={{ width: "50%", margin: "-250px auto" }}>
          <h1>Detalles</h1>
          <div style={{ display: "flex" }}>
            <Avatar
              alt="gatitos"
              src="https://cf.ltkcdn.net/gatos/images/std/236641-800x515r1-etapas-desarrollo-gatitos.jpg"
              style={{ width: "100px", height: "100px", margin: "20px 0" }}
            />
            <div style={{ margin: "auto 10px" }}>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className="btn-primary"
                >
                  Actualizar foto
                </Button>
                <p style={{ fontSize: "12px" }}>Max 5mb</p>
              </label>
            </div>
          </div>

          <div className="files">
            <TextField
              name="servicio"
              className="TxtField"
              variant="outlined"
              fullWidth
              label="Servicio"
              //   value="value"
              //   error={errors.razon && touched.razon}
              //   onBlur={handleBlur}
              //   onChange={handleChange}
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
              name="descripcion"
              className="TxtField"
              variant="outlined"
              fullWidth
              label="Descripcion"
              //   value="value"
              //   error={errors.nombre && touched.nombre}
              //   onBlur={handleBlur}
              //   onChange={handleChange}
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
              name="horas"
              className="TxtField"
              variant="outlined"
              fullWidth
              label="Horas"
              //   value="value"
              //   error={errors.razon && touched.razon}
              //   onBlur={handleBlur}
              //   onChange={handleChange}
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
              name="precio"
              className="TxtField"
              variant="outlined"
              fullWidth
              label="Precio"
              //   value="value"
              //   error={errors.nombre && touched.nombre}
              //   onBlur={handleBlur}
              //   onChange={handleChange}
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
          <TableContainer
            style={{
              width: "100%",
              borderRadius: "10px 10px",
              margin: "20px 0",
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
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font">{row.name}</TableCell>
                    <TableCell className="font">
                      <TextField
                        id="time"
                        label="Inicio"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </TableCell>
                    <TableCell className="font" style={{ textAlign: "center" }}>
                      <TextField
                        id="time"
                        label="Fin"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default ServiceDetail;

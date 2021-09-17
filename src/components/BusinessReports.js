import { MenuItem, Select } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import VerticalBar from "./VerticalBar";

class BusinessReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha: 0,
      ventas: 0,
    };
  }
  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    if (formField === "fecha") {
      this.setState({
        fecha: value,
      });
    } else if (formField === "venta") {
      this.setState({
        ventas: value,
      });
    }
  };
  render() {
    return (
      <div className="page-container">
        <h1>Mis reportes</h1>
        <div>
          <div className="files">
            <Select
              value={this.state.fecha}
              name="fecha"
              onChange={this.handleDocumentChange}
              required
              variant="outlined"
              fullWidth
              style={{
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "5px",
              }}
              displayEmpty={false}
            >
              <MenuItem selected={true} disabled value={0}>
                Resultados
              </MenuItem>
              <MenuItem value={1}>Días</MenuItem>
              <MenuItem value={2}>Semanas</MenuItem>
              <MenuItem value={3}>Meses</MenuItem>
            </Select>
          </div>
          <div className="files">
            <div className="txt-left">
              <Select
                value={this.state.ventas}
                name="venta"
                onChange={this.handleDocumentChange}
                required
                variant="outlined"
                fullWidth
              >
                <MenuItem disabled value={0}>
                  Tipo
                </MenuItem>
                <MenuItem value={1}>Servicios</MenuItem>
                <MenuItem value={2}>Ventas</MenuItem>
              </Select>
            </div>
          </div>
          <VerticalBar fecha={this.state.fecha} venta={this.state.ventas} />
        </div>
      </div>
    );
  }
}

export default BusinessReports;

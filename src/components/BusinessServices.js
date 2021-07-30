import React from "react";
import { Component } from "react";
import Container from "../Modal/Container/ContainerService";

class BusinessServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerText: "Agregar servicio",
    };
  }

  render() {
    return (
      <>
        <div>
          <h4>Inicio &gt; Mis servicios</h4>
          <h1>Mis servicios</h1>
          <h3>Tus servicios</h3>
          <Container triggerText={this.state.triggerText} />

          <div style={{ display: "block" }}>
            <h5>Estos son los servicios que han sido registrados</h5>
          </div>
          <div className="order-list">
            <div className="order-list_header">
              <span className="servicio">Servicio</span>
              <span className="descripcion">Descripcion</span>
              <span className="duracion">Duracion</span>
              <span className="precio">Precio</span>
              <span className="citas">Citas</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BusinessServices;

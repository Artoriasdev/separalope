import { Button } from "@material-ui/core";
import React, { Component } from "react";

class ConfirmLogin extends Component {
  handleRedirect = () => {
    this.props.history.push("/register/customer");
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          textAlign: "center",
          minHeight: "70vh",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "30%", margin: "auto" }}>
          <p className="font-tittle">
            Usted ha seleccionado {this.props.match.params.value}, para reservar
            su cita registrese en nuestra pagina web.
          </p>
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="btn-primary"
            style={{
              width: "80%",
              textTransform: "capitalize",
              marginBottom: "20px",
            }}
            onClick={this.handleRedirect}
          >
            Regístrate
          </Button>
          <div>
            <a href="/reserve">Continuar como invitado</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmLogin;

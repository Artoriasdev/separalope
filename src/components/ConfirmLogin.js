import { Button } from "@material-ui/core";
import React, { Component } from "react";

class ConfirmLogin extends Component {
  handleRedirect = () => {
    this.props.history.push("/register/customer");
    localStorage.setItem("reserve", true);
  };
  render() {
    return (
      <div className="confirm-page">
        <div className="content-container">
          <p className="font-tittle">
            Usted ha seleccionado {this.props.match.params.value}, para reservar
            su cita registrese en nuestra pagina web.
          </p>
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="btn-primary"
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

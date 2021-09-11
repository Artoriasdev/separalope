import { Button } from "@material-ui/core";
import React, { Component } from "react";

class ConfirmLogin extends Component {
  handleRedirect = () => {
    this.props.history.push("/register/customer");
    localStorage.setItem("reserve", true);
    localStorage.setItem("id", this.props.match.params.id);
  };
  handleRedirectLogin = () => {
    this.props.history.push("/login/C");
    localStorage.setItem("reserve", true);
    localStorage.setItem("id", this.props.match.params.id);
  };
  render() {
    return (
      <div className="confirm-page">
        <div className="content-container">
          <p className="font-tittle">
            Usted ha seleccionado {this.props.match.params.title}, para reservar
            su cita regístrese en nuestra página web.
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
          <div style={{ marginTop: "10px" }}>
            <a href={`/reserve/invited/${this.props.match.params.id}`}>
              Continuar como invitado
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmLogin;

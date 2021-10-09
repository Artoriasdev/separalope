import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Fade,
  Modal,
} from "@material-ui/core";
import {
  Category,
  Code,
  Event,
  Person,
  Schedule,
  Timer,
} from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";

class PastAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      modal: false,
      message: "",
      forceRedirect: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetReservationHistoryByBusiness();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetReservationHistoryByBusiness = () => {
    const id = this.props.id;
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/getReservationHistoryByBusiness/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          appointments: data,
        });
        console.log(data);

        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("tradename");
          sessionStorage.removeItem("logo");
          this.setState({
            modal: true,
            message:
              "Su sesión ha expirado. Por favor vuelva a iniciar sesión.",
            forceRedirect: true,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          });
        }
      });
    return rspApi;
  };

  handleClose = () => {
    this.setState({ modal: false });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/");
      this.props.history.go();
    }
  };

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={() => this.handleClose}
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
        <h1>Historial de citas</h1>
        <div className="appointment-cards">
          {this.state.appointments.map(
            ({
              titleService,
              emailCustomer,
              dateReservation,
              durationReservation,
              timeReservation,
              category,
              codeReservation,
            }) => (
              <Card
                style={{
                  width: 275,
                  display: "inline-block",
                  margin: "20px 20px 20px 0",
                }}
                variant="elevation"
                key={titleService}
              >
                <CardContent className="font-tittle">
                  {titleService}
                </CardContent>
                <hr style={{ width: "80%", margin: "0 auto" }} />
                <CardContent className="font">
                  <Person />
                  {emailCustomer}
                </CardContent>
                <CardContent className="font">
                  <Event /> {dateReservation}
                </CardContent>
                <CardContent className="font">
                  <Timer /> {durationReservation}
                </CardContent>
                <CardContent className="font">
                  <Schedule /> {timeReservation}
                </CardContent>
                <CardContent className="font">
                  <Category /> {category}
                </CardContent>
                <CardContent className="font">
                  <Code /> {codeReservation}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    );
  }
}

export default PastAppointments;

import {
  AppBar,
  Backdrop,
  Breadcrumbs,
  Button,
  Fade,
  Link,
  Modal,
  Tabs,
} from "@material-ui/core";
import React, { Component } from "react";
import { LinkTab } from "../Nav Tabs/LinkTab";
import FutureAppointments from "../Nav Tabs/Appointment Tabs/FutureAppointments";
import PastAppointments from "../Nav Tabs/Appointment Tabs/PastAppointments";
import { TabPanel } from "../Nav Tabs/TabPanel";
import { NavigateNext } from "@material-ui/icons";
import axios from "axios";

class ServiceAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      title: "",
      modal: false,
      message: "",
      forceRedirect: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") !== "B") {
      this.props.history.push("/");
    } else {
      this.handleGetServiceForEdit();
    }
  }

  handleGetServiceForEdit = () => {
    const tk = sessionStorage.getItem("tk");
    const id = this.props.match.params.id;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServiceForEdit/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          title: data[0].title,
        });

        console.log(this.state.title);

        return response;
      })
      .catch((error) => {
        console.log(error.response);
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

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleRedirectService = () => {
    this.props.history.push(
      `/business/services/details/${this.props.match.params.id}/${this.props.match.params.value}/${this.props.match.params.category}`
    );
  };

  handleRedirectAppointment = () => {
    this.props.history.push(
      `/business/services/appointment/${this.props.match.params.id}/${this.props.match.params.value}/${this.props.match.params.category}`
    );
  };

  handleClick = () => {
    if (this.props.match.params.value === "1") {
      this.props.history.push("/business/services");
    } else if (this.props.match.params.value === "2") {
      this.props.history.push(
        `/business/services-category/${this.props.match.params.category}`
      );
    }
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/");
      this.props.history.go();
    }
  };
  render() {
    return (
      <div className="page-container" style={{ padding: "0", width: "100%" }}>
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
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ marginLeft: "50px" }}
        >
          <Link href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            onClick={this.handleClick}
            style={{ cursor: "pointer" }}
          >
            Mis Servicios
          </Link>
          <Link color="textSecondary">{this.state.title}</Link>
        </Breadcrumbs>

        <div className="appointment-service-container">
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
            }}
            elevation={0}
          >
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="nav tabs example"
              indicatorColor="primary"
              style={{ color: "black" }}
              TabIndicatorProps={{ style: { background: "black" } }}
              style={{ color: "black" }}
            >
              <LinkTab
                label="Citas confirmadas"
                href="/appointments"
                className="font-p"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
              <LinkTab
                label="Historial de citas"
                href="past"
                className="font-p"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <FutureAppointments
              id={this.props.match.params.id}
              history={this.props.history}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <PastAppointments
              id={this.props.match.params.id}
              history={this.props.history}
            />
          </TabPanel>
        </div>
      </div>
    );
  }
}

export default ServiceAppointment;

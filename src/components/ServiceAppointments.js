import { AppBar, Tabs } from "@material-ui/core";
import React, { Component } from "react";
import { LinkTab } from "../Nav Tabs/LinkTab";
import FutureAppointments from "../Nav Tabs/Appointment Tabs/FutureAppointments";
import PastAppointments from "../Nav Tabs/Appointment Tabs/PastAppointments";
import { TabPanel } from "../Nav Tabs/TabPanel";

class ServiceAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleRedirectService = () => {
    this.props.history.push("/business/services/details");
  };

  handleRedirectAppointment = () => {
    this.props.history.push("/business/services/appointment");
  };
  render() {
    return (
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
          <AppBar position="static" className="btn-primary">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                label="Citas pendientes"
                href="/appointments"
                className="font-p"
                style={{ textTransform: "none" }}
              />
              <LinkTab
                label="Citas pasadas"
                href="past"
                className="font-p"
                style={{ textTransform: "none" }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <FutureAppointments id={this.props.match.params.id} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <PastAppointments id={this.props.match.params.id} />
          </TabPanel>
        </div>
      </div>
    );
  }
}

export default ServiceAppointment;

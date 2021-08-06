import { AppBar, Tabs } from "@material-ui/core";
import React, { Component } from "react";
import { LinkTab } from "../Nav Tabs/LinkTab";
import FutureAppointments from "../Nav Tabs/Tab Pages/FutureAppointments";
import PastAppointments from "../Nav Tabs/Tab Pages/PastAppointments";
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
      <>
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
        <div style={{ width: "51%", margin: " -200px auto" }}>
          <AppBar position="static" className="btn-primary">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab label="Citas pendientes" href="/drafts" />
              <LinkTab label="Citas pasadas" href="/trash" />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <FutureAppointments />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <PastAppointments />
          </TabPanel>
        </div>
      </>
    );
  }
}

export default ServiceAppointment;

import { AppBar, Breadcrumbs, Button, Link, Tabs } from "@material-ui/core";
import React, { Component } from "react";
import { LinkTab } from "../Nav Tabs/LinkTab";
import { TabPanel } from "../Nav Tabs/TabPanel";
import { Edit, NavigateNext } from "@material-ui/icons";
import BusinessDataBank from "./BusinessDataBank";
import BusinessData from "./BusinessData";

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      edit: false,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount() {
    if (sessionStorage.getItem("workflow") !== "B") {
      this.props.history.push("/");
    }
  }
  handleEdit = () => {
    this.setState({ edit: true });
  };
  render() {
    return (
      <div className="page-container" style={{ padding: "0", width: "100%" }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ margin: "30px" }}
        >
          <Link href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Mi Perfil
          </Link>
          <Link
            color="textSecondary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Datos de negocio
          </Link>
        </Breadcrumbs>
        <div className="profile-container">
          <div className="form-profile">
            <h1>Datos de negocio</h1>
            <Button
              variant="contained"
              color="secondary"
              className="btn-primary"
              startIcon={<Edit />}
              onClick={this.handleEdit}
            >
              Editar datos
            </Button>
          </div>
          <hr />
          <div className="business-profile-container">
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
                TabIndicatorProps={{ style: { background: "black" } }}
                style={{ color: "black" }}
              >
                <LinkTab
                  label="Datos de la empresa"
                  href="/data"
                  className="font-p"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                />
                <LinkTab
                  label="Datos bancarios"
                  href="/bank"
                  className="font-p"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
              <BusinessData
                history={this.props.history}
                edit={this.state.edit}
              />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <BusinessDataBank
                history={this.props.history}
                edit={this.state.edit}
              />
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessProfile;

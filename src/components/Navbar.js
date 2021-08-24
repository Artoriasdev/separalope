import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Button,
  makeStyles,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import axios from "axios";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import { AccountCircle } from "@material-ui/icons";
import { LogoSVG } from "../assets/images/svg";

const useStyles = makeStyles(() => ({
  tab: {
    minHeight: "2.75rem",
    color: "white",
    textTransform: "capitalize",
    marginRight: 40,
  },

  scrollButtons: {
    minHeight: "2.75rem",
    "& .MuiTabScrollButton-root svg": {
      fill: "white",
    },
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    color: "black",
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
}));

const StyledMenu = withStyles()((props) => (
  <Menu
    elevation={2}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const handleGetCategorys = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi =
    "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      const { data } = response.data;

      localStorage.setItem("info", JSON.stringify(data));

      return response;
    });
  return rspApi;
};

const Navbar = () => {
  // handleGetCategorys();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const history = useHistory();

  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleRedirectButton = (id) => {
    if (id === 1) {
      history.push("/login/C");
    } else if (id === 2) {
      history.push("/login/B");
    } else if (id === 3) {
      history.push("/register/customer");
    } else if (id === 4) {
      history.push("/register/business");
    }
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRedirect = (id, name, image, description) => {
    history.go(history.push(`/services-menu/${id}`));
    localStorage.setItem("categoria", name);
    localStorage.setItem("image", image);
    localStorage.setItem("description", description);
  };

  return (
    <header className="header">
      <div className={classes.grow}>
        <AppBar
          position="static"
          style={{
            background: "#ffdd00",
            boxShadow: "none",
            height: "3.15rem",
          }}
        >
          <Toolbar
            style={{ width: "1235px", margin: "0 auto", padding: 0 }}
            variant="dense"
          >
            <Button
              className="font buttonHeader "
              onClick={handleRedirectHome}
              style={{
                textTransform: "none",

                height: "3.15rem",
                marginTop: "-5px",
              }}
            >
              <h2>sepáralo pe</h2>
              <h2 style={{ fontFamily: "unset" }}>!</h2>
            </Button>
            <div className={classes.grow} />
            <div>
              <Button
                startIcon={<AccountCircle style={{ fontSize: "25px" }} />}
                className="font"
                onClick={handleClick}
                style={{
                  backgroundColor: anchorEl ? "#5829dd" : "transparent",
                  color: anchorEl ? "white" : "black",
                  textTransform: "capitalize",
                  width: "150px",
                  borderRadius: "0",
                  height: "3.15rem",
                  marginTop: "-3px",
                }}
              >
                Iniciar sesión
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  style={{ width: "150px" }}
                  onClick={() => handleRedirectButton(1)}
                >
                  <ListItemText primary="Soy cliente" />
                </MenuItem>
                <MenuItem onClick={() => handleRedirectButton(2)}>
                  <ListItemText primary="Doy servicio" />
                </MenuItem>
              </StyledMenu>
              <Button
                className="font"
                onClick={handleClick2}
                style={{
                  backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
                  color: anchorEl2 ? "white" : "black",
                  textTransform: "capitalize",
                  width: "150px",
                  borderRadius: "0",
                  height: "3.15rem",
                  marginTop: "-5px",
                }}
              >
                Regístrate
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                style={{ borderRadius: "0" }}
              >
                <MenuItem
                  style={{ width: "150px" }}
                  onClick={() => handleRedirectButton(3)}
                >
                  <ListItemText primary="Soy cliente" />
                </MenuItem>
                <MenuItem onClick={() => handleRedirectButton(4)}>
                  <ListItemText primary="Doy servicio" />
                </MenuItem>
              </StyledMenu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className="botHeader">
        <div className="botHeader2">
          <nav className="botHeader2__nav">
            <div>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                indicatorColor="none"
                aria-label="scrollable auto tabs categories"
                classes={{
                  indicator: classes.indicator,
                  root: classes.scrollButtons,
                }}
              >
                {info.map(({ id, name, image, description }) => (
                  <Button
                    onClick={() => handleRedirect(id, name, image, description)}
                    classes={{
                      root: classes.tab,
                    }}
                    key={id}
                    className="font-p"
                  >
                    {name}
                  </Button>
                ))}
              </Tabs>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

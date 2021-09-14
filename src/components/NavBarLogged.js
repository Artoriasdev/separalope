import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Tabs,
  Toolbar,
  withStyles,
  IconButton,
} from "@material-ui/core";
import { ArrowDropDown, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { LogoSVG } from "../assets/images/svg";
import axios from "axios";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  tab: {
    minHeight: "2.75rem",
    color: "white",
    textTransform: "capitalize",
    opacity: 1,
    minWidth: "100px",
    marginRight: 25,
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
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
const StyledMenuSettings = withStyles()((props) => (
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

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRedirectServices = (id) => {
    history.go(history.push(`/services-menu/${id}`));
  };

  const history = useHistory();

  const [infoUser, setInfoUser] = useState(
    JSON.parse(sessionStorage.getItem("info"))
  );

  const [info, setInfo] = useState([]);

  useEffect(() => {
    handleGetCategorys();
  }, []);

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

        setInfo(data);

        return response;
      });
    return rspApi;
  };

  const [work, setWork] = useState(sessionStorage.getItem("workflow"));

  const [name, setName] = useState(sessionStorage.getItem("name"));

  const handleRedirect = (id) => {
    if (id === 1 && work === "B") {
      history.push("/business/profile");
    } else if (id === 1 && work === "C") {
      history.push("/customer/profile");
    }
    if (id === 2) {
      history.push("/customer-appointment");
    }
    if (id === 3) {
      history.push("/customer-history");
    }
    if (id === 4) {
      history.push("/business/category");
    }
    if (id === 5) {
      history.push("/business/services");
    }
    if (id === 7) {
      history.push("/password_change");
    }
    if (id === 8) {
      history.push("/frequent-questions");
    }
    setAnchorEl(null);
    setAnchorEl2(null);
    setMobileMoreAnchorEl(null);
  };

  const handleRedirectHome = () => {
    history.push("/");
  };
  const handleRedirectHomeBusiness = () => {
    history.push("/business/category");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("tradename");
    sessionStorage.removeItem("logo");
    sessionStorage.removeItem("lastName");
    localStorage.removeItem("name");
    history.go(history.push("/"));
  };

  const mobileMenuId = "";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{ maxWidth: "80%", textAlign: "center" }}
    >
      {name ? (
        <>
          <Button
            endIcon={<ArrowDropDown style={{ fontSize: "25px" }} />}
            className="font buttonHeader "
            onClick={handleClick}
            style={{
              backgroundColor: anchorEl ? "#5829dd" : "transparent",
              color: anchorEl ? "white" : "black",
              textTransform: "capitalize",
              width: "200px",
            }}
          >
            {name}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {infoUser.map(({ idMenu, nameMenu }) => (
              <>
                <MenuItem
                  key={idMenu}
                  className="menuItemClient"
                  onClick={() => handleRedirect(idMenu)}
                >
                  <ListItemText primary={nameMenu} />
                </MenuItem>
              </>
            ))}
          </StyledMenu>
          <Button
            className="font  buttonHeader"
            onClick={handleClick2}
            style={{
              backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
              color: anchorEl2 ? "white" : "black",
              textTransform: "capitalize",
              width: "0",
            }}
          >
            <Settings />
          </Button>
          <StyledMenuSettings
            id="customized-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
          >
            <MenuItem className="menuItem" onClick={() => handleRedirect(7)}>
              <ListItemText primary="Cambiar contraseña" />
            </MenuItem>
            <MenuItem onClick={() => handleRedirect(8)}>
              <ListItemText primary="Preguntas frecuentes" />
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>
              <ListItemText primary="Cerrar sesión" />
            </MenuItem>
          </StyledMenuSettings>
        </>
      ) : (
        <>
          <Button
            className="font  buttonHeader"
            onClick={() => handleRedirect(infoUser[1].idMenu)}
            style={{
              textTransform: "capitalize",
            }}
          >
            {infoUser[1].nameMenu}
          </Button>
          <Button
            className="font buttonHeader"
            onClick={() => handleRedirect(infoUser[2].idMenu)}
            style={{
              textTransform: "capitalize",
            }}
          >
            {infoUser[2].nameMenu}
          </Button>
          <Button
            className="font buttonHeader"
            onClick={() => handleRedirect(infoUser[0].idMenu)}
            style={{
              textTransform: "capitalize",
            }}
          >
            {infoUser[0].nameMenu}
          </Button>

          <Button
            className="font buttonHeader"
            onClick={handleClick}
            style={{
              backgroundColor: anchorEl ? "#5829dd" : "transparent",
              color: anchorEl ? "white" : "black",
              textTransform: "capitalize",
              width: "0",
            }}
          >
            <Settings />
          </Button>
          <StyledMenuSettings
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleRedirect(7)}>
              <ListItemText primary="Cambiar contraseña" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemText primary="Cerrar sesión" />
            </MenuItem>
          </StyledMenuSettings>
        </>
      )}
    </Menu>
  );

  return (
    <>
      {name ? (
        <>
          <header className="header">
            <div className={classes.grow}>
              <AppBar className="header" position="static">
                <Toolbar className="bar" variant="dense">
                  <Button
                    className="font buttonHeader"
                    onClick={handleRedirectHome}
                    style={{
                      textTransform: "none",
                    }}
                  >
                    <h2>sepáralo pe</h2>
                    <h2 style={{ fontFamily: "unset" }}>!</h2>
                  </Button>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button
                      endIcon={<ArrowDropDown style={{ fontSize: "25px" }} />}
                      className="font buttonHeader "
                      onClick={handleClick}
                      style={{
                        backgroundColor: anchorEl ? "#5829dd" : "transparent",
                        color: anchorEl ? "white" : "black",
                        textTransform: "capitalize",
                        width: "200px",
                      }}
                    >
                      {name}
                    </Button>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {infoUser.map(({ idMenu, nameMenu }) => (
                        <>
                          <MenuItem
                            key={idMenu}
                            className="menuItemClient"
                            onClick={() => handleRedirect(idMenu)}
                          >
                            <ListItemText primary={nameMenu} />
                          </MenuItem>
                        </>
                      ))}
                    </StyledMenu>
                    <Button
                      className="font  buttonHeader"
                      onClick={handleClick2}
                      style={{
                        backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
                        color: anchorEl2 ? "white" : "black",
                        textTransform: "capitalize",
                        width: "0",
                      }}
                    >
                      <Settings />
                    </Button>
                    <StyledMenuSettings
                      id="customized-menu"
                      anchorEl={anchorEl2}
                      keepMounted
                      open={Boolean(anchorEl2)}
                      onClose={handleClose2}
                    >
                      <MenuItem
                        className="menuItem"
                        onClick={() => handleRedirect(7)}
                      >
                        <ListItemText primary="Cambiar contraseña" />
                      </MenuItem>
                      <MenuItem onClick={() => handleRedirect(8)}>
                        <ListItemText primary="Preguntas frecuentes" />
                      </MenuItem>
                      <MenuItem onClick={() => handleLogout()}>
                        <ListItemText primary="Cerrar sesión" />
                      </MenuItem>
                    </StyledMenuSettings>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="black"
                    >
                      <MoreIcon color="black" />
                    </IconButton>
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
                      {info.map(({ id, name }) => (
                        <Tab
                          onClick={() => handleRedirectServices(id)}
                          classes={{
                            root: classes.tab,
                          }}
                          label={name}
                          key={id}
                          className="font-p"
                        />
                      ))}
                    </Tabs>
                  </div>
                </nav>
              </div>
            </div>
            {renderMobileMenu}
          </header>
        </>
      ) : (
        <>
          <header className="header">
            <div className={classes.grow}>
              <AppBar className="header" position="static">
                <Toolbar className="bar" variant="dense">
                  <Button
                    className="font  buttonHeader"
                    onClick={handleRedirectHomeBusiness}
                    style={{
                      textTransform: "none",
                    }}
                  >
                    <h2>sepáralo pe</h2>
                    <h2 style={{ fontFamily: "unset" }}>!</h2>
                  </Button>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button
                      className="font  buttonHeader"
                      onClick={() => handleRedirect(infoUser[1].idMenu)}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {infoUser[1].nameMenu}
                    </Button>
                    <Button
                      className="font buttonHeader"
                      onClick={() => handleRedirect(infoUser[2].idMenu)}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {infoUser[2].nameMenu}
                    </Button>
                    <Button
                      className="font buttonHeader"
                      onClick={() => handleRedirect(infoUser[0].idMenu)}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {infoUser[0].nameMenu}
                    </Button>

                    <Button
                      className="font buttonHeader"
                      onClick={handleClick}
                      style={{
                        backgroundColor: anchorEl ? "#5829dd" : "transparent",
                        color: anchorEl ? "white" : "black",
                        textTransform: "capitalize",
                        width: "0",
                      }}
                    >
                      <Settings />
                    </Button>
                    <StyledMenuSettings
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleRedirect(7)}>
                        <ListItemText primary="Cambiar contraseña" />
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemText primary="Cerrar sesión" />
                      </MenuItem>
                    </StyledMenuSettings>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="black"
                    >
                      <MoreIcon color="black" />
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
            {renderMobileMenu}
          </header>
        </>
      )}
    </>
  );
};

export default Navbar;

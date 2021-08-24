import React, { useState } from "react";
import {
  AppBar,
  Button,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Tabs,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import { ArrowDropDown, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
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

const Navbar = () => {
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

  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  const [work, setWork] = useState(sessionStorage.getItem("workflow"));

  const [name, setName] = useState(localStorage.getItem("name"));

  const handleRedirect = (id) => {
    if (id === 1 && work === "B") {
      history.push("/business/profile");
    } else {
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
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("tradename");
    localStorage.removeItem("name");
    history.go(history.push("/"));
  };

  return (
    <>
      {name ? (
        <>
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
                      endIcon={<ArrowDropDown style={{ fontSize: "25px" }} />}
                      className="font"
                      onClick={handleClick}
                      style={{
                        backgroundColor: anchorEl ? "#5829dd" : "transparent",
                        color: anchorEl ? "white" : "black",
                        textTransform: "capitalize",
                        width: "200px",
                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-3px",
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
                            style={{ width: "200px" }}
                            onClick={() => handleRedirect(idMenu)}
                          >
                            <ListItemText primary={nameMenu} />
                          </MenuItem>
                        </>
                      ))}
                    </StyledMenu>
                    <Button
                      className="font"
                      onClick={handleClick2}
                      style={{
                        backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
                        color: anchorEl2 ? "white" : "black",
                        textTransform: "capitalize",

                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-5px",
                      }}
                    >
                      <Settings />
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
                      {info.map(({ id, name }) => (
                        <Button
                          onClick={() => handleRedirectServices(id)}
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
        </>
      ) : (
        <>
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
                    className="font"
                    onClick={handleRedirectHome}
                    style={{
                      textTransform: "capitalize",

                      height: "3.15rem",
                      marginTop: "-5px",
                    }}
                  >
                    <h2 style={{ color: "black" }}>separalope</h2>
                  </Button>
                  <div className={classes.grow} />
                  <div>
                    <Button
                      className="font"
                      onClick={() => handleRedirect(infoUser[1].idMenu)}
                      style={{
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-3px",
                      }}
                    >
                      {infoUser[1].nameMenu}
                    </Button>
                    <Button
                      className="font"
                      onClick={() => handleRedirect(infoUser[2].idMenu)}
                      style={{
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-3px",
                      }}
                    >
                      {infoUser[2].nameMenu}
                    </Button>
                    <Button
                      className="font"
                      onClick={() => handleRedirect(infoUser[0].idMenu)}
                      style={{
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-3px",
                      }}
                    >
                      {infoUser[0].nameMenu}
                    </Button>

                    <Button
                      className="font"
                      onClick={handleClick}
                      style={{
                        backgroundColor: anchorEl ? "#5829dd" : "transparent",
                        color: anchorEl ? "white" : "black",
                        textTransform: "capitalize",

                        borderRadius: "0",
                        height: "3.15rem",
                        marginTop: "-5px",
                      }}
                    >
                      <Settings />
                    </Button>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      style={{ borderRadius: "0" }}
                    >
                      <MenuItem
                        style={{ width: "170px" }}
                        onClick={() => handleRedirect(7)}
                      >
                        <ListItemText primary="Cambiar contraseña" />
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemText primary="Cerrar sesión" />
                      </MenuItem>
                    </StyledMenu>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
          </header>
        </>
      )}
    </>
    // {/* <li onClick={() => handleRedirect(infoUser[1].idMenu)}>
    //         <button className="buttonNav normal">{infoUser[1].nameMenu}</button>
    //       </li>
    //       <li onClick={() => handleRedirect(infoUser[2].idMenu)}>
    //         <button className="buttonNav normal">{infoUser[2].nameMenu}</button>
    //       </li>
    //       <li onClick={() => handleRedirect(infoUser[0].idMenu)}>
    //         <button className="buttonNav normal">{infoUser[0].nameMenu}</button>
    //       </li>
    //       <li>
    //         <button className="buttonNav normal">
    //           <Settings
    //             style={{
    //               height: "100%",
    //               margin: "8px 0",
    //               fontSize: "24px",
    //             }}
    //           />
    //         </button>
    //         <ul
    //           style={

    //           }
    //         >
    //           <li onClick={() => handleRedirect(7)}>
    //             <MenuItem style={{ left: -10 }}>Cambiar contraseña</MenuItem>
    //           </li>
    //           <li onClick={handleLogout}>
    //             <MenuItem style={{ left: -10 }}>Cerrar sesión</MenuItem>
    //           </li>
    //         </ul>
    //       </li> */}
  );
};

export default Navbar;

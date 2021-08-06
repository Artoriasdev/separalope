import logo from "./logo.svg";
// import './App.css';
//importar sass
import "./sass/styles.scss";
import FONT_MAVEN_REGULAR from "./assets/fonts/MavenPro-Regular.ttf";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  StyledRoot,
  StyledMain,
  StyledDiv,
  StyledFigure,
  StyledTitle,
} from "./helpers/styled";
// import FullPageLoader from "./components/FullPageLoader";
import { StyledGlobal } from "./helpers/styled";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import Login from "./components/Login";
import RegisterCustomer from "./components/RegisterCustomer";
import RegisterBusiness from "./components/RegisterBusiness";
import BusinessCategory from "./components/BusinessCategory";
import BusinessServices from "./components/BusinessServices";
import BusinessProfile from "./components/BusinessProfile";
import BussinesProfileBank from "./components/BusinessProfileBank";
import BussinesProfilePassword from "./components/BusinessProfilePassword";
import RegisterDataBank from "./components/RegisterDataBank";
import ServiceDetail from "./components/ServiceDetail";
import ServiceAppointment from "./components/ServiceAppointments";
import NavBarLogged from "./components/NavBarLogged";
import { useState } from "react";

// import HomePage from "./pages/Home";

const MavenProRegular = {
  fontFamily: "MavenPro-Regular",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('MavenPro-Regular'),
    local('MavenPro-Regular'),
    url(${FONT_MAVEN_REGULAR}) format('ttf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: "#ffdd00",
    },
    secondary: {
      main: "#5829dd",
    },
  },
  typography: {
    fontFamily: ["MavenPro-Regular"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [MavenProRegular],
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#5829dd",
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "white",
      },
      toolbarBtnSelected: {
        color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#232323",
      },
      daySelected: {
        backgroundColor: "#5829dd",
        color: "white !important",
        "&:hover": {
          backgroundColor: "#5025ca",
        },
      },
      current: {
        color: "#5829dd",
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        "@media (max-width: 376px)": {
          minWidth: "95vw",
        },
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        "@media (max-width: 376px)": {
          minWidth: "95vw",
        },
      },
      withAdditionalAction: {
        "& .MuiButton-textPrimary": {
          "&:first-child": {
            color: "#232323",
          },
          "&:not(:first-child)": {
            color: "#5829dd",
          },
        },
      },
    },
  },
  MuiRating: {
    root: {},
  },
});

function App() {
  return (
    <>
      <StyledRoot>
        {/* <FullPageLoader /> */}
        <ThemeProvider theme={theme}></ThemeProvider>
        <StyledGlobal />
        <BrowserRouter>
          {JSON.parse(sessionStorage.getItem("logged")) ? (
            <NavBarLogged />
          ) : (
            <Navbar />
          )}

          <Switch>
            <StyledMain f="1 0 auto" mt={"5.9rem"} bg={"#fff"}>
              <Route
                exact
                path="/business/services/appointment"
                component={ServiceAppointment}
              />
              <Route
                exact
                path="/business/services/details"
                component={ServiceDetail}
              />

              <Route
                exact
                path="/business/profile"
                component={BusinessProfile}
              />
              <Route
                exact
                path="/business/profile/register-data-bank"
                component={RegisterDataBank}
              />
              <Route
                exact
                path="/business/profile/bank"
                component={BussinesProfileBank}
              />
              <Route
                exact
                path="/business/profile/password"
                component={BussinesProfilePassword}
              />
              <Route
                exact
                path="/business/category"
                component={BusinessCategory}
              />
              <Route
                exact
                path="/business/services"
                component={BusinessServices}
              />

              <Route exact path="/login/:value" component={Login} />
              <Route
                exact
                path="/register/customer"
                component={RegisterCustomer}
              />
              <Route
                exact
                path="/register/business"
                component={RegisterBusiness}
              />
              {/* <Route path="/" exact component={HomePage} /> */}
              {/* <Redirect from="*" to="/" /> */}
            </StyledMain>
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      </StyledRoot>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

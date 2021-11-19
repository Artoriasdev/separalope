// import './App.css';
//importar sass
import "./sass/styles.scss";
// import FONT_MAVEN_REGULAR from "./assets/fonts/MavenPro-Regular.ttf";
// import { createTheme } from "@material-ui/core/styles";
import { StyledRoot, StyledMain } from "./helpers/styled";
// import FullPageLoader from "./components/FullPageLoader";
import { StyledGlobal } from "./helpers/styled";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterBusiness from "./pages/RegisterBusiness";
import BusinessCategory from "./pages/BusinessCategory";
import BusinessServices from "./pages/BusinessServices";
// import BusinessData from "./pages/BusinessData";
// import BussinesDataBank from "./pages/BusinessDataBank";
import BusinessProfile from "./pages/BusinessProfile";
import Password from "./pages/Password";
import RegisterDataBank from "./pages/RegisterDataBank";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceAppointment from "./pages/ServiceAppointments";
import NavBarLogged from "./components/NavBarLogged";
import HomePage from "./pages/HomePage";
import ClientProfile from "./pages/ClientProfile";
import Question from "./pages/Question";
import CustomerAppointment from "./pages/CustomerAppointment";
import CustomerHistory from "./pages/CustomerHistory";
import BusinessServicesCategory from "./pages/BusinessServicesCategory";
import MenuBusinessCategory from "./pages/MenuBusinessCategory";
import MenuServicesBusiness from "./pages/MenuServicesBusiness";
import ReserveAppointment from "./pages/ReserveAppointment";
import ConfirmLogin from "./pages/ConfirmLogin";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordOTP from "./pages/PasswordOTP";
import PasswordRestore from "./pages/PasswordRestore";
import { Footer } from "./components/Footer";
import { ReserveComplete } from "./pages/ReserveComplete";
import ReserveAppointmentInvited from "./pages/ReserveAppointmentInvited";
import React from "react";
import { CookiesBanner } from "./components/CookiesBanner";
import Complains from "./pages/Complains";
import BusinessReports from "./pages/BusinessReports";
import ScrollToTop from "./components/ScrollToTop";
import { CookiePolicy } from "./pages/CookiePolicy";
// import HomePage from "./pages/Home";

// const MavenProRegular = {
//   fontFamily: "MavenPro-Regular",
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   fontWeight: 400,
//   src: `
//     local('MavenPro-Regular'),
//     local('MavenPro-Regular'),
//     url(${FONT_MAVEN_REGULAR}) format('ttf')
//   `,
//   unicodeRange:
//     "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
// };

function App() {
  const logged = JSON.parse(sessionStorage.getItem("logged"));
  const negocio = sessionStorage.getItem("tradename");

  return (
    <>
      <StyledRoot>
        {/* <FullPageLoader /> */}

        <StyledGlobal />
        <BrowserRouter>
          {logged ? <NavBarLogged /> : <Navbar />}
          <ScrollToTop />
          <CookiesBanner />

          <Switch>
            <StyledMain
              f="1 0 auto"
              mt={negocio === null ? "5.9rem" : "3.15rem"}
              bg={"#fff"}
            >
              <Route
                exact
                path="/business/services/appointment/:id/:value/:category"
                component={ServiceAppointment}
              />
              <Route
                exact
                path="/business/services/details/:id/:value/:category"
                component={ServiceDetail}
              />

              <Route
                exact
                path="/business/profile"
                component={BusinessProfile}
              />
              {/* <Route exact path="/business/profile" component={BusinessData} />
              <Route
                exact
                path="/business/profile/bank"
                component={BussinesDataBank}
              /> */}
              <Route
                exact
                path="/business/profile/register-data-bank"
                component={RegisterDataBank}
              />
              <Route exact path="/password_change" component={Password} />
              <Route
                exact
                path="/business/category"
                component={BusinessCategory}
              />
              <Route
                exact
                path="/business/reports"
                component={BusinessReports}
              />
              <Route
                exact
                path="/business/services"
                component={BusinessServices}
              />
              <Route
                exact
                path="/business/services-category/:value"
                component={BusinessServicesCategory}
              />

              <Route exact path="/login/:value" component={Login} />

              <Route
                exact
                path="/register/customer"
                component={RegisterCustomer}
              />

              <Route exact path="/customer/profile" component={ClientProfile} />

              <Route
                exact
                path="/register/business"
                component={RegisterBusiness}
              />
              <Route exact path="/frequent-questions" component={Question} />

              <Route
                exact
                path="/customer-appointment"
                component={CustomerAppointment}
              />

              <Route
                exact
                path="/customer-history"
                component={CustomerHistory}
              />

              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/services-menu/:value"
                component={MenuBusinessCategory}
              />
              <Route
                exact
                path="/services-menu-category/:id/:category"
                component={MenuServicesBusiness}
              />
              <Route
                exact
                path="/confirm/:title/:id"
                component={ConfirmLogin}
              />
              <Route exact path="/reserve/:id" component={ReserveAppointment} />
              <Route
                exact
                path="/reserve/invited/:id"
                component={ReserveAppointmentInvited}
              />

              <Route
                exact
                path="/password-recovery/:value"
                component={PasswordRecovery}
              />
              <Route
                exact
                path="/password-recovery-otp/:value"
                component={PasswordOTP}
              />
              <Route
                exact
                path="/password-restore/:value"
                component={PasswordRestore}
              />
              <Route
                exact
                path="/reserve-complete"
                component={ReserveComplete}
              />
              <Route
                exact
                path="/quejas-y-reclamaciones"
                component={Complains}
              />
              <Route exact path="/cookie-policy" component={CookiePolicy} />
            </StyledMain>
          </Switch>
          <Footer />
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

import React, { useState } from "react";
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from "react-cookie-consent";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/styles";
import { ExpandMore } from "@material-ui/icons";
import "animate.css";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "0px 2px 2px 0px rgb(0 0 0 / 20%)",
    marginBottom: "0.8rem",
    position: "relative",
    transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",

    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "16px 0 12px 0",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: "0px 16px",
    minHeight: 36,
    transition:
      "min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&$expanded": {
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      minHeight: 40,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    margin: "8px 16px 0px 16px",
  },
}))(MuiAccordionDetails);

export const CookiesBanner = () => {
  const [cookie, setCookie] = useState(false);
  // console.log(getCookieConsentValue("acceptCookies"));
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        enableDeclineButton
        declineButtonText="Configuración de cookies"
        onDecline={() => {
          Cookies.remove("acceptCookies");
          setCookie(true);
          // console.log(cookie);
        }}
        flipButtons
        disableStyles
        cookieName="acceptCookies"
        buttonWrapperClasses="buttonWrap"
        buttonClasses="buttonAcceptClass"
        declineButtonClasses="buttonDeclineClass"
        containerClasses="animate__animated animate__backInLeft cookie-container"
      >
        <h2>Política general sobre Cookies</h2>
        <p style={{ textAlign: "center" }}>
          Esta página web usa cookies para mejorar la experiencia del usuario.
        </p>
        <p style={{ textAlign: "center" }}>
          <a href="/">Políticas de cookies</a>
        </p>
      </CookieConsent>
      {cookie === true ? (
        <>
          {console.log(cookie)}
          <CookieConsent
            location="bottom"
            buttonText="Aceptar"
            enableDeclineButton
            declineButtonText="Solo las funcionales"
            flipButtons
            disableStyles
            cookieName="acceptCookies"
            buttonWrapperClasses="buttonWrap"
            buttonClasses="buttonAcceptClass"
            declineButtonClasses="buttonDeclineClass"
            containerClasses="animate__animated animate__backInLeft cookie-container"

            // buttonClasses="files"
          >
            <div className="wraper">
              <h2>Configuración de Cookies</h2>
              <p style={{ textAlign: "justify", padding: "0 5px" }}>
                En Sepáralo.pe nos preocupamos por mejorar la experiencia de
                usuario, protegiendo tus datos personales. En consecuencia
                Sepáralo.pe, usa dos tipos de cookies las Funcionales y
                Analítica y Optimización.
              </p>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ color: "#5829dd" }} />}
                  className="font-tittle"
                >
                  Funcionales
                </AccordionSummary>
                <AccordionDetails
                  className="font"
                  style={{ textAlign: "justify" }}
                >
                  Son las que permiten la navegación óptima y el acceso a áreas
                  seguras de la página web. La página web no podrá funcionar
                  adecuadamente sin estas cookies. Con éstas también nos
                  aseguramos que se cumpla la ley de protección de datos
                  personales. Le informamos de que puede configurar su navegador
                  para bloquear o alertar sobre estas cookies, sin embargo, es
                  posible que determinadas áreas de la página web no funcionen.
                  Estas cookies no almacenan ninguna información de
                  identificación personal.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ color: "#5829dd" }} />}
                  className="font-tittle"
                >
                  Analíticas y Optimización
                </AccordionSummary>
                <AccordionDetails
                  className="font"
                  style={{ textAlign: "justify" }}
                >
                  Son aquellas que permiten al Editor de las mismas, el
                  seguimiento y análisis del comportamiento de los usuarios de
                  los sitios web a los que están vinculados. La información
                  recogida mediante este tipo de cookies se utiliza en la
                  medición de la actividad de los sitios web, aplicación o
                  plataforma y para la elaboración de perfiles de navegación,
                  con el fin de introducir mejoras en función del análisis de
                  los datos de uso que hacen los usuarios del servicio.
                </AccordionDetails>
              </Accordion>
              <p style={{ textAlign: "center" }}>
                <a href="/">Políticas de cookies</a>
              </p>
            </div>
          </CookieConsent>
        </>
      ) : null}
    </div>
  );
};

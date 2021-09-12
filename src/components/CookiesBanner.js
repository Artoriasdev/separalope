import React from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import "animate.css";

export const CookiesBanner = () => {
  console.log(getCookieConsentValue());
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        enableDeclineButton
        declineButtonText="Rechazar"
        flipButtons
        declineButtonStyle={{
          borderRadius: "4px",
          textAlign: "center",
          width: "80px",
          justifyContent: "center",
        }}
        buttonStyle={{
          background: "#ffdd00",
          color: "black",
          fontWeight: "bold",
          borderRadius: "4px",

          width: "80px",
          justifyContent: "center",
        }}
        cookieName="acceptCookies"
        style={{
          background: "white",
          width: "30%",
          margin: "40px",
          color: "black",
          borderRadius: "10px",
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        }}
        containerClasses="animate__animated animate__backInLeft"
        buttonClasses="files"
      >
        <p style={{ textAlign: "center" }}>
          Esta página web usa cookies para mejorar la experiencia del usuario.
        </p>
        <p style={{ textAlign: "center" }}>
          <a href="/">Políticas de cookies</a>
        </p>
      </CookieConsent>
    </div>
  );
};

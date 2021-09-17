import React from "react";
import PropTypes from "prop-types";
import "animate.css";

const ModalText = ({ children, show, closeCallback, disabled }) => (
  <div
    className="mdal animate__animated animate__fadeIn"
    style={{ display: show ? "block" : "none" }}
  >
    <div className="overlay" />
    <div className="mdal_content">
      <div style={{ color: "#EE3224", fontWeight: "bold", fontSize: "24px" }}>
        Sepáralo pe!
      </div>
      {children}
      <div className="btn--container">
        <input
          type="submit"
          className="btn__aceptar"
          onClick={closeCallback}
          value="ACEPTAR"
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);

ModalText.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
};

ModalText.defaultProps = {
  children: <div>Empty modal</div>,
  show: false,
  closeCallback: () => false,
};

export default ModalText;

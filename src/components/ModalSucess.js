import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, show, closeCallback }) => (
  <div className="mdal " style={{ display: show ? "block" : "none" }}>
    <div className="overlay" onClick={closeCallback} />
    <div className="mdal_content">
      <div style={{ color: "#EE3224", fontWeight: "bold", fontSize: "24px" }}>
        Sepáralo pe!
      </div>
      {children}
      {/* Registro grabado satisfactoriamente */}
      <button title="Cerrar" className="close_modal" onClick={closeCallback}>
        X
      </button>
      <div className="btn--container">
        <input
          type="submit"
          className="btn__aceptar"
          onClick={closeCallback}
          value="ACEPTAR"
        />
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
};

Modal.defaultProps = {
  children: <div>Empty Modal</div>,
  show: false,
  closeCallback: () => false,
};

export default Modal;

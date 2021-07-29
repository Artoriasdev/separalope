import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

const ModalForm = ({ show, closeCallback }) => (
  <div className="mini" style={{ display: show ? "block" : "none" }}>
    <div className="overlay" onClick={closeCallback} />
    <div className="mini_content">
      <div
        style={{
          color: "#EE3224",
          fontWeight: "bold",
          fontSize: "24px",
          paddingBottom: "10px",
        }}
      >
        Separalo pe!
      </div>

      <form name="formRegister">
        <div className="files">
          <TextField
            name="razon"
            className="TxtField"
            variant="outlined"
            placeholder="Razón social"
            fullWidth
            value=""
            style={{
              marginRight: "5px",
              marginBottom: "5px",
            }}
            // inputProps={{
            //   maxLength: 9,
            // }}
            onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />

          <TextField
            name="razon"
            className="TxtField"
            variant="outlined"
            placeholder="Razón social"
            fullWidth
            value=""
            style={{
              marginLeft: "5px",
              marginBottom: "5px",
            }}
            // inputProps={{
            //   maxLength: 9,
            // }}
            onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <div className="btn--container" style={{ display: "flex" }}>
            <input
              type="submit"
              className="btn btn-primary btn-block"
              onClick={closeCallback}
              value="CREAR SERVICIO"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

ModalForm.propTypes = {
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
};

ModalForm.defaultProps = {
  show: false,
  closeCallback: () => false,
};

export default ModalForm;

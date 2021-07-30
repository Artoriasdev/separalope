import { Formik } from "formik";
import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../../utils/utilitaries";

export class FormService extends Component {
  handleSubmitting = (formModel) => {
    console.log(formModel);
  };

  render() {
    return (
      <Formik
        ref={(ref) => (this.form = ref)}
        initialValues={{
          servicio: "",
          descripcion: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const formModel = {
            service: "",
            description: "",
          };

          formModel.service = values.servicio;
          formModel.description = values.descripcion;

          this.handleSubmitting(formModel);
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        }) => (
          <form name="formSubmit" onSubmit={handleSubmit}>
            <h1>Crear nuevo Servicio</h1>
            <hr />
            <div>
              <TextField
                name="servicio"
                className="TxtField"
                variant="outlined"
                label="Servicio"
                fullWidth
                value={values.servicio}
                error={errors.servicio && touched.servicio}
                onBlur={handleBlur}
                onChange={handleChange}
                onInput={handleRegexDisable("")}
                style={{ margin: "20px 0 0 0" }}
              />
            </div>
            <div>
              <TextField
                name="descripcion"
                className="TxtField"
                variant="outlined"
                label="Descripcion"
                fullWidth
                value={values.descripcion}
                error={errors.descripcion && touched.descripcion}
                onBlur={handleBlur}
                onChange={handleChange}
                onInput={handleRegexDisable("")}
                style={{ margin: "20px 0 10px 0" }}
              />
            </div>
            <div>
              <Button
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                className="btn-primary"
                style={{ margin: "20px 0" }}
                type="submit"
              >
                Crear
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

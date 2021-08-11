import { Formik } from "formik";
import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../../utils/utilitaries";
import axios from "axios";

export class Form extends Component {
  handleSubmitting = (formModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/registerPreCategory";

    const rspApi = axios
      .post(linkRegisterApi, formModel, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        return response;
      });

    return rspApi;
  };

  render() {
    return (
      <>
        <Formik
          ref={(ref) => (this.form = ref)}
          initialValues={{
            categoria: "",
            descripcion: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const formModel = {
              name: "",
              description: "",
            };

            formModel.name = values.categoria;
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
              <h1>Crear nueva categoria</h1>
              <hr />
              <div>
                <TextField
                  name="categoria"
                  className="TxtField"
                  variant="outlined"
                  label="Categoria"
                  fullWidth
                  value={values.categoria}
                  error={errors.categoria && touched.categoria}
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
              <div>{/* añadir nota de advertencia */}</div>
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
      </>
    );
  }
}

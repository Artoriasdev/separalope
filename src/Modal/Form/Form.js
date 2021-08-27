import { Formik } from "formik";
import React, { Component } from "react";
import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../../utils/utilitaries";
import axios from "axios";
import { Announcement } from "@material-ui/icons";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      response: false,
      message: "",
    };
  }

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
        const { data } = response;
        console.log(data);
        if (data.response === "true") {
          this.setState({
            modal: true,
            response: true,
            message: data.message,
          });
        } else if (data.response === "false") {
          this.setState({
            modal: true,
            message: data.message,
          });
        }
        return response;
      });

    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.response === true) {
      this.props.close();
    }
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.modal}>
            <div className="modal-message-container">
              <p>{this.state.message}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.handleClose}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
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
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#ededed",
                  borderRadius: "10px",
                  height: "60px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Announcement
                    style={{
                      fontSize: "20px",
                      verticalAlign: "middle",
                      marginRight: "5px",
                      color: "#ffb80f",
                    }}
                  />
                  <span>
                    Recuerda que tus categorías creadas, podrán ser activadas
                    dentro de 24 horas.
                  </span>
                </div>
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
      </>
    );
  }
}

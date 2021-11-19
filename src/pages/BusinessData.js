import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import axios from "axios";
import { CancelOutlined, Save } from "@material-ui/icons";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import Image from "../assets/images/Vector.svg";
import Upload from "../assets/images/Upload.svg";
// import FullPageLoader from "./FullPageLoader";

const styles = (theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      cursor: "pointer",
    },
    "& .MuiInputBase-input": {
      cursor: "pointer",
    },
  },
});

class BusinessData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: [],
      typeDocs: [],
      typeDistryc: [],
      typeProvince: [],
      logo: "",
      banner: "",
      name: "",
      edit: this.props.edit,
      modal: false,
      message: "",
      isLoading: false,
      forceRedirect: false,
      response: false,
    };
  }

  componentDidMount() {
    try {
      (async () => {
        this.setState({
          logo: sessionStorage.getItem("logo") || "",
          banner: sessionStorage.getItem("banner") || "",
        });
        await this.handleGetData();
        this.handleGetDocuments();
        this.handleGetProvinces();
      })();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    if (this.state.edit !== this.props.edit) {
      this.setState({ edit: this.props.edit });
    }
  }

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusiness`;

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            console.log(data);
            // sessionStorage.setItem("tradename", data[0].name);
            this.setState({
              typeData: data,
              // logo: data[0].logo,
              // name: data[0].name,
            });
            // sessionStorage.setItem("logo", this.state.typeData[0].logo);

            const Formik = this.form;
            Formik.setFieldValue("nombreCompañia", this.state.typeData[0].name);
            Formik.setFieldValue(
              "nombreComercial",
              this.state.typeData[0].tradename
            );
            Formik.setFieldValue(
              "numeroDocumento",
              this.state.typeData[0].documentNumber
            );
            Formik.setFieldValue("correo", this.state.typeData[0].email);
            Formik.setFieldValue("direccion", this.state.typeData[0].address);
            Formik.setFieldValue("distrito", this.state.typeData[0].district);
            Formik.setFieldValue("provincia", this.state.typeData[0].province);
            this.handleGetDistrics(this.state.typeData[0].province);
            Formik.setFieldValue(
              "tarjeta",
              this.state.typeData[0].cardDescription
            );
            Formik.setFieldValue(
              "descripcion",
              this.state.typeData[0].businessDescription
            );
            Formik.setFieldValue(
              "nombres",
              this.state.typeData[0].legalRepresentativeName
            );
            Formik.setFieldValue(
              "apellidos",
              this.state.typeData[0].legalRepresentativeLastName
            );
            Formik.setFieldValue(
              "documentos",
              this.state.typeData[0].legalRepresentativeDocumentType
            );
            Formik.setFieldValue(
              "numDocumento",
              this.state.typeData[0].legalRepresentativeDocumentNumber
            );
          } else {
            this.setState({
              modal: true,
              message: "Usted no está autorizado para ver esta información",
              forceRedirect: true,
            });
          }
          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              modal: true,
              message: "Sesión expirada, porfavor vuelva a iniciar sesión",
              isLoading: false,
              forceRedirect: true,
            });
          } else {
            this.setState({
              modal: true,
              message:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };
  handleEditData = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/updateBusiness`;

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);
        this.setState({
          isLoading: true,
        });
        if (response.data.response === "true") {
          this.setState({
            modal: true,
            message: response.data.message,
            isLoading: false,
            response: true,
          });
        }
        return response;
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401) {
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("logo");
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("tradename");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("id");
          this.setState({
            modal: true,
            message: "Sesión expirada, porfavor vuelva a iniciar sesión",
            isLoading: false,
            forceRedirect: true,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          });
        }
      });

    return rspApi;
  };

  handleGetDocuments = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDocumentTypes`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        // console.log(data);
        const element = data.filter(
          (element) => element.descriptionLarge !== "RUC"
        );

        // console.log(element);

        this.setState({
          typeDocs: element,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };
  handleGetProvinces = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getProvinces`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        // console.log(data);

        this.setState({
          typeProvince: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };
  handleGetDistrics = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDistricts/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        // console.log(data);

        this.setState({
          typeDistryc: data,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
        });
      });
    return rspApi;
  };

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "documentos") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
      const { documentos } = formik.state.values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = this.state.typeDocs.find(
        (arreglo) => arreglo.id === documentos
      );
      if (id === undefined) {
        this.setState({
          modal: true,
          message: "Porfavor elija el Tipo de documento",
        });
      } else {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (documentos === "04" || documentos === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue("ingreso", valor, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };
  handleProvinceChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "provincia") {
      formik.setFieldValue(formField, value, true);
      this.handleGetDistrics(value);
      formik.setFieldValue("distrito", "", false);
    }
    if (formField === "distrito") {
      console.log(value);
      formik.setFieldValue(formField, value, true);
    }
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    if (this.state.forceRedirect === true) {
      this.props.history.push("/login/B");
      this.props.history.go();
    } else if (this.state.response === true) {
      this.props.history.go();
    }
  };

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleAttach = (e) => {
    try {
      let file = e.target.files[0];
      let ext = file.name.split(".").pop();
      // console.log(file.name);
      // console.log(file);
      // console.log(ext);

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          this.setState({
            logo: file.name,
          });
          sessionStorage.setItem("logo", file.name);
          this.handleUploadLogoBusiness(file);
          // console.log(sizeFile);
        } else {
          this.setState({
            modal: true,
            message: "La foto debe pesar menos de 1mb",
          });
        }
      } else {
        this.setState({
          modal: true,
          message: "El archivo debe ser formato .jpg ,jpeg o .png",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = () => {
    this.setState({
      logo: "",
    });
  };
  handleBannerDelete = () => {
    this.setState({
      banner: "",
    });
  };

  handleAttachClick = () => {
    document.querySelector("#foto").click();
  };

  handleAttachBannerClick = () => {
    document.querySelector("#banner").click();
  };
  handleAttachBanner = (e) => {
    try {
      let file = e.target.files[0];
      let ext = file.name.split(".").pop();
      // console.log(file.name);
      // console.log(file);
      // console.log(ext);

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          this.setState({
            banner: file.name,
          });
          sessionStorage.setItem("banner", file.name);
          // this.handleUploadLogoBusiness(file);
          // console.log(sizeFile);
        } else {
          this.setState({
            modal: true,
            message: "La foto debe pesar menos de 1mb",
          });
        }
      } else {
        this.setState({
          modal: true,
          message: "El archivo debe ser formato .jpg ,jpeg o .png",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleUploadLogoBusiness = async (logo) => {
    let data = new FormData();
    data.append("file", logo);
    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/uploadLogoBusiness`;

    const rspApi = axios
      .post(linkEditApi, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);

        if (response.data.response === "true") {
          this.props.history.go();
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("tradename");
          sessionStorage.removeItem("logo");
          this.setState({
            modal: true,
            unableText: "Su sesión ha expirado. Vuelva a intentarlo.",
            forceRedirect: true,
          });
        } else {
          this.setState({
            modal: true,
            message:
              "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            isLoading: false,
          });
        }
      });

    return rspApi;
  };

  render() {
    const { classes } = this.props;
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
            nombreCompañia: "",
            nombreComercial: "",
            numeroDocumento: "",
            correo: "",
            direccion: "",
            distrito: "",
            provincia: "",
            tarjeta: "",
            descripcion: "",
            nombres: "",
            apellidos: "",
            documentos: "",
            numDocumento: "",
            maxLengthValue: 8,
            minLengthValue: 8,
          }}
          validate={(values) => {
            const { numeroDocumento, correo, numDocumento, minLengthValue } =
              values;

            let errors = {};

            if (numeroDocumento.length < 11) {
              errors.numeroDocumento =
                "El número de documento debe ser de 11 dígitos.";
            }

            if (!numDocumento) {
              errors.numDocumento = "";
            } else if (numDocumento.length < minLengthValue) {
              errors.numDocumento = `*El número de documento debe tener un mínimo de ${minLengthValue} dígitos`;
            }

            if (!EMAIL_REGEXP.test(correo)) {
              errors.correo = EMAIL_INVALID;
            } else if (correo.length < E_MINLENGTH) {
              errors.correo = EMAIL_MINLENGTH;
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const dataModel = {
              businessName: "",
              tradeName: "",
              documentNumber: "",
              email: "",
              cardDescription: "",
              businessDescription: "",
              address: "",
              province: "",
              district: "",
              legalRepresentativeName: "",
              legalRepresentativeLastName: "",
              legalRepresentativeDocumentType: "",
              legalRepresentativeDocumentNumber: "",
            };

            dataModel.businessName = values.nombreCompañia.trim();
            dataModel.tradeName = values.nombreComercial.trim();
            dataModel.documentNumber = values.numeroDocumento;
            dataModel.email = values.correo.trim();
            dataModel.cardDescription = values.tarjeta.trim();
            dataModel.businessDescription = values.descripcion.trim();
            dataModel.address = values.direccion.trim();
            dataModel.province = values.provincia;
            dataModel.district = values.distrito;
            dataModel.legalRepresentativeName = values.nombres.trim();
            dataModel.legalRepresentativeLastName = values.apellidos.trim();
            dataModel.legalRepresentativeDocumentType = values.documentos;
            dataModel.legalRepresentativeDocumentNumber = values.numDocumento;

            (async () => {
              await this.handleEditData(dataModel);
            })();
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
            <form
              name="formData"
              onSubmit={handleSubmit}
              style={{ marginTop: "50px" }}
            >
              <div className="files">
                <div className="txt-left">
                  <TextField
                    name="nombreCompañia"
                    className="TxtField"
                    variant="outlined"
                    label="Razón Social"
                    fullWidth
                    value={values.nombreCompañia}
                    error={errors.nombreCompañia && touched.nombreCompañia}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    required
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-mid">
                  <TextField
                    name="nombreComercial"
                    className="TxtField"
                    variant="outlined"
                    label="Nombre comercial"
                    fullWidth
                    value={values.nombreComercial}
                    error={errors.nombreComercial && touched.nombreComercial}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    disabled={!this.state.edit}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-right">
                  <TextField
                    name="numeroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="RUC"
                    fullWidth
                    value={values.numeroDocumento}
                    error={errors.numeroDocumento && touched.numeroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    required
                    inputProps={{
                      maxLength: 11,
                    }}
                    onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error"
                    name="numeroDocumento"
                    component="div"
                  />
                </div>
              </div>
              <div className="files">
                <div className="txt-left">
                  <TextField
                    name="correo"
                    className="TxtField"
                    variant="outlined"
                    label="Correo de la empresa"
                    fullWidth
                    value={values.correo}
                    error={errors.correo && touched.correo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error"
                    name="correo"
                    component="div"
                  />
                </div>
                <div className="txt-mid">
                  <TextField
                    name="direccion"
                    className="TxtField"
                    variant="outlined"
                    label="Dirección"
                    fullWidth
                    value={values.direccion}
                    error={errors.direccion && touched.direccion}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-right">
                  <Select
                    style={{
                      backgroundColor: "white",
                    }}
                    fullWidth
                    variant="outlined"
                    value={values.provincia}
                    error={errors.provincia && touched.provincia}
                    name="provincia"
                    displayEmpty
                    disabled={!this.state.edit}
                    required
                    onChange={this.handleProvinceChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem disabled value={""}>
                      <span className="empty--option">Provincia</span>
                    </MenuItem>
                    {this.state.typeProvince &&
                      this.state.typeProvince.map(({ key, value }) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="files">
                <div className="txt-left">
                  <Select
                    style={{
                      backgroundColor: "white",
                    }}
                    fullWidth
                    variant="outlined"
                    value={values.distrito}
                    error={errors.distrito && touched.distrito}
                    name="distrito"
                    displayEmpty
                    required
                    disabled={!this.state.edit}
                    onChange={this.handleProvinceChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem disabled value={""}>
                      <span className="empty--option">Distrito</span>
                    </MenuItem>
                    {this.state.typeDistryc &&
                      this.state.typeDistryc.map(({ key, value }) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
                <div className="logos">
                  <div className="content">
                    <div className="txt-mid-content">
                      <TextField
                        name="input"
                        className={`${classes.root} Input`}
                        variant="outlined"
                        placeholder="Subir imagen logo"
                        onClick={
                          this.state.logo === "" ? this.handleAttachClick : null
                        }
                        fullWidth
                        type="text"
                        value={this.state.logo}
                        InputProps={
                          this.state.logo !== ""
                            ? {
                                startAdornment: (
                                  <InputAdornment>
                                    <img src={Image} alt="imagen" />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <IconButton
                                    position="end"
                                    size="small"
                                    onClick={this.handleDelete}
                                  >
                                    <CancelOutlined />
                                  </IconButton>
                                ),
                              }
                            : {
                                endAdornment: (
                                  <IconButton position="end" size="small">
                                    <img src={Upload} alt="upload" />
                                  </IconButton>
                                ),
                              }
                        }
                      />
                      <input
                        id="foto"
                        name="foto"
                        type="file"
                        onChange={this.handleAttach}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="txt-right-content">
                      <TextField
                        name="banner"
                        className={`${classes.root} Input`}
                        variant="outlined"
                        placeholder="Imagen Banner"
                        fullWidth
                        type="text"
                        onClick={
                          this.state.banner === ""
                            ? this.handleAttachBannerClick
                            : null
                        }
                        value={this.state.banner}
                        InputProps={
                          this.state.banner !== ""
                            ? {
                                startAdornment: (
                                  <InputAdornment>
                                    <img src={Image} alt="imagen" />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <IconButton
                                    position="end"
                                    size="small"
                                    onClick={this.handleBannerDelete}
                                  >
                                    <CancelOutlined />
                                  </IconButton>
                                ),
                              }
                            : {
                                endAdornment: (
                                  <IconButton position="end" size="small">
                                    <img src={Upload} alt="Upload" />
                                  </IconButton>
                                ),
                              }
                        }
                      />
                      <input
                        id="banner"
                        name="baner"
                        type="file"
                        onChange={this.handleAttachBanner}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  <p>
                    *Tamaño recomendado para las imágenes: Logotipo: 300 x
                    250px. Banner 1024 x 580px.
                    <br />* Formato en JPG o PNG.
                  </p>
                </div>
              </div>
              <div className="files">
                <div className="txt-left-nomid">
                  <TextField
                    name="tarjeta"
                    className="TxtField"
                    variant="outlined"
                    label="Descripción de la tarjeta"
                    placeholder="Max. 200 caracteres"
                    multiline
                    minRows={4}
                    fullWidth
                    value={values.tarjeta}
                    error={errors.tarjeta && touched.tarjeta}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    inputProps={{
                      maxLength: 200,
                    }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-right-nomid">
                  <TextField
                    name="descripcion"
                    className="TxtField"
                    variant="outlined"
                    label="Descripción del negocio"
                    placeholder="Max. 500 caracteres"
                    multiline
                    minRows={4}
                    fullWidth
                    value={values.descripcion}
                    error={errors.descripcion && touched.descripcion}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    inputProps={{
                      maxLength: 500,
                    }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
              </div>
              <h3>Datos del Representante Legal</h3>
              <div className="files">
                <div className="txt-quarter">
                  <TextField
                    name="nombres"
                    className="TxtField"
                    variant="outlined"
                    label="Nombres"
                    fullWidth
                    value={values.nombres}
                    error={errors.nombres && touched.nombres}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    inputProps={{
                      maxLength: 200,
                    }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-quarter">
                  <TextField
                    name="apellidos"
                    className="TxtField"
                    variant="outlined"
                    label="Apellidos"
                    fullWidth
                    value={values.apellidos}
                    error={errors.apellidos && touched.apellidos}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!this.state.edit}
                    inputProps={{
                      maxLength: 500,
                    }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>
                <div className="txt-quarter">
                  <Select
                    style={{
                      backgroundColor: "white",
                    }}
                    fullWidth
                    variant="outlined"
                    value={values.documentos}
                    error={errors.documentos && touched.documentos}
                    name="documentos"
                    displayEmpty
                    required
                    disabled={!this.state.edit}
                    onChange={this.handleDocumentChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem disabled value={""}>
                      <span className="empty--option">Tipo de documento</span>
                    </MenuItem>
                    {this.state.typeDocs &&
                      this.state.typeDocs.map(({ id, descriptionLarge }) => (
                        <MenuItem key={id} value={id}>
                          {descriptionLarge}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
                <div className="txt-quarter">
                  <TextField
                    name="numDocumento"
                    className="TxtField"
                    variant="outlined"
                    placeholder="Número de documento"
                    required
                    disabled={!this.state.edit}
                    fullWidth
                    value={values.numDocumento}
                    error={errors.numDocumento && touched.numDocumento}
                    onBlur={handleBlur}
                    onChange={this.handleDocumentChange}
                    inputProps={{
                      maxLength: values.maxLengthValue,
                      minLength: values.minLengthValue,
                    }}
                    autoComplete="off"
                    onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <ErrorMessage
                    className="error bottom"
                    name="numDocumento"
                    component="div"
                  />
                </div>
              </div>
              {/* <div className="files"></div> */}
              {this.state.edit ? (
                <div className="files" style={{ float: "right" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="btn-primary"
                    startIcon={<Save />}
                    style={{ marginTop: "10px" }}
                  >
                    Guardar
                  </Button>
                </div>
              ) : null}
            </form>
          )}
        </Formik>
        <div className="files" style={{ float: "right" }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className="btn-primary"
            style={{ marginTop: "10px" }}
          >
            Regresar
          </Button>
        </div>
      </>
    );
  }
}
export default withStyles(styles)(BusinessData);

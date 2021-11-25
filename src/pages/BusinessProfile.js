import {
  AppBar,
  Breadcrumbs,
  Button,
  Link,
  Tabs,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import React, { Component } from "react";
import { LinkTab } from "../Nav Tabs/LinkTab";
import { TabPanel } from "../Nav Tabs/TabPanel";
import {
  Edit,
  ImageOutlined,
  NavigateNext,
  PhotoCamera,
} from "@material-ui/icons";
import BusinessDataBank from "./BusinessDataBank";
import BusinessData from "./BusinessData";
import Image from "../assets/images/Vector.svg";
import Upload from "../assets/images/Upload.svg";
import axios from "axios";

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      edit: true,
      modal: false,
      message: "",
      forceRedirect: false,
      banner: "",
      logo: "",
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount() {
    if (sessionStorage.getItem("workflow") !== "B") {
      this.props.history.push("/");
    } else {
      this.handleGetData();
    }
  }

  handleAttach = (e) => {
    try {
      var file = this.state.logo;
      file = e.target.files[0];
      let ext = file.name.split(".").pop();

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          console.log(file, "logo");
          this.handleUploadLogoBusiness(file);
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

  handleAttachBanner = (e) => {
    try {
      let file = "";
      file = e.target.files[0];
      let ext = file.name.split(".").pop();

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          // console.log(file, "banner");
          this.handleUploadBannerBusiness(file);
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

  handleAttachClick = () => {
    document.querySelector("#foto").click();
  };

  handleAttachBannerClick = () => {
    document.querySelector("#banner").click();
  };

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

            this.setState({
              banner: data[0].imageBig,
              logo: data[0].logo,
            });

            console.log(this.state.banner, this.state.logo);
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

  handleUploadLogoBusiness = async (logo) => {
    let data = new FormData();
    data.append("file", logo);
    // for (var key of data.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
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
  handleUploadBannerBusiness = async (banner) => {
    let data = new FormData();
    data.append("file", banner);
    // for (var key of data.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/uploadBannerBusiness?file`;

    const rspApi = axios
      .post(linkEditApi, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);

        if (response.data.response === "true") {
          this.props.history.go();
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
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

  handleEdit = () => {
    this.setState({ edit: true });
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
  render() {
    return (
      <div className="page-container" style={{ padding: "0", width: "100%" }}>
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
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ margin: "30px" }}
        >
          <Link href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Mi Perfil
          </Link>
          <Link
            color="textSecondary"
            href="/business/profile"
            // onClick={handleClick}
          >
            Datos de negocio
          </Link>
        </Breadcrumbs>
        <div className="profile-container">
          <div className="form-profile">
            <h1>Datos de negocio</h1>
          </div>
          <hr />
          <div className="business-profile-container">
            <div className="picture-container">
              <div
                className="banner-container-profile"
                onClick={this.handleAttachBannerClick}
                style={{
                  backgroundColor:
                    this.state.banner === undefined ? "gray" : "",
                }}
              >
                <input
                  id="banner"
                  type="file"
                  name="foto"
                  style={{ display: "none" }}
                  onChange={this.handleAttachBanner}
                />
                {this.state.banner !== undefined ? (
                  <img
                    src={this.state.banner}
                    alt="banner"
                    title="banner"
                    style={{ height: "300px" }}
                  />
                ) : null}

                <div className="banner-background-hover" />
                <div className="banner-hover">
                  <ImageOutlined
                    fontSize="large"
                    style={{ fontSize: "40px" }}
                  />
                  <p>Subir imagen de banner</p>
                </div>
              </div>
              <p>
                *Tamaño recomendado para las imágenes: Logotipo: 300 x 250px.
                Banner 1024 x 580px.
                <br />
                *Formato en JPG o PNG.
              </p>
              <div
                className="logo-container-profile"
                onClick={this.handleAttachClick}
                style={{
                  backgroundColor: this.state.logo === undefined ? "gray" : "",
                }}
              >
                <input
                  id="foto"
                  type="file"
                  name="foto"
                  style={{ display: "none" }}
                  onChange={this.handleAttach}
                />
                {this.state.logo !== undefined ? (
                  <img src={this.state.logo} alt="logo" title="logo" />
                ) : null}
                <div className="logo-background-hover" />
                <div className="logo-hover">
                  <PhotoCamera fontSize="large" style={{ fontSize: "40px" }} />
                  <p>Subir logo</p>
                </div>
              </div>
            </div>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                borderBottom: "1px solid gray",
              }}
              elevation={0}
            >
              <Tabs
                variant="fullWidth"
                value={this.state.value}
                onChange={this.handleChange}
                aria-label="nav tabs example"
                TabIndicatorProps={{ style: { background: "black" } }}
                style={{ color: "black" }}
              >
                <LinkTab
                  label="Datos de la empresa"
                  href="/data"
                  className="font-p"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                />
                <LinkTab
                  label="Datos bancarios"
                  href="/bank"
                  className="font-p"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
              <BusinessData
                history={this.props.history}
                edit={this.state.edit}
              />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <BusinessDataBank
                history={this.props.history}
                edit={this.state.edit}
              />
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessProfile;

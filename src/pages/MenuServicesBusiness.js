import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { RatingService } from "../helpers/RatingService";
import Banner from "../components/BannerBusiness";

class MenuServicesBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      business: "",
      image: "",
      modal: false,
      message: "",
      logo: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") === "B") {
      this.props.history.push("/business/category");
    } else {
      try {
        this.handleGetServicesByBusiness();
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleGetServicesByBusiness = () => {
    const id = this.props.match.params.id;
    const cat = this.props.match.params.category;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusinessAndCategory/${id}/${cat}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          typeCategorys: data,
          business: data[0].tradenameBusiness,
          image: data[0].imageBig,
          logo: data[0].logoBusiness,
        });

        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          message:
            "Es posible que este negocio no tenga servicios dentro de esta categoría",
        });
      });

    return rspApi;
  };

  handleRedirect = (title, id) => {
    if (sessionStorage.getItem("tk") === null) {
      this.props.history.push(`/confirm/${title}/${id}`);
    } else {
      this.props.history.push(`/reserve/${id}`);
    }
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    this.props.history.goBack();
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
        <Banner
          negocio={this.state.business}
          imagen={JSON.stringify(this.state.image)}
          logo={this.state.logo}
        />

        <div
          className="page-container"
          style={{ padding: "50px 0 0 0 ", width: "90%", margin: " auto" }}
        >
          <div style={{ width: "100%", marginBottom: "30px" }}>
            <div className="service-description">
              <h1 style={{ marginRight: "30px", color: "black" }}>
                {this.state.typeCategorys[0] &&
                  this.state.typeCategorys[0].tradenameBusiness}
              </h1>
              <RatingService rate={5} style={{ marginTop: "5px" }} />
              <h3>
                {this.state.typeCategorys[0] &&
                  this.state.typeCategorys[0].businessAddress}
              </h3>
            </div>
            <div>
              <p style={{ opacity: "0.8", margin: "0", padding: "0" }}>
                {this.state.typeCategorys[0] &&
                  this.state.typeCategorys[0].businessDescription}
              </p>
            </div>
          </div>
          <div className="flip-container">
            {this.state.typeCategorys.map(
              ({ id, title, description, currencySymbol, price, duration }) => (
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  className="flip-card"
                  key={id}
                >
                  <FrontSide className="flip-card-background">
                    <div
                      className="flip-card-service"
                      style={{
                        height: "100%",
                      }}
                    >
                      <h3>{title}</h3>
                      <RatingService rate={5} style={{ marginTop: "5px" }} />
                      <span>
                        <br></br>
                      </span>
                      <p className="text">Precio</p>
                      <div className="price">
                        {currencySymbol} {price}
                      </div>
                      <p className="font-p text">Duración : {duration}</p>
                    </div>
                  </FrontSide>
                  <BackSide className="flip-card-background">
                    <div
                      className="flip-card-service"
                      style={{
                        height: "92%",
                      }}
                    >
                      <h3>{title}</h3>
                      <h4 style={{ textAlign: "justify" }}>{description}</h4>
                      <p>Duración : {duration}</p>
                    </div>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className=" btn_card"
                      onClick={() => this.handleRedirect(title, id)}
                      fullWidth
                    >
                      Separar cita
                    </Button>
                  </BackSide>
                </Flippy>
              )
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MenuServicesBusiness;

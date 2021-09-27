import React, { Component } from "react";
import Carousel from "../components/Carousel";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

import axios from "axios";
import {
  Backdrop,
  Button,
  Fade,
  InputAdornment,
  Modal,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { ArrowLeftSVG, ArrowRightSVG } from "../assets/images/svg";
// import FullPageLoader from "./FullPageLoader";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1500, min: 1200 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 1100, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <div className="arrow-container_left">
      <button onClick={() => onClick()}>
        <ArrowLeftSVG />
      </button>
    </div>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <div className="arrow-container_right">
      <button onClick={() => onClick()}>
        <ArrowRightSVG />
      </button>
    </div>
  );
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      isLoading: false,
      modal: false,
      message: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") === "B") {
      this.props.history.push("/business/category");
    } else {
      try {
        (async () => {
          await this.handleGetCategorys();
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        const rsp = response.data.response;
        this.setState({
          isLoading: true,
        });

        this.setState({
          typeCategorys: data,
        });
        if (rsp === "true") {
          this.setState({
            isLoading: false,
          });
        }
        // console.log(rsp);

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

  handleRedirect = (id) => {
    this.props.history.push(`/services-menu/${id}`);
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <div>
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
        {/* <FullPageLoader isLoading={this.state.isLoading} /> */}
        <Carousel />
        <div className="page-container">
          <div
            style={{
              height: "130px",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            {/* <div style={{ width: "36px", height: "36px" }}>
              <LogoSVG />
            </div> */}
            <div className="home-text">
              <h1>Nuestras categorías</h1>

              <h3 className="register__subtitle">
                Son 100% seguras vía internet en la comodidad de tu hogar <br />{" "}
                y en el horario que tú decidas.
              </h3>
            </div>
            <div className="home-search">
              <TextField
                name="search"
                label="Buscar categoría"
                id="filled-start-adornment"
                className="font-p"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
          </div>
          <CarouselItem
            swipeable={["mobile"] ? true : false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            // autoPlaySpeed={1000}
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            deviceType={this.props.deviceType}
            itemClass="carousel-item-padding-100-px"
            renderButtonGroupOutside={true}
            // customRightArrow={<CustomLefttArrow />}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {this.state.typeCategorys &&
              this.state.typeCategorys.map(
                ({ id, image, name, description }) => (
                  <div
                    className="flip-home"
                    onClick={() => this.handleRedirect(id)}
                    key={id}
                  >
                    <Flippy
                      flipOnHover={true}
                      flipOnClick={false}
                      flipDirection="horizontal"
                      className="flip-home-container"
                    >
                      <FrontSide
                        className="flip-home-front"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      ></FrontSide>
                      <BackSide className="flip-home-back">
                        <p>{description}</p>
                      </BackSide>
                    </Flippy>
                    <h3>{name}</h3>
                  </div>
                )
              )}
          </CarouselItem>
        </div>
      </div>
    );
  }
}

export default HomePage;

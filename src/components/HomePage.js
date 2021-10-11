import React, { Component } from "react";
import Carousel from "../components/Carousel";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "animate.css";

import axios from "axios";
import {
  Backdrop,
  Button,
  Fade,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { ArrowLeftSVG, ArrowRightSVG } from "../assets/images/svg";
// import FullPageLoader from "./FullPageLoader";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1700 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1700, min: 1200 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 1200, min: 0 },
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
      enterprises: [],
      isLoading: false,
      modal: false,
      message: "",
      list: false,
      identificadorName: "",
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

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/category/getCategories`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);
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

  handleGetBusinessByFilter = async (e) => {
    const { value, name } = e.target;
    this.setState({
      identificadorName: name,
    });
    console.log(this.state.identificadorName, this.state.enterprises);

    setTimeout(() => {
      if (value.length > 2) {
        var headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: ``,
        };

        let empresaApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessByFilter/${value}`;

        const responseEmp = axios
          .get(empresaApi, {
            headers: headers,
          })
          .then((response) => {
            const { data } = response.data;
            console.log(data);

            this.setState({
              enterprises: data,
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

        return responseEmp;
      } else if (value.length < 3) {
        this.setState({
          enterprises: [],
        });
      }
    }, 1000);
  };

  handleRedirect = (id) => {
    this.props.history.push(`/services-menu/${id}`);
  };

  handleRedirectWork = (id) => {
    this.props.history.push("/register/business");
  };

  handleRedirectBusiness = (id, category) => {
    this.props.history.push(`/services-menu-category/${id}/${category}`);
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
          <div className="home-container">
            {/* <div style={{ width: "36px", height: "36px" }}>
              <LogoSVG />
            </div> */}
            <div className="home-text">
              <h1>Nuestras categorías</h1>

              <h3 className="register__subtitle">
                Encuentra el servicio que estás buscando y sepáralo donde estés
                con toda seguridad
              </h3>
            </div>
            <div className="home-search">
              <TextField
                name="search"
                label="Buscar negocios"
                id="filled-start-adornment"
                autoComplete="off"
                className="font-p"
                variant="outlined"
                onChange={(e) => this.handleGetBusinessByFilter(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              {this.state.identificadorName === "search" && (
                <Paper className="autocomplete">
                  {this.state.enterprises.map(
                    ({ id, tradeName, idCategory }) => (
                      <MenuItem
                        // className="animate__animated animate__slideInUp"
                        onClick={(e) => {
                          this.handleRedirectBusiness(id, idCategory);
                        }}
                        key={id}
                      >
                        {tradeName}
                      </MenuItem>
                    )
                  )}
                </Paper>
              )}
            </div>
          </div>
          <br />
          <div className="carousel">
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
                          <div
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        </BackSide>
                      </Flippy>
                      <h3>{name}</h3>
                    </div>
                  )
                )}
            </CarouselItem>
          </div>

          <div
            onClick={() => this.handleRedirectWork(3)}
            style={{
              cursor: "pointer",
              marginLeft: "50px",
              marginRight: "50px",
              textAlign: "center",
            }}
          >
            <img
              src="https://www.qapaq.pe/wp-content/uploads/2020/06/Trabaja-con-Nosotros-1-51-960x250.png"
              alt="Trabaja con nosotros"
              title="Trabaja con nosotros"
              style={{
                width: "100%",
                height: "100%",
                marginTop: "20px",
                maxWidth: "1325px",
                maxHeight: "325px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

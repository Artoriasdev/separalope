import React, { Component } from "react";
import Carousel from "../components/Carousel";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

import axios from "axios";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { ArrowBack, Search } from "@material-ui/icons";
import {
  ArrowCircleSVG,
  ArrowLeftSVG,
  ArrowRightSVG,
  LogoSVG,
} from "../assets/images/svg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1400, min: 1000 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
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

        this.setState({
          typeCategorys: data,
        });
        console.log(data);

        return response;
      });
    return rspApi;
  };

  handleRedirect = (id) => {
    this.props.history.push(`/services-menu/${id}`);
  };

  render() {
    return (
      <div>
        <Carousel />
        <div
          className="page-container"
          style={{
            width: "80%",

            margin: "0 auto",
          }}
        >
          <div
            style={{
              height: "130px",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            <div style={{ position: "absolute" }}>
              <h1>Nuestros servicios</h1>

              <h3 className="register__subtitle">
                son 100% digitales vía zoom en la comodidad de tu hogar <br /> y
                en el horario que tú decidas.
              </h3>
            </div>

            <div style={{ float: "right", marginTop: "30px" }}>
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
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlay={this.props.deviceType !== "mobile" ? false : true}
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

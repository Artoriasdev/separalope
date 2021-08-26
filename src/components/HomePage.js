import React, { Component } from "react";
import Carousel from "../components/Carousel";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

import axios from "axios";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { LogoSVG } from "../assets/images/svg";

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

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
    };
  }

  componentDidMount() {
    try {
      (async () => {
        await this.handleGetCategorys();
      })();
    } catch (error) {
      console.log(error);
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

        return response;
      });
    return rspApi;
  };

  handleRedirect = (id, image, name, description) => {
    localStorage.setItem("image", image);
    localStorage.setItem("categoria", name);
    localStorage.setItem("description", description);
    this.props.history.push(`/services-menu/${id}`);
  };

  render() {
    return (
      <div>
        <Carousel />
        {/* <Cards /> */}
        <div
          style={{
            padding: "30px",
            width: "80%",
            margin: "0 auto",
            height: "120px",
          }}
        >
          <div>
            <div style={{ position: "absolute" }}>
              <h1 style={{ color: "#5829dd" }}>Nuestros servicios</h1>

              <h3 className="register__subtitle">
                son 100% digitales via zoom en la comodidad de tu hogar <br /> y
                en el horario que tu decidas.
              </h3>
            </div>

            <div style={{ float: "right", marginTop: "30px" }}>
              <TextField
                name="search"
                label="Buscar categoria"
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
        >
          {this.state.typeCategorys &&
            this.state.typeCategorys.map(({ id, image, name, description }) => (
              <div
                style={{
                  cursor: "pointer",
                  width: "272px",
                  margin: "auto",
                }}
                onClick={() =>
                  this.handleRedirect(id, image, name, description)
                }
                key={id}
              >
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  //ref={(r) => (this.flippy = r)}  to use toggle method like this.flippy.toggle()
                  // if you pass isFlipped prop component will be controlled component.
                  // and other props, which will go to div
                  style={{
                    width: "272px",
                    height: "272px",
                    margin: "auto",
                  }} /// these are optional style, it is not necessary
                >
                  <FrontSide
                    style={{
                      backgroundImage: `url(${image})`,
                      borderRadius: "4px",
                    }}
                  ></FrontSide>
                  <BackSide
                    style={{
                      backgroundColor: "#232323",
                      borderRadius: "4px",
                      textAlign: "justify",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        height: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      {description}
                    </p>
                  </BackSide>
                </Flippy>
                <h3 style={{ textAlign: "center", color: "#5829dd" }}>
                  {name}
                </h3>
              </div>
            ))}
        </CarouselItem>
      </div>
    );
  }
}

export default HomePage;

import Carousel from "react-material-ui-carousel";

import { Paper, Button } from "@material-ui/core";

import React, { Component } from "react";

function Project(props) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: "transparent",
      }}
      elevation={10}
    >
      <div
        style={{
          //   position: "relative",
          height: "60vh",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          //   textAlign: "center",
        }}
      >
        <div style={{ paddingTop: "15vh" }}>
          <h2 style={{ textAlign: "left" }}>
            {localStorage.getItem("categoria")}
          </h2>
          <p style={{ textAlign: "left", maxWidth: "600px" }}>
            {localStorage.getItem("description")}
          </p>
        </div>
      </div>
    </Paper>
  );
}

const items = [
  {
    name: "30%",
    subtittle: "en tu primera clase de",
    service: "entrenamiento",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas informacion",
    color: "#000000",
  },
];

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: false,
      animation: "none",
      indicators: false,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: true,
    };
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${localStorage.getItem("image")})`,
          backgroundSize: "100%",
          backgroundPositionY: "bottom",
        }}
      >
        <div style={{ background: "rgba(0, 0, 0, 0.3)" }}>
          <Carousel
            className="SecondExample"
            autoPlay={this.state.autoPlay}
            animation={this.state.animation}
            indicators={this.state.indicators}
            timeout={this.state.timeout}
            navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
            navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          >
            {items.map((item, index) => {
              return <Project item={item} key={index} />;
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Banner;

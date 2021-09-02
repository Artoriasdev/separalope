import React from "react";
import Carousel from "react-material-ui-carousel";

import { Paper, Button } from "@material-ui/core";

// import "../style/SecondExample.scss";

function Project(props) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: props.item.color,
      }}
      elevation={10}
    >
      <div
        style={{
          //   position: "relative",
          height: "100%",
          width: "50%",
          //   textAlign: "center",
        }}
      >
        <h1>{props.item.name}</h1>
        <p>{props.item.subtittle}</p>
        <h2>{props.item.service}</h2>
      </div>
      <div
        style={{
          //   position: "relative",
          width: "30%",
          height: "100%",
          marginTop: "5vw",
          //   textAlign: "center",
        }}
      >
        <p>{props.item.description1}</p>
        <p style={{ marginTop: "50px" }}>{props.item.description2}</p>
        <Button className="CheckButton">Click aquí</Button>
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
    description2: "Si quieres mas información",
    color: "#000000",
  },
  {
    name: "40%",
    subtittle: "en tu primera clase de",
    service: "yoga",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas información",
    color: "#000000",
  },
  {
    name: "80%",
    subtittle: "en tu primera clase de",
    service: "alpinismo",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas información",
    color: "#000000",
  },
];

export default class MyProjectsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "slide",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: true,
      navButtonsAlwaysInvisible: false,
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: "#000000" }}>
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
    );
  }
}

import Carousel from "react-material-ui-carousel";

import { Paper } from "@material-ui/core";

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
      <div className="content">
        <div className="title">
          <h2>{props.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        </div>
      </div>
    </Paper>
  );
}

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
        className="banner-container"
        style={{
          backgroundImage: `url(${this.props.image})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="carousel-background">
          <Carousel
            className="SecondExample"
            autoPlay={this.state.autoPlay}
            animation={this.state.animation}
            indicators={this.state.indicators}
            timeout={this.state.timeout}
            navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
            navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          >
            <Project
              name={this.props.name}
              description={this.props.description}
            />
            ;
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Banner;

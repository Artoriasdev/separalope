import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Carousel from "./Carousel";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { Button } from "@material-ui/core";

class MenuBusinessCategory extends Component {
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
    const cat = this.props.match.params.value;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusinessByCategory/${cat}`;

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

  handleRedirect = (id) => {
    this.props.history.push(`/services-menu-category/${id}`);
  };

  render() {
    return (
      <>
        <Carousel />
        <div style={{ padding: "30px", width: "90%", margin: "auto" }}>
          <div>
            <h1>Nuestros negocios</h1>
          </div>
          <div className="flip-container">
            {this.state.typeCategorys &&
              this.state.typeCategorys.map(({ id, tradename, name }) => (
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  //ref={(r) => (this.flippy = r)}  to use toggle method like this.flippy.toggle()
                  // if you pass isFlipped prop component will be controlled component.
                  // and other props, which will go to div
                  // style={{
                  //   width: "300px",
                  //   height: "350px",
                  //   display: "inline-block",
                  //   margin: "0 30px 30px 0",
                  // }} /// these are optional style, it is not necessary
                  className="flip-card"
                  key={id}
                >
                  <FrontSide className="flip-card-background">
                    <h3 className="flip-title">{name}</h3>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className="btn-primary btn_card"
                      onClick={() => this.handleRedirect(id)}
                    >
                      Ver servicios
                    </Button>
                  </FrontSide>
                  <BackSide className="flip-card-background">
                    <h3 className="flip-title">{tradename}</h3>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className="btn-primary btn_card"
                      onClick={() => this.handleRedirect(id)}
                    >
                      Ver servicios
                    </Button>
                  </BackSide>
                </Flippy>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default MenuBusinessCategory;

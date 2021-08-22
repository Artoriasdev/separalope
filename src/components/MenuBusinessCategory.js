import React, { Component } from "react";
import Card from "@material-ui/core/Card";

import Carousel from "./Carousel";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import axios from "axios";

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
            <h1 style={{ color: "#5829dd" }}>Nuestros negocios</h1>
          </div>
          <div className="flip-container">
            {this.state.typeCategorys &&
              this.state.typeCategorys.map(({ id, tradename, logo }) => (
                <Card
                  style={{
                    width: 345,
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                  key={id}
                >
                  <CardMedia
                    image={logo}
                    title="Contemplative Reptile"
                    style={{ height: "240px", width: "300px", margin: "auto" }}
                  />

                  <CardContent style={{ margin: "20px 0 10px 0" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tradename}
                    </Typography>
                  </CardContent>

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    style={{
                      textTransform: "capitalize",
                    }}
                    fullWidth
                    onClick={() => this.handleRedirect(id)}
                  >
                    Ver negocios
                  </Button>
                </Card>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default MenuBusinessCategory;

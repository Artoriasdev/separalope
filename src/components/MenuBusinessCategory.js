import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Carousel from "./Carousel";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import axios from "axios";

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
          <div style={{ textAlign: "center" }}>
            {this.state.typeCategorys &&
              this.state.typeCategorys.map(({ id, tradename, logo }) => (
                <Card
                  style={{
                    maxWidth: 350,
                    display: "inline-block",
                    margin: "0 30px 20px 0 ",
                  }}
                  key={id}
                  onClick={() => this.handleRedirect(id)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={tradename}
                      height="250"
                      image={logo}
                      title={tradename}
                    />
                    <CardContent
                      style={{ minHeight: "40px", textAlign: "center" }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {tradename}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default MenuBusinessCategory;

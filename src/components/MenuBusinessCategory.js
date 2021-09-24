import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import Banner from "./BannerCategory";
import { Search } from "@material-ui/icons";

class MenuBusinessCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeBusiness: [],
      category: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("workflow") === "B") {
      this.props.history.push("/business/category");
    } else {
      try {
        (async () => {
          this.handleGetCategorys();
          await this.handleGetBusinessByCategory();
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleGetBusinessByCategory = () => {
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
          typeBusiness: data,
        });

        // console.log(data);

        return response;
      });
    return rspApi;
  };

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
        const category = data.find(
          (typeCategory) =>
            typeCategory.id === JSON.parse(this.props.match.params.value)
        );
        this.setState({
          category: category,
        });
        console.log(category);

        return response;
      });
    return rspApi;
  };

  handleRedirect = (id) => {
    this.props.history.push(
      `/services-menu-category/${id}/${this.props.match.params.value}`
    );
  };

  render() {
    return (
      <>
        <Banner
          image={this.state.category.image}
          name={this.state.category.name}
          description={this.state.category.description}
        />
        <div className="page-container" style={{ margin: "0 auto" }}>
          <div style={{ height: "200px", margin: "auto" }}>
            <div className="home-text">
              <h1>Nuestras negocios</h1>

              <h3 className="register__subtitle">
                Al alcance de todos y a tan solo un click
              </h3>
            </div>
            <div className="home-search">
              <TextField
                name="search"
                label="Buscar negocios"
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

          <div className="flip-container">
            {this.state.typeBusiness &&
              this.state.typeBusiness.map(({ id, tradename, logo }) => (
                <Card className="card-container" key={id}>
                  <CardMedia
                    image={logo}
                    title={tradename}
                    className="card-media"
                  />

                  <CardContent className="card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                      {tradename}
                    </Typography>
                  </CardContent>

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn_card"
                    style={{
                      margin: "0.5px 0",
                      textTransform: "none",
                    }}
                    fullWidth
                    onClick={() => this.handleRedirect(id)}
                  >
                    Ver servicios
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

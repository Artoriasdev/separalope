import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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
import Banner from "./BannerCategory";
import { Search } from "@material-ui/icons";
import "animate.css";

class MenuBusinessCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeBusiness: [],
      category: [],
      identificadorName: "",
      enterprises: [],
      modal: false,
      message: "",
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

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessByCategory/${cat}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;
        console.log(data);

        this.setState({
          typeBusiness: data,
        });

        // console.log(data);

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
            this.setState({
              modal: true,
              message:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            });
          });

        return responseEmp;
      } else if (value.length <= 3) {
        this.setState({
          enterprises: [],
        });
        return false;
      } else {
        this.setState({
          enterprises: [],
        });

        return false;
      }
    }, 1000);
  };

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
        const category = data.find(
          (typeCategory) =>
            typeCategory.id === JSON.parse(this.props.match.params.value)
        );
        this.setState({
          category: category,
        });
        console.log(category);

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

  handleRedirect = (id) => {
    this.props.history.push(
      `/services-menu-category/${id}/${this.props.match.params.value}`
    );
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <>
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
        <Banner
          image={this.state.category.imageBig}
          name={this.state.category.name}
          description={this.state.category.description}
        />
        <div className="page-container" style={{ margin: "0 auto" }}>
          <div className="home-container">
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
                  {this.state.enterprises.map(({ id, tradeName }) => (
                    <MenuItem
                      className="animate__animated animate__slideInUp"
                      onClick={(e) => {
                        this.handleRedirect(id);
                      }}
                      key={id}
                    >
                      {tradeName}
                    </MenuItem>
                  ))}
                </Paper>
              )}
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

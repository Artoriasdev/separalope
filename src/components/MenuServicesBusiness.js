import { Button } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { RatingService } from "../helpers/RatingService";
import Banner from "./BannerBusiness";

class MenuServicesBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      business: "",
    };
  }

  componentDidMount() {
    try {
      this.handleGetList();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetList = () => {
    const cat = this.props.match.params.value;
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServicesByBusiness/${cat}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeCategorys: data,
          business: data[0].tradenameBusiness,
        });

        return response;
      });

    return rspApi;
  };

  handleRedirect = (title) => {
    if (sessionStorage.getItem("tk") === null) {
      this.props.history.push(`/confirm/${title}`);
    } else {
      this.props.history.push("/reserve");
    }
  };

  render() {
    return (
      <>
        <Banner />

        <div style={{ padding: "50px 0 0 0 ", width: "80%", margin: " auto" }}>
          <div className="flip-container">
            {this.state.typeCategorys.map(
              ({ id, title, description, currencySymbol, price }) => (
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  className="flip-card"
                  key={id}
                >
                  <FrontSide className="flip-card-background">
                    <div
                      className="flip-card-service"
                      style={{
                        height: "100%",
                      }}
                    >
                      <h3>{title}</h3>
                      <RatingService rate={2} />
                      <p className="text">Precio unitario</p>
                      <div className="price">
                        {currencySymbol} {price}
                      </div>
                      <p className="font-p text">Duracion : un numero</p>
                    </div>
                  </FrontSide>
                  <BackSide className="flip-card-background">
                    <div
                      className="flip-card-service"
                      style={{
                        height: "92%",
                      }}
                    >
                      <h3>{title}</h3>
                      <h4 style={{ textAlign: "justify" }}>{description}</h4>
                      <p>Duracion : un numero</p>
                    </div>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className=" btn_card"
                      onClick={() => this.handleRedirect(title)}
                      fullWidth
                    >
                      Reservar cita
                    </Button>
                  </BackSide>
                </Flippy>
              )
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MenuServicesBusiness;

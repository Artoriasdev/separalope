import { Button } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";

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
      <div style={{ padding: "50px 0 0 0 ", width: "80%", margin: " auto" }}>
        <h1>Servicios de {this.state.business}</h1>

        <div
          style={{
            width: "80%",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {this.state.typeCategorys.map(
            ({ id, title, description, totalStock, currencySymbol, price }) => (
              <Flippy
                flipOnHover={true} // default false
                flipOnClick={false} // default false
                flipDirection="horizontal" // horizontal or vertical
                //ref={(r) => (this.flippy = r)}  to use toggle method like this.flippy.toggle()
                // if you pass isFlipped prop component will be controlled component.
                // and other props, which will go to div
                style={{
                  minWidth: "300px",
                  height: "350px",
                  display: "inline-block",
                  margin: "0 30px 30px 0",
                }} /// these are optional style, it is not necessary
                key={id}
              >
                <FrontSide
                  style={{
                    position: "relative",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div>
                      <h3>{title}</h3>
                    </div>
                    <div>
                      <span className="font-p" style={{ fontSize: "1rem" }}>
                        Precio x clase
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                        padding: "8px 15px",
                        fontSize: "2.25rem",
                        color: "#5829dd",
                      }}
                    >
                      {currencySymbol} {price}
                    </div>
                  </div>
                </FrontSide>
                <BackSide
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    textAlign: "justify",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      height: "92%",
                    }}
                  >
                    <h3>{description}</h3>
                    <p>Stock: {totalStock}</p>
                  </div>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    style={{
                      width: "110.2%",
                      marginLeft: "-14px",
                      textTransform: "capitalize",
                    }}
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
    );
  }
}

export default MenuServicesBusiness;

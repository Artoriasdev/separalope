import React from "react";
import { Component } from "react";
import Axios from "axios";

class BusinessMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
    };
  }

  componentDidMount() {
    try {
      this.handleGetCategorys();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;
      console.log(data);
      this.setState({
        typeCategorys: data,
      });

      return response;
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginLeft: "20px" }}>
          <h3>Inicio &gt; Categorias </h3>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h2>Categorias</h2>
          <h4>Ingresa la categoría que deseas buscar</h4>
        </div>

        <form style={{ marginLeft: "20px" }}>
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="register__input"
            name="searchText"
          />

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ width: 100 }}
          >
            Search
          </button>
        </form>

        <ul>
          {this.state.typeCategorys &&
            this.state.typeCategorys.map(({ id, image, logo, name }) => (
              <li
                key={id}
                style={{ display: "inline-block", position: "relative" }}
              >
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                  className="card"
                >
                  <span
                    style={{
                      height: "57px",
                      width: "76px",
                      display: "block",
                      margin: "0 auto",
                      position: "relative",
                      top: "35%",
                      borderRadius: "40px",
                      textAlign: "center",
                      backgroundColor: "#ffdd00",
                      paddingTop: "20px",
                    }}
                  >
                    <img src={logo} alt={name} title={name} />
                    <p
                      style={{
                        color: "#232323",
                        textAlign: "center",
                        marginTop: "15px",
                        padding: "0px",
                        fontSize: "16px",
                      }}
                    >
                      {name}
                    </p>
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default BusinessMenu;

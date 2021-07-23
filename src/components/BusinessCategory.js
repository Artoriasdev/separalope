import React from "react";
import { Component } from "react";
import "../sass/card.scss";

class BusinessMenu extends Component {
  render() {
    return (
      <div>
        <h1>Business Category</h1>
        <div>
          <h3>Inicio &gt; Categoria</h3>
        </div>
        <div>
          <h2>Categorias</h2>
          <h4>Ingresa la categoría a la que perteneces</h4>
        </div>
        <div>
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="register__input"
          />
        </div>
      </div>
    );
  }
}

export default BusinessMenu;

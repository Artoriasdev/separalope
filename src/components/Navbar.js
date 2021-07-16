import React from "react";
import { Link } from "react-router-dom";
import { AvatarSVG, LogoSVG } from "../assets/images/svg";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav navAlign">
        <div className="nav__logo">
          <button className="buttonHeader">
            <figure className="buttonHeader__figure">
              <LogoSVG />
            </figure>
          </button>
        </div>

        <div className="ulSession">
          <ul className="nav">
            <li>
              <button className="buttonNav normal">
                <figure className="figureButton">
                  <AvatarSVG />
                </figure>
                Iniciar Sesión
              </button>
              <ul>
                <li>
                  <Link to="/login">Soy usuario</Link>
                </li>
                <li>
                  <Link to="/login">Doy Servicio</Link>
                </li>
              </ul>
            </li>
            <li>
              <button className="buttonNav normal">Regístrate</button>
              <ul>
                <li>
                  <Link to="/register/client">Soy usuario</Link>
                </li>
                <li>
                  <Link to="/register/provider">Doy servicio</Link>
                </li>
              </ul>
            </li>
            <li />
          </ul>
        </div>
      </nav>
      <div className="botHeader">
        <div className="botHeader2">
          <nav className="botHeader2__nav"></nav>
        </div>
        <ul className="ulHeader"></ul>
      </div>
    </header>
  );
};

export default Navbar;

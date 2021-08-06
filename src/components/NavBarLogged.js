import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AvatarSVG, LogoSVG } from "../assets/images/svg";

const Navbar = () => {
  const history = useHistory();

  const [log, setLog] = useState(JSON.parse(sessionStorage.getItem("logged")));

  const [info, setInfo] = useState(JSON.parse(sessionStorage.getItem("info")));

  const handleRedirectProfile = (id) => {
    if (id === 1) {
      history.push("/business/profile");
    }
    if (id === 4) {
      history.push("/business/category");
    }
    if (id === 5) {
      history.push("/business/services");
    }
    if (id === 6) {
      history.push("/");
    }
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("logged");
    setLog(false);
    history.push("/");
  };

  return (
    <header className="header">
      <nav className="nav navAlign">
        <div className="nav__logo">
          <button
            className="buttonHeader"
            onClick={() => {
              handleRedirectHome();
            }}
          >
            <figure className="buttonHeader__figure">
              <LogoSVG />
            </figure>
          </button>
        </div>
        <div className="ulSession">
          <ul className="nav">
            <div style={{ display: "flex" }}>
              {info.map(({ idMenu, nameMenu }) => (
                <li key={idMenu}>
                  <button
                    className="buttonNav normal"
                    onClick={() => {
                      handleRedirectProfile(idMenu);
                    }}
                  >
                    {nameMenu}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="buttonNav normal"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            </div>
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

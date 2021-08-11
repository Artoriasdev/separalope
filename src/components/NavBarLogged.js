import { MenuItem } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LogoSVG } from "../assets/images/svg";

const Navbar = () => {
  const history = useHistory();

  const [info, setInfo] = useState(JSON.parse(sessionStorage.getItem("info")));

  const [work, setWork] = useState(sessionStorage.getItem("workflow"));

  const [name, setName] = useState(sessionStorage.getItem("name"));

  const handleRedirect = (id) => {
    if (id === 1 && work === "B") {
      history.push("/business/profile");
    } else {
      history.push("/customer/profile");
    }
    if (id === 2) {
      history.push("/customer-appointment");
    }
    if (id === 3) {
      history.push("/customer-history");
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
    if (id === 7) {
      history.push("/password_change");
    }
    if (id === 8) {
      history.push("/frequent-questions");
    }
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    history.go(history.push("/"));
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
            {name ? (
              <>
                <li>
                  <button className="buttonNav normal">{name}</button>
                  <ul>
                    {info.map(({ idMenu, nameMenu }) => (
                      <li key={idMenu} onClick={() => handleRedirect(idMenu)}>
                        <MenuItem style={{ left: -10 }}>{nameMenu}</MenuItem>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <button className="buttonNav normal">
                    <Settings
                      style={{
                        height: "100%",
                        margin: "8px 0",
                        fontSize: "24px",
                      }}
                    />
                  </button>
                  <ul
                    style={
                      {
                        /*tiene que ir un stilo aqui para que se invierta*/
                      }
                    }
                  >
                    <li onClick={() => handleRedirect(7)}>
                      <MenuItem style={{ left: -10 }}>
                        Cambiar contraseña
                      </MenuItem>
                    </li>
                    <li onClick={() => handleRedirect(8)}>
                      <MenuItem style={{ left: -10 }}>
                        Preguntas Frecuentes
                      </MenuItem>
                    </li>
                    <li onClick={handleLogout}>
                      <MenuItem style={{ left: -10 }}>Cerrar sesión</MenuItem>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => handleRedirect(info[1].idMenu)}>
                  <button className="buttonNav normal">
                    {info[1].nameMenu}
                  </button>
                </li>
                <li onClick={() => handleRedirect(info[2].idMenu)}>
                  <button className="buttonNav normal">
                    {info[2].nameMenu}
                  </button>
                </li>
                <li onClick={() => handleRedirect(info[0].idMenu)}>
                  <button className="buttonNav normal">
                    {info[0].nameMenu}
                  </button>
                </li>
                <li>
                  <button className="buttonNav normal">
                    <Settings
                      style={{
                        height: "100%",
                        margin: "8px 0",
                        fontSize: "24px",
                      }}
                    />
                  </button>
                  <ul
                    style={
                      {
                        /*tiene que ir un stilo aqui para que se invierta*/
                      }
                    }
                  >
                    <li onClick={() => handleRedirect(7)}>
                      <MenuItem style={{ left: -10 }}>
                        Cambiar contraseña
                      </MenuItem>
                    </li>
                    <li onClick={handleLogout}>
                      <MenuItem style={{ left: -10 }}>Cerrar sesión</MenuItem>
                    </li>
                  </ul>
                </li>
              </>
            )}
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

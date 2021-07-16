import React from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import "../sass/login.scss";

const Login = () => {
  return (
    <div>
      <button className="arrow__button">
        <figure>
          <ArrowCircleSVG />
        </figure>
      </button>

      <div className="auth__main">
        <div className="auth__box-container">
          <h1>Inicia sesión</h1>

          <form>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="auth__input"
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              className="auth__input"
            />

            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

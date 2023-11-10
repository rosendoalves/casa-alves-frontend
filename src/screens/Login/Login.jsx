import React, { useState } from "react";
import PropTypes from "prop-types";

import "./login.css";
import { loginUser } from "../../api/loginApi.js";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      userid: username,
      password,
    });
    setToken(token?.payload?.token);
  };
  return (
    <div className="login-wrapper">
      <h1>Iniciar Sesión ⏩</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label className="login-label" htmlFor="username">
            Usuario
          </label>
          <input
            name="username"
            className="login-input"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="login-input-container">
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            name="password"
            className="login-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-button-container">
          <button className="login-button" type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
};
export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

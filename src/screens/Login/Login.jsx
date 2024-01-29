import React, { useState } from "react";
import PropTypes from "prop-types";

import "./login.css";
import { loginUser } from "../../api/loginApi.js.js";
import { Spinner } from "react-bootstrap";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await loginUser({
        userid: username,
        password,
      });
      setToken(token?.payload?.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
          <button
            className="btn btn-success login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Entrar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./navbar.css";
import { NavbarCollapse } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              {" "}
              <img
                src={logo}
                width="auto"
                height="40"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse>
            <Nav className="me-auto">
              <Link className="nav-link nav-item" to="/">
                Home
              </Link>
              <Link className="nav-link nav-item" to="/ticket">
                + Ticket
              </Link>
              <Link className="nav-link nav-item" to="/ventas">
                Ventas
              </Link>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

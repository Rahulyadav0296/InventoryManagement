import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo_ry from "../assets/logo_ry.png"; // update with the correct path to your logo

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-md border-bottom navbar-dark bg-dark mb-4 border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            className="mb-4"
            src={logo_ry}
            alt="The logo"
            width="72"
            height="57"
            style={{ borderRadius: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="nav-link"
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
                className="nav-link"
                to="/customers"
              >
                Customers
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <p
                style={{ color: "white" }}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
              >
                Products
              </p>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "black",
                  })}
                  className="dropdown-item"
                  to="/products"
                >
                  Products
                </NavLink>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "black",
                  })}
                  className="dropdown-item"
                  to="/brands"
                >
                  Brands
                </NavLink>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "black",
                  })}
                  className="dropdown-item"
                  to="/product-categories"
                >
                  Product Categories
                </NavLink>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  padding: "0px 5px 20px 5px",
                  color: isActive ? "greenyellow" : "white",
                })}
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  padding: "0px 5px 20px 5px",
                  color: isActive ? "greenyellow" : "white",
                })}
                className="nav-link"
                to="/logout"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

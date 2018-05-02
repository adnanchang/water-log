import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Cool Water Log
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/trips">
                Trips
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStatetoProps, mapActionsToProps)(NavBar);

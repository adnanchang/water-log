import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { logoutAdmin } from '../actions/adminActions';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onLogoutUser = this.onLogoutUser.bind(this);
  }

  onLogoutUser() {
    this.props.onLogoutUser();
  }
  
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/admin">
          Cool Water Log - Admin
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
          </ul>
        </div>
        {this.props.isAuthenticated ? (
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <input type="button" value="Logout" onClick={this.onLogoutUser} className="btn btn-danger" />
              </li>
            </ul>
          </div>
        ): (
          <div></div>
        )}

      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {};
};

const mapActionsToProps = {
  onLogoutUser: logoutAdmin
};

export default connect(mapStatetoProps, mapActionsToProps)(NavBar);

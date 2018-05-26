import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Route from "react-router-dom/Route";
import Register from "./components/Register";
import { loadUserFromToken } from "./actions/userActions";
import { loadAdminFromToken, logoutAdmin } from "./actions/adminActions";

class App extends Component {
  constructor(props) {
    super(props);

    this.onLoadUserFromToken = this.onLoadUserFromToken.bind(this);
    this.onLoadAdminFromToken = this.onLoadAdminFromToken.bind(this);
    this.onLogoutAdmin = this.onLogoutAdmin.bind(this);
  }

  componentWillMount() {
    //Check for User
    let userToken = sessionStorage.getItem("userToken");
    if (!userToken || userToken === "") {
    } else {
      this.onLoadUserFromToken(userToken);
    }

    //Check for Admin
    let adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken || adminToken === "") {
    } else {
      this.onLoadAdminFromToken(adminToken);
    }

    //Log admin out if user is already logged in
    //Admin must log user out manually on the machine to log in
    if (this.props.isUserAuthenticated && this.props.isAdminAuthenticated) {
      this.onLogoutAdmin();
    }

  }

  onLoadUserFromToken(token) {
    this.props.onLoadUserFromToken(token);
  }

  onLoadAdminFromToken(token) {
    this.props.onLoadAdminFromToken(token);
  }

  onLogoutAdmin() {
    this.props.onLogoutAdmin();
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/*
          Show a different NavBar depending on the type of user (admin) logged in
          By default the user navbar will be present
          */}
          {this.props.isUserAuthenticated ? (
            <UserNavBar isAuthenticated={this.props.isUserAuthenticated} />
          ) :
            this.props.isAdminAuthenticated ? (
              <AdminNavBar isAuthenticated={this.props.isAdminAuthenticated} />
            ) :
              (
                <UserNavBar isAuthenticated={this.props.isUserAuthenticated} />
              )
          }
          <br />
          {/* 
          Only show the login and register component to the user
          When the user isn't signed in
          */}
          {!this.props.isAuthenticated ? (
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h1>Welcome to Water Log</h1>
                      </div>
                    </div>
                    <div className="row">
                      <Login />
                      <Register />
                    </div>
                  </div>
                );
              }}
            />
          ) : (
              <Route
                path="/components/Login"
                exact
                render={() => {
                  return <div className="container">LOL</div>;
                }}
              />
            )}
          <Route
            path="/trips"
            render={() => {
              return (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1>Welcome to Water Log</h1>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Route
            path="/admin"
            render={() => {
              return (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1>Admin Water Log</h1>
                    </div>
                    <AdminLogin />
                    <AdminRegister />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    isUserAuthenticated: state.user.isAuthenticated,
    isAdminAuthenticated: state.admin.isAuthenticated
  };
};

const mapActionsToProps = {
  onLoadUserFromToken: loadUserFromToken,
  onLoadAdminFromToken: loadAdminFromToken,
  onLogoutAdmin: logoutAdmin
};

export default connect(mapStatetoProps, mapActionsToProps)(App);

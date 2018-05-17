import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Users from "./components/Users";
import Route from "react-router-dom/Route";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar /> <br />
          {!this.props.isAuthenticated ? (<Route
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
          />) : (<Route
            path="/components/Login"
            exact
            render={() => {
              return (
                <div className="container">
                  LOL
                </div>
              );
            }}
          />)}
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
                  <Users />
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
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapActionsToProps = {};

export default connect(mapStatetoProps, mapActionsToProps)(App);

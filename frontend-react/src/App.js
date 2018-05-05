import React, { Component } from "react";
import { connect } from "react-redux";

import {withRouter} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Route from "react-router-dom/Route";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
        <div className="App">
          <NavBar /> <br />
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div className="container">
                  {!this.props.isAuthorized ? (
                    <div>
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
                  ) : (
                    <div className="row">
                      <div className="col-md-12">
                        <h1>Welcome to Water Log</h1>
                        <h2>Hi {this.props.user.firstName}</h2>
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Route
            path="/trips"
            exact
            render={() => {
              return <div className="container" />;
            }}
          />
        </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    user: state.user.user,
    isAuthorized: state.user.isAuthorized,
    token: state.user.token
  };
};

const mapActionsToProps = {};

export default withRouter(connect(mapStatetoProps, mapActionsToProps)(App));

import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Route from "react-router-dom/Route";
import Register from "./components/Register";
import { loadUserFromToken } from './actions/userActions';

class App extends Component {
  constructor(props) {
    super(props)

    this.onLoadUserFromToken = this.onLoadUserFromToken.bind(this);
  }

  componentWillMount() {
    let token = sessionStorage.getItem('token');
    if (!token || token === ''){
      
    } else {
      this.onLoadUserFromToken(token);
    }
  }

  onLoadUserFromToken(token) {
    this.props.onLoadUserFromToken(token);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar isAuthenticated={this.props.isAuthenticated} /> <br />
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
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapActionsToProps = {
  onLoadUserFromToken: loadUserFromToken
};

export default connect(mapStatetoProps, mapActionsToProps)(App);

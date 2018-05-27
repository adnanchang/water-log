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
                  {!this.props.isUserAuthenticated ? (
                    <div className="row">
                      <Login />
                      <Register />
                    </div>
                  ) : (
                      <div className="row">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a className="nav-link active show" data-toggle="tab" href="#home">Home</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#profile">Profile</a>
                          </li>

                        </ul>
                        <div id="myTabContent" className="tab-content">
                          <div className="tab-pane fade active show" id="home">
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                          </div>
                          <div className="tab-pane fade" id="profile">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                      <h1>Totally hidden - Admin Panel</h1>
                    </div>
                  </div>
                  {!this.props.isAdminAuthenticated ? (
                    <div className="row">
                      <AdminLogin />
                      <AdminRegister />
                    </div>
                  ) : (
                      <div className="row">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a className="nav-link active show" data-toggle="tab" href="#home">Home</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#profile">Profile</a>
                          </li>

                        </ul>
                        <div id="myTabContent" className="tab-content">
                          <div className="tab-pane fade active show" id="home">
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                          </div>
                          <div className="tab-pane fade" id="profile">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                          </div>
                        </div>
                      </div>
                    )}
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

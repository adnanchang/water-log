import React, { Component } from "react";
import { connect } from "react-redux";


class Login extends Component {


  render() {
    return (
      <div className="col-md-6">
        <form >
          <fieldset>
            <legend>Login Here</legend>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
              />
            </div>
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {};
};

const mapActionsToProps = {
};

export default connect(mapStatetoProps, mapActionsToProps)(Login);

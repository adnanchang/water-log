import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: this.getUsername.value,
      password: this.getPassword.value
    }

    this.props.handleSubmit(data);
    this.getPassword.value = "";
    this.getUsername.value = "";
  }

  render() {
    return (
      <div className="col-md-6">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login Here</legend>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                ref={input => (this.getUsername = input)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                ref={input => (this.getPassword = input)}
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
  handleSubmit: loginUser
};

export default connect(mapStatetoProps, mapActionsToProps)(Login);

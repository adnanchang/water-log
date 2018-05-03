import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: this.getFirstName.value,
      lastName: this.getlastName.value,
      email: this.getEmail.value,
      username: this.getUsername.value,
      password: this.getPassword.value
    }
    this.getFirstName.value = "";
    this.getlastName.value = "";
    this.getEmail.value = "";
    this.getUsername.value = "";
    this.getPassword.value = "";
    this.props.handleSubmit(data);
  }

  render() {
    return (
      <div className="col-md-6">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Register Here</legend>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                ref={input => (this.getFirstName = input)}
                placeholder="Enter First Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                ref={input => (this.getlastName = input)}
                placeholder="Enter Last Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                ref={input => (this.getEmail = input)}
                placeholder="Enter Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                ref={input => (this.getUsername = input)}
                placeholder="Enter Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                ref={input => (this.getPassword = input)}
                placeholder="Enter Password"
                className="form-control"
              />
            </div>
            <input type="submit" value="Register" className="btn btn-primary" />
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
  handleSubmit: registerUser
};

export default connect(mapStatetoProps, mapActionsToProps)(Register);

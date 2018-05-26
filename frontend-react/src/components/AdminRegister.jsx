import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAdmin } from "../actions/adminActions";

class AdminRegister extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      adminFirstName: this.getadminFirstName.value,
        adminLastName: this.getadminLastName.value,
        adminEmail: this.getadminEmail.value,
        adminUsername: this.getadminUsername.value,
        adminEncryptedPassword: this.getadminPassword.value
    }
    this.getadminFirstName.value = "";
    this.getadminLastName.value = "";
    this.getadminEmail.value = "";
    this.getadminUsername.value = "";
    this.getadminPassword.value = "";
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
                ref={input => (this.getadminFirstName = input)}
                placeholder="Enter First Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                ref={input => (this.getadminLastName = input)}
                placeholder="Enter Last Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                ref={input => (this.getadminEmail = input)}
                placeholder="Enter Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                ref={input => (this.getadminUsername = input)}
                placeholder="Enter Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                ref={input => (this.getadminPassword = input)}
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
  handleSubmit: registerAdmin
};

export default connect(mapStatetoProps, mapActionsToProps)(AdminRegister);

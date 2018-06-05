import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { editUser, getUsers, deleteUser } from "../actions/userActions";

class Users extends Component {

  componentDidMount() {
    this.onGetUsers();
  }

  onGetUsers() {
    this.props.onGetUsers();
  }

  render() {
    return (
      <div className="container">
        {this.props.err != null ? (
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Oh snap! </strong>
            {this.props.err}
          </div>
        ) : (
            <div />
          )}
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr className="table-primary" key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{moment(user.createdAt).format('LLL')}</td>
                <td>
                  <form onSubmit={this.onEditUser}>
                    <input type="hidden" ref={(input) => this.getId = input} value={user.id} />
                    <input
                      type="button"
                      value="Edit"
                      className="btn btn-primary"
                      onClick={() => this.props.onEditUser(user.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-danger"
                      onClick={() => this.props.onDeleteUser(user.id)}
                    />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    users: state.user.users,
    err: state.user.err
  };
};

const mapActionsToProps = {
  onGetUsers: getUsers,
  onEditUser: editUser,
  onDeleteUser: deleteUser
};

export default connect(mapStatetoProps, mapActionsToProps)(Users);

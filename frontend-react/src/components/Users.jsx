import React, { Component } from "react";
import { connect } from "react-redux";
import {  getUsers } from "../actions/userActions";

class Users extends Component {


    constructor(props) {
        super(props);

        // this.onEditUser = this.onEditUser.bind(this);
    }

    componentDidMount() {
        this.onGetUsers();
    }

    onGetHousemates() {
        this.props.onGetUsers();
    }

    render() {
        return (
            <div className="container">
              <table className="table">
                <thead>
                <tr>

                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(user => (
                    <tr className="table-primary" >

                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                        <td>{user.email}</td>

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
        users: state.users.users
    };
};

const mapActionsToProps = {
    onGetUsers: getUsers

};

export default connect(mapStatetoProps, mapActionsToProps)(Users);

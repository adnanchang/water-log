import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser_A } from "../actions/userActions";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.name = "";
        this.message = null;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        console.log("CALLED");
        if (this.props.editing) {
            this.getFirstName.value = this.props.user.firstName;
            this.getLastName.value = this.props.user.lastName;
            this.getUsername.value = this.props.user.username;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            id: this.props.user.id,
            firstName: this.getFirstName.value,
            lastName: this.getLastName.value,
            username: this.getUsername.value
        };
        this.props.handleSubmit(user);
        this.getFirstName.value = "";
        this.getLastName.value = "";
        this.getUsername.value = "";
    }

    render() {
        if (this.props.user.id == null) {
            this.message = "Select a user to edit";
        } else {
            this.message = "Editing " + this.props.user.firstName;
        }
        return (
            <div className="col-lg-6">
                {this.props.editing ? (
                    <form onSubmit={this.handleSubmit}>
                        <legend>Edit User</legend>
                        <p>{this.message}</p>
                        <fieldset className="form-group">
                            <div className="form-group">
                                <label htmlFor="First Name">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    ref={input => (this.getFirstName = input)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Name">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    ref={input => (this.getLastName = input)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Name">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    ref={input => (this.getUsername = input)}
                                    className="form-control"
                                />
                            </div>
                        </fieldset>
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </form>
                ) : (
                        <legend>No User to Edit </legend>
                    )}
            </div>
        );
    }
}

const mapStatetoProps = (state, props) => {
    return {
        user: state.user.userToEdit,
        editing: state.user.editing
    };
};

const mapActionsToProps = {
      handleSubmit: updateUser_A
};

export default connect(mapStatetoProps, mapActionsToProps)(EditUser);

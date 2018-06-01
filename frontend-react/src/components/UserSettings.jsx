import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, updatePassword } from "../actions/userActions";

class UserSettings extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    }

    componentDidMount() {
        // if (Object.keys(this.props.user).length !== 0 && this.props.user.constructor !== Object) {
        //     this.getuserFirstName.value = this.props.user.userFirstName;
        //     this.getuserLastName.value = this.props.user.userLastName;
        // }
        this.getuserFirstName.value = this.props.user.firstName;
        this.getuserLastName.value = this.props.user.lastName;
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.props.user.id,
            userFirstName: this.getuserFirstName.value,
            userLastName: this.getuserLastName.value
        }
        this.props.handleSubmit(data);
    }

    handlePasswordSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.props.user.id,
            userPassword: this.getuserPassword.value
        }
        this.getuserPassword.value = "";
        this.props.handlePasswordSubmit(data);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>You may change this</legend>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    ref={input => (this.getuserFirstName = input)}
                                    placeholder="Enter First Name"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    ref={input => (this.getuserLastName = input)}
                                    placeholder="Enter Last Name"
                                    className="form-control"
                                />
                            </div>
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </fieldset>
                    </form>
                </div>
                <div className="col-md-6">
                    <form onSubmit={this.handlePasswordSubmit}>
                        <fieldset>
                            <legend>You may change this too</legend>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    ref={input => (this.getuserPassword = input)}
                                    placeholder="Enter Password"
                                    className="form-control"
                                />
                            </div>
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </fieldset>
                    </form>
                </div>
            </div>

        );
    }
}

const mapStatetoProps = (state, props) => {
    return {
        user: state.user.user
    };
};

const mapActionsToProps = {
    handleSubmit: updateUser,
    handlePasswordSubmit: updatePassword
};

export default connect(mapStatetoProps, mapActionsToProps)(UserSettings);

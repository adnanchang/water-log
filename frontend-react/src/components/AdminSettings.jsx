import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAdmin, updatePassword } from "../actions/adminActions";

class AdminSettings extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    }

    componentDidMount() {
        // if (Object.keys(this.props.admin).length !== 0 && this.props.admin.constructor !== Object) {
        //     this.getadminFirstName.value = this.props.admin.adminFirstName;
        //     this.getadminLastName.value = this.props.admin.adminLastName;
        // }
        this.getadminFirstName.value = this.props.admin.adminFirstName;
        this.getadminLastName.value = this.props.admin.adminLastName;
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.props.admin.id,
            adminFirstName: this.getadminFirstName.value,
            adminLastName: this.getadminLastName.value
        }
        this.props.handleSubmit(data);
    }

    handlePasswordSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.props.admin.id,
            adminPassword: this.getadminPassword.value
        }
        this.getadminPassword.value = "";
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
                                    ref={input => (this.getadminPassword = input)}
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
        admin: state.admin.admin
    };
};

const mapActionsToProps = {
    handleSubmit: updateAdmin,
    handlePasswordSubmit: updatePassword
};

export default connect(mapStatetoProps, mapActionsToProps)(AdminSettings);

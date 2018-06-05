import React, { Component } from "react";
import { connect } from "react-redux";
import { createTripUser } from "../actions/tripActions";
import { getUsers_Users, selectUser, removeUser } from "../actions/userActions";
import { getBoatsUser } from "../actions/boatActions";

class AddTrip_U extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onGetUsers = this.onGetUsers.bind(this);
    this.onSelectUser = this.onSelectUser.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
    this.onGetBoats = this.onGetBoats.bind(this);
  }

  componentWillMount() {
    this.onGetUsers();
    this.onGetBoats();
  }

  componentDidUpdate() {
    //Add logged in user automatically to selected user
    //I HAVE NO CHOICE BUT TO PUT IT HERE
    this.props.onSelectUser(this.props.user.id);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      boat: this.getBoat.value,
      startTime: this.getStartTime.value,
      endTime: this.getEndTime.value,
      selectedUsers: this.props.selectedUsers
    };
    this.getBoat.selectedIndex = 0;
    this.getStartTime.value = "";
    this.getEndTime.value = "";
    this.getUsers.selectedIndex = 0;
    this.props.handleSubmit(data);
  }

  onGetUsers() {
    this.props.onGetUsers();
  }

  onGetBoats(){
    this.props.onGetBoats();
  }

  onSelectUser(event) {
    event.preventDefault();
    if (this.getUsers.value != null) {
      this.props.onSelectUser(this.getUsers.value);
    }
  }

  onRemoveUser(id) {
    this.props.onRemoveUser(id);
  }

  render() {
    return (
      <div className="col-lg-6">
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

        <form onSubmit={this.handleSubmit}>
          <legend>Add Trip</legend>
          <fieldset className="form-group">
            <div className="form-group">
              <label htmlFor="Boat">Select Boat</label>
              <select
                ref={input => (this.getBoat = input)}
                className="form-control"
              >
                <option />
                {this.props.boats.map(boat => (
                  <option key={boat.id} value={boat.id}>
                    {boat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="">Start Time</label>
              <input id="startTime" type="datetime-local" className="form-control" ref={input => (this.getStartTime = input)} />
            </div>


            <div className="form-group">
              <label htmlFor="">End Time</label>
              <input id="endTime" type="datetime-local" className="form-control" ref={input => (this.getEndTime = input)} />
            </div>

            <div className="form-group">
              <label htmlFor="">Select Users</label>
              <select
                ref={input => (this.getUsers = input)}
                className="form-control"
                onChange={this.onSelectUser}
              >
                <option />
                {this.props.users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="">Users Selected</label>
              {this.props.selectedUsers.length == 0 ? (
                <p>No Users selected for the trip</p>
              ) : (
                  <ul className="list-group">
                    {this.props.selectedUsers.map(user => (
                      <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.username}
                        {user.id == this.props.user.id ? (
                          <a href=""></a>
                        ) : (<a onClick={() => this.props.onRemoveUser(user.id)}>
                          <i className="fas fa-times"></i>
                        </a>)}

                      </li>
                    ))}
                  </ul>
                )}
            </div>

          </fieldset>
          <input type="submit" value="Create" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    user: state.user.user,
    users: state.user.users,
    boats: state.boats.boats,
    err: state.trip.err,
    selectedUsers: state.user.selectedUsers
  };
};

const mapActionsToProps = {
  handleSubmit: createTripUser,
  onGetUsers: getUsers_Users,
  onSelectUser: selectUser,
  onRemoveUser: removeUser,
  onGetBoats: getBoatsUser
};

export default connect(mapStatetoProps, mapActionsToProps)(AddTrip_U);

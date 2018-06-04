import React, { Component } from "react";
import { connect } from "react-redux";
import { } from "../actions/tripActions";
import { } from "../actions/userActions";

class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.trip = {};
    this.boat = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const getBoatName = () => {
      if (this.props.viewDetails) {
        this.trip = this.props.trips.find(
          trip => trip.id === this.props.tripDetails[0].trip
        );
        this.boat = this.props.boats.find(
          boat => boat.id === this.trip.boat
        );
        return this.boat.name;
      }
    }
    const getUserName = (id) => {
      const user = this.props.users.find(
        user => user.id === id
      );
      return user.username
    }
    return (
      <div className="col-lg-6">
        {this.props.viewDetails ? (
          <div>
            <legend>Trip Details</legend> <br />
            <div className="form-group">
              <legend>Boat</legend>
              <label htmlFor="">{getBoatName()}</label>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>SignedInAt</th>
                  <th>SignedOutAt</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tripDetails.map(trip => (
                  <tr className="table-primary" key={trip.id}>
                    <td>{getUserName(trip.user)}</td>
                    {trip.signedInAt == null ? (
                      <td>Not Signed In</td>
                    ) : (
                        <td>{trip.signedInAt}</td>
                      )}

                    {trip.signedOutAt == null ? (
                      <td>Not Signed Out</td>
                    ) : (
                        <td>{trip.signedOutAt}</td>
                      )}
                    {/* <td>
                  <form>
                    <input type="hidden" ref={(input) => this.getId = input} value={trip.id} />
                    <input
                      type="button"
                      value="View"
                      className="btn btn-success"
                      onClick={() => this.props.onViewDetails(trip.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-danger"
                      disabled="true"
                      onClick={() => this.props.onDeleteTrip(trip.id)}
                    />
                  </form>
                </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <legend>No Trip Chosen to view</legend>
          </div>
      )}
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    users: state.user.users,
    boats: state.boats.boats,
    err: state.trip.err,
    tripDetails: state.trip.tripDetails,
    trips: state.trip.trips,
    viewDetails: state.trip.viewDetails
  };
};

const mapActionsToProps = {
};

export default connect(mapStatetoProps, mapActionsToProps)(TripDetails);

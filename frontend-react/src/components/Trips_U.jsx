import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getBoats } from "../actions/boatActions";
import { editTrip, getTripsUser, deleteTrip, viewDetails, signIn, signOut } from "../actions/tripActions";

class Trips_U extends Component {

  componentDidMount() {
    this.onGetTrips();
  }

  onGetTrips() {
    this.props.onGetTrips();
  }

  isUserSignedIn(trip) {
    console.log(trip);
    const detail = trip.tripDetails.find(
      detail => detail.user === this.props.user.id
    );

    console.log(detail);
    if (detail.signedInAt != null)
      return true;
    else
      return false;
  }

  isUserDoneWithTrip(trip) {
    const detail = trip.tripDetails.find(
      detail => detail.user === this.props.user.id
    );
    console.log(trip);
    console.log(detail);
    if (detail.signedInAt != null && detail.signedOutAt != null)
      return true;
    else
      return false;
  }

  getDetail(trip) {
    const detail = trip.tripDetails.find(
      detail => detail.user === this.props.user.id
    );

    return detail.id;
  }

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Boat</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.trips.map(trip => (
              <tr className="table-primary" key={trip.id}>
                <td>{trip.boat}</td>
                <td>{moment(trip.startTime).format('LLL')}</td>
                <td>{moment(trip.endTime).format('LLL')}</td>
                <td>
                  <form>
                    <input type="hidden" ref={(input) => this.getId = input} value={trip.id} />
                    <input
                      type="button"
                      value="View"
                      className="btn btn-primary"
                      onClick={() => this.props.onViewDetails(trip.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {this.isUserDoneWithTrip(trip) ? (
                      <input type="button" disabled="true" value="Trip Over" className="btn btn-info"/>
                    ) : [
                        (!this.isUserSignedIn(trip) ? (
                          <input
                            type="button"
                            value="Sign In"
                            className="btn btn-success"
                            onClick={() => this.props.onSignInUser(this.getDetail(trip))}
                          />
                        ) : (<input
                          type="button"
                          value="Sign Out"
                          className="btn btn-danger"
                          onClick={() => this.props.onSignOutUser(this.getDetail(trip))}
                        />))
                      ]
                    }
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
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    trips: state.trip.trips,
    boats: state.boats.boats
  };
};

const mapActionsToProps = {
  onGetTrips: getTripsUser,
  onViewDetails: viewDetails,
  onSignInUser: signIn,
  onSignOutUser: signOut
};

export default connect(mapStatetoProps, mapActionsToProps)(Trips_U);

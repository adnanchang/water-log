import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getBoats } from "../actions/boatActions";
import { editTrip, getTrips, deleteTrip, viewDetails } from "../actions/tripActions";

class Trips extends Component {
  
  componentDidMount() {
    this.onGetTrips();
  }

  onGetTrips() {
    this.props.onGetTrips();
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
                      className="btn btn-success"
                      onClick={() => this.props.onViewDetails(trip.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="button"
                      value="Edit"
                      className="btn btn-primary"
                      disabled="true"
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
    trips: state.trip.trips,
    boats: state.boats.boats
  };
};

const mapActionsToProps = {
  onGetBoats: getBoats,
  onGetTrips: getTrips,
  onViewDetails: viewDetails,
  onDeleteHouseMate: deleteTrip
};

export default connect(mapStatetoProps, mapActionsToProps)(Trips);

import React, { Component } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions/tripActions";

class AddTrip extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.getName.value;
    const data = {
      name: name
    };
    this.getName.value = "";
    this.props.handleSubmit(data);
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

            <label htmlFor="">Start Time</label>
            <input id="startTime" type="datetime-local" className="form-control" ref={input => (this.getStartTime = input)} />

            <label htmlFor="">End Time</label>
            <input id="endTime" type="datetime-local" className="form-control" ref={input => (this.getEndTime = input)} />
            
          </fieldset>
            <input type="submit" value="Create" className="btn btn-primary" />
        </form>
      </div>
        );
      }
    }
    
const mapStatetoProps = (state, props) => {
  return {
          boats: state.boats.boats,
        err: state.trip.err
      };
    };
    
const mapActionsToProps = {
          handleSubmit: createTrip
      };
      
      export default connect(mapStatetoProps, mapActionsToProps)(AddTrip);

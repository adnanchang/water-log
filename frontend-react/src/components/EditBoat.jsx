import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBoat } from "../actions/boatActions";

class EditBoat extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.message = null;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log("CALLED");
    if (this.props.editing) {
      this.getName.value = this.props.boat.name;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const boat = {
      id: this.props.boat.id,
      name: this.getName.value
    };
    this.props.handleSubmit(boat);
    this.getName.value = "";
  }

  render() {
    if (this.props.boat.id == null) {
      this.message = "Select a boat to edit";
    } else {
      this.message = "Editing " + this.props.boat.name;
    }
    return (
      <div className="col-lg-6">
        {this.props.editing ? (
          <form onSubmit={this.handleSubmit}>
            <legend>Edit Boat</legend>
            <p>{this.message}</p>
            <fieldset className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                placeholder="Enter Boat Name"
                ref={input => (this.getName = input)}
                className="form-control"
              />
            </fieldset>
            <input type="submit" value="Edit" className="btn btn-primary" />
          </form>
        ) : (
          <legend>No Boat to Edit </legend>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    boat: state.boats.boatToEdit,
    editing: state.boats.editing
  };
};

const mapActionsToProps = {
  handleSubmit: updateBoat
};

export default connect(mapStatetoProps, mapActionsToProps)(EditBoat);

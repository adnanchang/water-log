import React, { Component } from "react";
import { connect } from "react-redux";
import { createBoat } from "../actions/boatActions";

class AddBoat extends Component {
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
          <legend>Add Boat</legend>
          <fieldset className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              placeholder="Enter Boat Name"
              ref={input => (this.getName = input)}
              className="form-control"
            />
          </fieldset>
          <input type="submit" value="Add" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state, props) => {
  return {
    err: state.boats.err
  };
};

const mapActionsToProps = {
  handleSubmit: createBoat
};

export default connect(mapStatetoProps, mapActionsToProps)(AddBoat);

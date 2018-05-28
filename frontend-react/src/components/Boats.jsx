import React, { Component } from "react";
import { connect } from "react-redux";
import { editBoat, getBoats, deleteBoat } from "../actions/boatActions";

class Boats extends Component {
  componentDidMount() {
    this.onGetBoats();
  }

  onGetBoats() {
    this.props.onGetBoats();
  }

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.boats.map(boat => (
              <tr className="table-primary" key={boat.id}>
                <td>{boat.id}</td>
                <td>{boat.name}</td>
                <td>{boat.createdAt}</td>
                <td>
                  <form onSubmit={this.onEditBoat}>
                    <input type="hidden" ref={(input) => this.getId = input} value={boat.id} />
                    <input
                      type="button"
                      value="Edit"
                      className="btn btn-primary"
                      onClick={() => this.props.onEditBoat(boat.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-danger"
                      onClick={() => this.props.onDeleteHouseMate(boat.id)}
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
    boats: state.boats.boats
  };
};

const mapActionsToProps = {
  onGetBoats: getBoats,
  onEditBoat: editBoat,
  onDeleteHouseMate: deleteBoat
};

export default connect(mapStatetoProps, mapActionsToProps)(Boats);

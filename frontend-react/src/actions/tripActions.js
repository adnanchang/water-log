export const CREATE_TRIP = "CREATE_TRIP";
export const SEND_ERROR = "SEND_ERROR";
export const GET_TRIPS = "GET_TRIPS";
export const EDIT_TRIP = "EDIT_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";
export const SEND_DETAILS = "SEND_DETAILS";

export function createTrip(formData) {
  return dispatch => {
    return fetch("/trip/create", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          dispatch({
            type: CREATE_TRIP,
            payload: data
          });
        } else {
          dispatch({
            type: SEND_ERROR,
            payload: data.err
          });
        }
      });
  };
}

export function getTrips() {
  return dispatch => {
    return fetch("/trip")
      .then(res => res.json())
      .then(trips =>
        dispatch({
          type: GET_TRIPS,
          payload: trips
        })
      );
  };
}

export function editTrip(id) {
  return {
    type: EDIT_TRIP,
    payload: id
  }
}

export function deleteTrip(id) {
  return dispatch => {
    return fetch("/trip/delete/" + id, {
      method: 'POST'
    })
      .then(res => res.ok)
      .then(task => dispatch({
        type: DELETE_TRIP,
        payload: id
      }));
  }
}

export function viewDetails(id) {
  return {
    type: SEND_DETAILS,
    payload: id
  }
}
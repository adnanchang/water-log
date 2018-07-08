export const CREATE_TRIP = "CREATE_TRIP";
export const SEND_ERROR = "SEND_ERROR";
export const GET_TRIPS = "GET_TRIPS";
export const EDIT_TRIP = "EDIT_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";
export const SEND_DETAILS = "SEND_DETAILS";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const TRIP_ERROR = "TRIP_ERROR";

export function createTrip(formData) {
  return dispatch => {
    return fetch("/trip/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
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

export function createTripUser(formData) {
  return dispatch => {
    return fetch("/trip/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem('userToken')
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
    return fetch("/trip", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
      }
    })
      .then(res => res.json())
      .then(trips =>
        dispatch({
          type: GET_TRIPS,
          payload: trips
        })
      );
  };
}

export function getTripsUser() {
  return dispatch => {
    return fetch("/trip/userTrips", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('userToken')
      }
    })
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
      method: 'POST',
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
      }
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

export function signIn(id) {
  console.log(id);
  return dispatch => {
    return fetch("/tripDetail/signIn/" + id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem('userToken')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          dispatch({
            type: SIGN_IN,
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

export function signOut(id) {
  console.log(id);
  return dispatch => {
    return fetch("/tripDetail/signOut/" + id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem('userToken')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          dispatch({
            type: SIGN_OUT,
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

export function tripError() {
  var error = "Start time must be before end time"
  return {
    type: TRIP_ERROR,
    payload: error
  };
}
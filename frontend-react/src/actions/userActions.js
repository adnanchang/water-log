export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOAD_USER_FROM_TOKEN = "LOAD_USER_FROM_TOKEN";
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USERS = "GET_USER";
export const EDIT_USER = "EDIT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SEND_ERROR = "SEND_ERROR";
export const SELECT_USER = "SELECT_USER";
export const REMOVE_USER = "REMOVE_USER";

export function registerUser(formData) {
  return dispatch => {
    return fetch("/user/create", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: REGISTER_USER,
          payload: data
        })
      );
  };
}

export function getUsers() {
  return dispatch => {
    return fetch("/user", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
      }
    })
      .then(res => res.json())
      .then(users =>
        dispatch({
          type: GET_USERS,
          payload: users
        })
      );
  };
}

export function getUsers_Users() {
  return dispatch => {
    return fetch("/user", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('userToken')
      }
    })
      .then(res => res.json())
      .then(users =>
        dispatch({
          type: GET_USERS,
          payload: users
        })
      );
  };
}

export function loginUser(formData) {
  return dispatch => {
    return fetch("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          sessionStorage.setItem("userToken", data.token);
          dispatch({
            type: LOGIN_USER,
            payload: data
          });
        }
      });
  };
}

export function loadUserFromToken(token) {
  return dispatch => {
    return fetch("/user/loggedInUser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          dispatch({
            type: LOAD_USER_FROM_TOKEN,
            payload: data
          });
        } else { //If the server doesn't verify the user then get rid of token and log user out
          sessionStorage.removeItem("userToken");
          dispatch({
            type: LOGOUT_USER
          });
        }
      });
  };
}

export function logoutUser() {
  sessionStorage.removeItem('userToken');
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    })
  }
}

export function editUser(id) {
  return {
    type: EDIT_USER,
    payload: id
  };
}

export function updateUser_A(formData) {
  console.log(formData);
  return dispatch => {
    return fetch("/user/updateA", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(user => {
        if (!user.err) {
          dispatch({
            type: UPDATE_USER,
            payload: user
          });
        } else {
          dispatch({
            type: SEND_ERROR,
            payload: user
          });
        }
      });
  };
}

export function updateUser(formData) {
  return dispatch => {
    return fetch("/user/update", {
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
          dispatch(loadUserFromToken(sessionStorage.getItem("userToken")));
        } else {
          dispatch({
            type: SEND_ERROR,
            payload: data.err
          });
        }
      });
  };
}

export function updatePassword(formData) {
  return dispatch => {
    return fetch("/user/updatePassword", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          sessionStorage.removeItem("userToken");
          dispatch({
            type: LOGOUT_USER
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

export function selectUser(id) {
  return {
    type: SELECT_USER,
    payload: id
  };
}

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    payload: id
  }
}

export function deleteUser(id) {
  return dispatch => {
    return fetch("/user/delete/" + id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('adminToken')
      }
    })
      .then(res => res.ok)
      .then(data => {
        if (!data.err) {
          dispatch({
            type: DELETE_USER,
            payload: id
          })
        } else {
          dispatch({
            type: SEND_ERROR,
            payload: data.err
          });
        }
      }

      );
  };
}
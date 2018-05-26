export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOAD_USER_FROM_TOKEN = "LOAD_USER_FROM_TOKEN";
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USERS = "GET_USER";

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
    return fetch("/user")
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

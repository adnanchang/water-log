import { REGISTER_USER, GET_USERS, LOGIN_USER, LOAD_USER_FROM_TOKEN, LOGOUT_USER } from "../actions/userActions";

const initialState = () => ({
  isAuthenticated: false,
  users: []
});

export default function userReducerState(
  state = initialState(),
  { type, payload }
) {
  switch (type) {
    case GET_USERS: {
      console.log(payload);
      return { ...state, users: payload };
    }
    case REGISTER_USER: {
      console.log(payload);
      return {
        ...state
      };
    }
    case LOGIN_USER: {
      console.log(payload)
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user
      }
    }
    case LOAD_USER_FROM_TOKEN: {
      console.log(payload)
      return {
        ...state,
        isAuthenticated: true,
        user: payload.data
      }
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    }
    default: {
      return { ...state };
    }
  }
}

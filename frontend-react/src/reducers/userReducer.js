import { REGISTER_USER, LOGIN_USER } from "../actions/userActions";

const initialState = () => ({
  user: {},
  isAuthenticated: false,
  token: {}
});

export default function userReducerState(
  state = initialState(),
  { type, payload }
) {
  switch (type) {
    case REGISTER_USER: {
      console.log(payload);
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        token: payload.token
      };
    }
    case LOGIN_USER: {
      console.log(payload);
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        token: payload.token
      }
    }
    default: {
      return { ...state };
    }
  }
}

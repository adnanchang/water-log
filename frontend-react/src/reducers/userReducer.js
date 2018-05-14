import { REGISTER_USER, GET_USER } from "../actions/userActions";

const initialState = () => ({
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
        ...state
      };
    }
      case GET_USER: {
          return {
              ...state,
              users: payload
          };
      }
    default: {
      return { ...state };
    }
  }
}

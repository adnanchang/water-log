import { REGISTER_USER, GET_USERS } from "../actions/userActions";

const initialState = () => ({
  isAuthenticated: false,
  token: {},
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
    default: {
      return { ...state };
    }
  }
}

import { REGISTER_USER, GET_USERS, LOGIN_USER, LOAD_USER_FROM_TOKEN, LOGOUT_USER, EDIT_USER, UPDATE_USER } from "../actions/userActions";

const initialState = () => ({
  users: [],
  isAuthenticated: false,
  user: {},
  userToEdit: {},
  editing: false
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
        ...state,
        isAuthenticated: true,
        user: payload.user
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
        user: payload
      }
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    }
    case EDIT_USER: {
      const user = state.users.find(
        user => user.id === payload
      );
      console.log(user);
      return {
        ...state,
        userToEdit: user,
        editing: true
      };
    }
    case UPDATE_USER: {
      var index = state.users.findIndex(function (item, i) {
        return item.id === payload.id
      });
      if (index != -1) {
        state.users.splice(index, 1);
      }
      return {
        ...state,
        users: state.users.concat(payload),
        editing: false
      };
    }
    default: {
      return { ...state };
    }
  }
}

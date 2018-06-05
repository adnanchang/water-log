import { REGISTER_USER, GET_USERS, LOGIN_USER, LOAD_USER_FROM_TOKEN, LOGOUT_USER, EDIT_USER, UPDATE_USER, SELECT_USER, REMOVE_USER, DELETE_USER } from "../actions/userActions";

const initialState = () => ({
  users: [],
  isAuthenticated: false,
  user: {},
  userToEdit: {},
  editing: false,
  selectedUsers: []
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
    case SELECT_USER: {
      const user = state.users.find(
        user => user.id === payload
      );
      //User already exists in selected users
      if (state.selectedUsers.find(
        myUser => myUser.id == user.id
      )) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          selectedUsers: state.selectedUsers.concat(user)
        }
      }
    }
    case REMOVE_USER: {
      var index = state.selectedUsers.findIndex(function(item, i){
        return item.id === payload
      });
      state.selectedUsers.splice(index, 1);
      const newSelectedUsers = state.selectedUsers.slice();
      return {
        ...state,
        selectedUsers: newSelectedUsers
      }
    }
    case DELETE_USER: {
      var index = state.users.findIndex(function(item, i){
        return item.id === payload
      });
      state.users.splice(index, 1);
      const newUsers = state.users.slice();
      
      return {
        ...state,
        users: newUsers
      }
    }
    default: {
      return { ...state };
    }
  }
}

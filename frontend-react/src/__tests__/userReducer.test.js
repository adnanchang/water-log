import userReducer from "../reducers/userReducer";

var users = [
    {
        id: "1",
        firstName: "First Name 1",
        lastName: "Last Name 2",
        email: "user1@email.com",
        username: "user1",
        encryptedPassword: "userpassword"
    },
    {
        id: "2",
        firstName: "First Name 2",
        lastName: "Last Name 2",
        email: "user2@email.com",
        username: "user2",
        encryptedPassword: "userpassword"
    },
    {
        id: "3",
        firstName: "First Name 3",
        lastName: "Last Name 3",
        email: "user3@email.com",
        username: "user3",
        encryptedPassword: "userpassword"
    },
    {
        id: "4",
        firstName: "First Name 4",
        lastName: "Last Name 4",
        email: "user4@email.com",
        username: "user4",
        encryptedPassword: "userpassword"
    }
];

let initialState = {
    users: [],
    isAuthenticated: false,
    user: {},
    userToEdit: {},
    editing: false,
    selectedUsers: []
};

//TEST FOR CREATE_USER
test("should add a User", () => {
    const payload = {
        user: {
            id: "123",
            firstName: "First Name 123",
            lastName: "Last Name 123",
            email: "user123@email.com",
            username: "user123",
            encryptedPassword: "userpassword"
        }
    };

    const action = {
        type: "REGISTER_USER",
        payload: payload
    };

    const state = userReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: true,
        user: payload.user
    });
});

test("should log in user", () => {
    const payload = {
        user: users[0]
    };

    const action = {
        type: "LOGIN_USER",
        payload: payload
    };

    const state = userReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: true,
        user: payload.user
    });
});

test("should log out user", () => {
    const action = {
        type: "LOGOUT_USER"
    };

    const state = userReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: false,
        user: {}
    });
});

test("should load user from User token", () => {

    const action = {
        type: "LOAD_USER_FROM_TOKEN",
        payload: users[1] //assuming this user is online 
    };
    const state = userReducer(initialState, action);
    //The updated user will be in the bottom of the array
    expect(state).toEqual({
        ...state,
        isAuthenticated: true,
        user: users[1]
    });
});


test("should select a User when adding a trip", () => {
    initialState.users = users;
    const action = {
        type: "SELECT_USER",
        payload: users[1].id
    };
    const selectedUsers = [
        users[1]
    ]
    const state = userReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        selectedUsers: selectedUsers
    });
});

test("should remove a User when adding a trip", () => {
    initialState.selectedUsers = [
        users[0],
        users[1]
    ];
    const action = {
        type: "REMOVE_USER",
        payload: users[1].id
    };
    console.log(action);
    const selectedUsers = [
        users[0]
    ]
    const state = userReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        selectedUsers: selectedUsers
    });
});
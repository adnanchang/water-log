import adminReducer from "../reducers/adminReducer";

const admins = [
    {
        id: "1",
        adminFirstName: "First Name 1",
        adminLastName: "Last Name 2",
        adminEmail: "admin1@email.com",
        adminUsername: "admin1",
        adminEncryptedPassword: "adminpassword"
    },
    {
        id: "2",
        adminFirstName: "First Name 2",
        adminLastName: "Last Name 2",
        adminEmail: "admin2@email.com",
        adminUsername: "admin2",
        adminEncryptedPassword: "adminpassword"
    },
    {
        id: "3",
        adminFirstName: "First Name 3",
        adminLastName: "Last Name 3",
        adminEmail: "admin3@email.com",
        adminUsername: "admin3",
        adminEncryptedPassword: "adminpassword"
    },
    {
        id: "4",
        adminFirstName: "First Name 4",
        adminLastName: "Last Name 4",
        adminEmail: "admin4@email.com",
        adminUsername: "admin4",
        adminEncryptedPassword: "adminpassword"
    }
];

let initialState = {
    isAuthenticated: false,
    admin: {},
    err: null
};

//TEST FOR CREATE_ADMIN
test("should add a Admin", () => {
    const payload = {
        admin: {
            id: "123",
            adminFirstName: "First Name 123",
            adminLastName: "Last Name 123",
            adminEmail: "admin123@email.com",
            adminUsername: "admin123",
            adminEncryptedPassword: "adminpassword"
        }
    };

    const action = {
        type: "REGISTER_ADMIN",
        payload: payload
    };

    const state = adminReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: true,
        admin: payload.admin
    });
});

test("should log in admin", () => {
    const payload = {
        admin: admins[0]
    };

    const action = {
        type: "LOGIN_ADMIN",
        payload: payload
    };

    const state = adminReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: true,
        admin: payload.admin
    });
});

test("should log out admin", () => {
    const action = {
        type: "LOGOUT_ADMIN"
    };

    const state = adminReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        isAuthenticated: false,
        admin: {}
    });
});

test("should send error", () => {
    const payload = {
        err: "Some reason from the server"
    };

    const action = {
        type: "SEND_ERROR",
        payload: payload
    };

    const state = adminReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        err: payload
    });
});

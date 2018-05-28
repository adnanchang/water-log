import { REGISTER_ADMIN, GET_ADMINS, LOGIN_ADMIN, LOAD_ADMIN_FROM_TOKEN, LOGOUT_ADMIN, SEND_ERROR } from "../actions/adminActions";

const initialState = () => ({
    isAuthenticated: false,
    admin: {},
    err: null
});

export default function adminReducerState(
    state = initialState(),
    { type, payload }
) {
    switch (type) {
        case GET_ADMINS: {
            console.log(payload);
            return { ...state, admins: payload };
        }
        case REGISTER_ADMIN: {
            console.log(payload);
            console.log("What is");
            return {
                ...state,
                isAuthenticated: true,
                admin: payload.admin
            };
        }
        case LOGIN_ADMIN: {
            console.log(payload)
            return {
                ...state,
                isAuthenticated: true,
                admin: payload.admin
            }
        }
        case LOAD_ADMIN_FROM_TOKEN: {
            console.log(payload)
            return {
                ...state,
                isAuthenticated: true,
                admin: payload.data
            }
        }
        case LOGOUT_ADMIN: {
            return {
                ...state,
                isAuthenticated: false,
                admin: {}
            }
        }
        case SEND_ERROR: {
            return {
                ...state,
                err: payload
            }
        }
        default: {
            return { ...state };
        }
    }
}

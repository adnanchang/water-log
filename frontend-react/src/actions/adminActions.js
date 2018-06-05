export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const REGISTER_ADMIN = "REGISTER_ADMIN";
export const LOAD_ADMIN_FROM_TOKEN = "LOAD_ADMIN_FROM_TOKEN";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";
export const GET_ADMINS = "GET_ADMIN";
export const SEND_ERROR = "SEND_ERROR";
export const UPDATE_ADMIN = "UPDATE_ADMIN";

export function registerAdmin(formData) {
    return dispatch => {
        return fetch("/admin/create", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: REGISTER_ADMIN,
                    payload: data
                })
            );
    };
}

export function loginAdmin(formData) {
    return dispatch => {
        return fetch("/admin/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    sessionStorage.setItem("adminToken", data.token);
                    dispatch({
                        type: LOGIN_ADMIN,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: SEND_ERROR,
                        payload: data.err
                    });
                }
            });
    };
}

export function loadAdminFromToken(token) {
    return dispatch => {
        return fetch("/admin/loggedInAdmin", {
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
                        type: LOAD_ADMIN_FROM_TOKEN,
                        payload: data
                    });
                } else {
                    //If the server doesn't verify the user then get rid of token and log user out
                    sessionStorage.removeItem("adminToken");
                    dispatch({
                        type: LOGOUT_ADMIN
                    });
                }
            });
    };
}

export function logoutAdmin() {
    sessionStorage.removeItem("adminToken");
    return dispatch => {
        dispatch({
            type: LOGOUT_ADMIN
        });
    };
}

export function updateAdmin(formData) {
    return dispatch => {
        return fetch("/admin/update", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    dispatch(loadAdminFromToken(sessionStorage.getItem("adminToken")));
                } else {
                    dispatch({
                        type: SEND_ERROR,
                        payload: data.err
                    });
                }
            });
    };
}

export function updatePassword(formData) {
    return dispatch => {
        return fetch("/admin/updatePassword", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    sessionStorage.removeItem("adminToken");
                    dispatch({
                        type: LOGOUT_ADMIN
                    });
                } else {
                    dispatch({
                        type: SEND_ERROR,
                        payload: data.err
                    });
                }
            });
    };
}

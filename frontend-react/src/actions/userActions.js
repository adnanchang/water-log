export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const GET_USERS = 'GET_USER';

export function registerUser(formData) {
    return dispatch => {
        return fetch("/user/create", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => dispatch({
                type: REGISTER_USER,
                payload: data
            }));
    }
}


export function getUsers() {
    return dispatch => {
        return fetch("/user")
            .then(res => res.json())
            .then(users =>
                dispatch({
                    type: GET_USERS,
                    payload: users
                })
            );
    };
}

export function loginUser(formData) {
    return dispatch => {
        return fetch("/user/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => dispatch({
                type: LOGIN_USER,
                payload: data
            }));
    }
}
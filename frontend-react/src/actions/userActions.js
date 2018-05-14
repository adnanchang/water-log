export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

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
export const GET_BOATS = "GET_BOATS";
export const CREATE_BOAT = "CREATE_BOAT";
export const EDIT_BOAT = "EDIT_BOAT";
export const UPDATE_BOAT = "UPDATE_BOAT";
export const DELETE_BOAT = "DELETE_BOAT";
export const SEND_ERROR = "SEND_ERROR";

const token = sessionStorage.getItem("adminToken");

export function getBoats() {
    return dispatch => {
        return fetch("/boat", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            }
        })
            .then(res => res.json())
            .then(boats =>
                dispatch({
                    type: GET_BOATS,
                    payload: boats
                })
            );
    };
}

export function getBoatsUser() {
    return dispatch => {
        return fetch("/boat", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('userToken')
            }
        })
            .then(res => res.json())
            .then(boats =>
                dispatch({
                    type: GET_BOATS,
                    payload: boats
                })
            );
    };
}

export function createBoat(formData) {
    return dispatch => {
        return fetch("/boat/create", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(boats => {
                if (!boats.err) {
                    dispatch({
                        type: CREATE_BOAT,
                        payload: boats
                    });
                } else {
                    dispatch({
                        type: SEND_ERROR,
                        payload: boats.err
                    });
                }
            });
    };
}

export function editBoat(id) {
    return {
        type: EDIT_BOAT,
        payload: id
    };
}

export function updateBoat(formData) {
    console.log(formData);
    return dispatch => {
        return fetch("/boat/update", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(boat =>
                dispatch({
                    type: UPDATE_BOAT,
                    payload: boat
                })
            );
    };
}

export function deleteBoat(formData) {
    console.log(formData);
    return dispatch => {
        return fetch("/boat/delete/" + formData, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('adminToken')
            }
        })
            .then(res => res.ok)
            .then(boat =>
                dispatch({
                    type: DELETE_BOAT,
                    payload: formData
                })
            );
    };
}

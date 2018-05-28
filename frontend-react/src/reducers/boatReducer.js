import {
    GET_BOATS,
    CREATE_BOAT,
    EDIT_BOAT,
    UPDATE_BOAT,
    DELETE_BOAT,
    SEND_ERROR
} from "../actions/boatActions";

const initialState = () => ({
    boats: [],
    boatToEdit: {},
    editing: false,
    err: null
});

export default function boatReducerState(
    state = initialState(),
    { type, payload }
) {
    switch (type) {
        case GET_BOATS: {
            return { ...state, boats: payload };
        }
        case CREATE_BOAT: {
            console.log(payload);
            return {
                ...state,
                boats: state.boats.concat(payload)
            };
        }
        case EDIT_BOAT: {
            const boat = state.boats.find(
                boat => boat.id === payload
            );
            console.log(boat);
            return {
                ...state,
                boatToEdit: boat,
                editing: true
            };
        }
        case UPDATE_BOAT: {
            var index = state.boats.findIndex(function (item, i) {
                return item.id === payload.id
            });
            if (index != -1) {
                state.boats.splice(index, 1);
            }
            return {
                ...state,
                boats: state.boats.concat(payload),
                editing: false
            };
        }
        case DELETE_BOAT: {
            var index = state.boats.findIndex(function (item, i) {
                return item.id === payload
            });
            state.boats.splice(index, 1);
            const newBoats = state.boats.slice();

            return {
                ...state,
                boats: newBoats
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

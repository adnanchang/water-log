import { CREATE_TRIP, SEND_ERROR, GET_TRIPS, EDIT_TRIP, SEND_DETAILS } from "../actions/tripActions";

const initialState = () => ({
    trips: [],
    tripToEdit: {},
    editing: false,
    err: null,
    tripDetails: [],
    viewDetails: false
});

export default function tripReducerState(
    state = initialState(),
    { type, payload }
) {
    switch (type) {
        case CREATE_TRIP: {
            return {
                ...state,
                trips: state.trips.concat(payload)
            }
        }
        case GET_TRIPS: {
            return {
                ...state,
                trips: payload
            }
        }
        case EDIT_TRIP: {
            const trip = state.trips.find(
                trip => trip.id === payload
            );
            return {
                ...state,
                tripToEdit: trip,
                editing: true
            };
        }
        case SEND_ERROR: {
            return {
                ...state,
                err: payload.error
            }
        }
        case SEND_DETAILS: {
            const trip = state.trips.find(
                trip => trip.id === payload
            );
            return {
                ...state,
                tripDetails: trip.tripDetails,
                viewDetails: true
            }
        }
        default: {
            return {
                ...state
            };
        }
    }
}
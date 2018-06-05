import { CREATE_TRIP, SEND_ERROR, GET_TRIPS, EDIT_TRIP, SEND_DETAILS, SIGN_IN, SIGN_OUT } from "../actions/tripActions";

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
                trips: payload
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
        case SIGN_IN: {
            return {
                ...state,
                trips: payload
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                trips: payload
            }
        }
        default: {
            return {
                ...state
            };
        }
    }
}
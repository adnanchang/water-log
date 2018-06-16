import tripReducer from "../reducers/tripReducer";

const users = [
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
    }
];

const boats = [
    {
        id: "1",
        name: "Boat 1"
    }
];

const trips = [
    {
        tripDetails: [
            {
                trip: 1,
                user: users[0],
                signedInAt: "2018-06-04T15:43:45.278Z",
                signedOutAt: null,
                id: 1
            },
            {
                trip: 1,
                user: users[1],
                signedInAt: "2018-06-04T15:10:02.127Z",
                signedOutAt: "2018-06-04T15:27:22.325Z",
                id: 2
            }
        ],
        boat: boats[0],
        startTime: "2018-12-31T23:59:00.000Z",
        endTime: "2018-12-31T12:59:00.000Z",
        id: 1
    },
    {
        tripDetails: [
            {
                trip: 2,
                user: users[0],
                signedInAt: null,
                signedOutAt: null,
                id: 3
            },
            {
                trip: 2,
                user: users[1],
                signedInAt: "2018-06-04T15:10:02.127Z",
                signedOutAt: "2018-06-04T15:27:22.325Z",
                id: 4
            }
        ],
        boat: boats[0],
        startTime: "2018-12-31T23:59:00.000Z",
        endTime: "2018-12-31T12:59:00.000Z",
        id: 2
    }
];

let initialState = {
    trips: trips,
    tripToEdit: {},
    editing: false,
    err: null,
    tripDetails: [],
    viewDetails: false
};

//TEST FOR CREATE_TRIP
test("should add a Trip", () => {
    const trip = {
        tripDetails: [
            {
                trip: 3,
                user: 1,
                signedInAt: null,
                signedOutAt: null,
                id: 5
            },
            {
                trip: 2,
                user: 2,
                signedInAt: "2018-06-04T15:10:02.127Z",
                signedOutAt: "2018-06-04T15:27:22.325Z",
                id: 6
            }
        ],
        boat: 1,
        startTime: "2018-12-31T23:59:00.000Z",
        endTime: "2018-12-31T12:59:00.000Z",
        id: 3
    };

    const newTrips = trips.concat(trip);

    const action = {
        type: "CREATE_TRIP",
        payload: newTrips
    };
    const state = tripReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        trips: newTrips
    });
});

// TEST FOR GET_TRIPS
test("should get Trips", () => {
    const action = {
        type: "GET_TRIPS",
        payload: trips
    };

    const state = tripReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        trips: trips
    });
});

// // TEST FOR SEND_DETAILS (Viewing Trip Details)
test("should send Trip Details", () => {
    const action = {
        type: "SEND_DETAILS",
        payload: trips[0].id
    };
    const state = tripReducer(initialState, action);
    console.log(state);
    const trip = state.trips.find(
        trip => trip.id === trips[0].id
    );
    expect(state).toEqual({
        ...state,
        tripDetails: trip.tripDetails,
        viewDetails: true
    });
});

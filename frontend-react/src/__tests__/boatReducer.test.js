import boatReducer from "../reducers/boatReducer";

const boats = [
    {
        id: "1",
        name: "Boat 1"
    },
    {
        id: "2",
        name: "Boat 2"
    },
    {
        id: "3",
        name: "Boat 3"
    },
    {
        id: "4",
        name: "Boat 4"
    }
];

let initialState = {
    boats: [
        {
            id: "1",
            name: "Boat 1"
        },
        {
            id: "2",
            name: "Boat 2"
        },
        {
            id: "3",
            name: "Boat 3"
        },
        {
            id: "4",
            name: "Boat 4"
        }
    ],
    boatToEdit: {},
    editing: false
};

//TEST FOR CREATE_BOAT
test("should add a Boat", () => {
    const boat = {
        id: "123",
        name: "New Boat"
    };

    const action = {
        type: "CREATE_BOAT",
        payload: boat
    };

    const state = boatReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        boats: initialState.boats.concat(boat)
    })
});

// TEST FOR EDIT_BOAT
test("should return Boat to edit", () => {
    const action = {
        type: "EDIT_BOAT",
        payload: "2"
    };

    const state = boatReducer(initialState, action);
    expect(state).toEqual({
        ...state,
        boatToEdit: initialState.boats[1],
        editing: true
    });
});

// TEST FOR UPDATE_BOAT
test("should update Boat", () => {
    //Sending an edited boat to action
    const editedBoat = {
        id: "2",
        name: "Edited Boat"
    };

    const action = {
        type: "UPDATE_BOAT",
        payload: editedBoat
    };

    const state = boatReducer(initialState, action);
    //The updated boat will be in the bottom of the array
    expect(state.boats[3]).toEqual(editedBoat);
});

// TEST FOR DELETE_BOAT
test("should delete Boat", () => {
    const action = {
        type: "DELETE_BOAT",
        payload: initialState.boats[1]
    };
    const state = boatReducer(initialState, action);
    console.log(state);
    expect(state).toEqual({
        ...state,
        boats: [
            initialState.boats[0],
            initialState.boats[1]
        ]
    });
});

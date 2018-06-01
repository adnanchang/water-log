const initialState = () => ({
    trips: [],
    tripToEdit: {},
    editing: false,
    err: null
});

export default function tripReducerState(
    state = initialState(),
    { type, payload }
) { 
    switch (type) {
        default: {
            return {
                ...state
            };
        }
    }
}
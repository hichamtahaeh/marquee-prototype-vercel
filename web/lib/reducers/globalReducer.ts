/**
 * Dispatches an action to the global context, modifying its current state.
 *
 * @param {object} state    Current state of the global context.
 * @param {object} action   Object containing the method and payload to dispatch to the global context.
 *
 * @returns {object} The updated state of the global context.
 */
const globalReducer = (state, action) => {
    const newState = state;
    switch (action.type) {
        case 'SET_USER':
            state.user = action.payload;
            break;
    }
    return newState;
};
export default globalReducer;

const initialState = {
    items: []
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'FILES:ADD_ITEMS':
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ],
            };
        case 'FILES:REMOVE_ITEMS':
            return {
                ...state,
                currentDialog: payload
            };
        default:
            return state;
    }
}
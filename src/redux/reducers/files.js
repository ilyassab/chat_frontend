const initialState = {
    items: []
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'FILE:ADD_ITEMS':
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ],
            };
        case 'FILE:REMOVE_ITEMS':
            return {
                ...state,
                currentDialog: payload
            };
        default:
            return state;
    }
}
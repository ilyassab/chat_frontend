const initialState = {
    items: [],
    currentDialog: 'im',
    firstLoaded: false
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: payload,
                firstLoaded: true
            };
        case 'DIALOGS:SET_CURRENT_DIALOG':
            return {
                ...state,
                currentDialog: payload
            };
        default:
            return state;
    }
}
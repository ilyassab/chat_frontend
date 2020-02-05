import {filesApi} from "../../utils/api";

const actions = {
    setFiles: items => ({
        type: 'FILES:SET_ITEMS',
        payload: items
    }),
    fetchSendFiles: (files) => dispatch => {
        console.log(files);
        files && filesApi.send(files).then((data) => {
            dispatch(actions.setFiles(data));
        });
    },
};

export default actions;
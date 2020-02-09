import {messagesApi} from "../../utils/api";

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
    removeMessage: id => ({
        type: 'MESSAGES:REMOVE_MESSAGE',
        payload: id
    }),
    addMessage: (dialogId) => dispatch => {
        messagesApi.getAll(dialogId)
            .then(({data}) => {
                dispatch(actions.setMessages(data));
            })
    },
    removeMessageById: (id) => dispatch => {
        if (window.confirm('Вы действительно хотите удалить сообщение?')) {
            messagesApi.removeById(id)
                .then(({data}) => {
                    dispatch(actions.removeMessage(id));
                })
                .catch(err => {
                    console.log('Cannot remove message');
                })
        }
    },
    fetchSendMessage: (text, attachments) => (dispatch, getState) => {
        const {dialogs, messages, user} = getState();
        if (attachments.length === 0) {
            text && dialogs.currentDialog && messagesApi.send(text, attachments, dialogs.currentDialog);
        } else {
            let filesId = attachments.map(item => item.uid);
            if (!(attachments[0].ext === 'webm')) {
                dialogs.currentDialog && messagesApi.send(text, filesId, dialogs.currentDialog); //photos
            } else {
                dialogs.currentDialog && messagesApi.send(text, attachments[0]._id, dialogs.currentDialog); //audio
            }
        }
        let id = Math.round(Math.random()*1000);
        dispatch(actions.setMessages([
            ...messages.items,
            {
                _id: `loading${id}`,
                user: {
                    _id: user._id
                }
            }
        ]));
    },
    fetchMessages: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true));
        messagesApi.getAll(dialogId)
            .then(({data}) => {
                dispatch(actions.setMessages(data));
            }).catch(() => {
            dispatch(actions.setIsLoading(false))
        })
    }
};

export default actions;

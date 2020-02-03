import {axios} from '../../core';

export default {
    getAll: id => axios.get(`/messages?dialog=${id}`),
    send: (text, dialogId) => axios.post('/messages', {
        'text': text,
        'dialog_id': dialogId
    }),
    removeById: (id) => axios.delete(`/messages/${id}`)
}
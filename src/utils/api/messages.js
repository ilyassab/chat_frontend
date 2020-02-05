import {axios} from '../../core';

export default {
    getAll: id => axios.get(`/messages?dialog=${id}`),
    send: (text, attachments, dialogId) => axios.post('/messages', {
        'text': text,
        'attachments': attachments,
        'dialog_id': dialogId
    }),
    removeById: (id) => axios.delete(`/messages/${id}`)
}
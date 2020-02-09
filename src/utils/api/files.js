import {axios} from '../../core';

export default {
    send: (file) => {
        const formData = new FormData();
        if (file.size !== 0) {
            formData.append('file', file);
            return axios.post('/files', formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
        }

    }
}
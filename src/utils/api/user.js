import {axios} from '../../core';

export default {
    login: (values) => axios.post('/user/login', values),
    getMe: () => axios.get('user/me'),
    register: (values) => axios.post('/user/register', values),
    verify: (value) => axios.get(`/user/verify?hash=${value}`),
    findUsers: (name) => axios.get(`/user/find?query=${name}`),
}
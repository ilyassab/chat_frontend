import axios from 'axios';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['token'] = localStorage.token;

export default axios;
import {userApi} from "../../utils/api";
import {openNotification} from "../../utils/helpers";
import axios from "axios";

const actions = {
    setUserData: items => ({
        type: 'USER:SET_DATA',
        payload: items
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({data}) => dispatch(actions.setUserData(data)));
    },
    fetchUserRegister: (setSubmitting, setStatus, postData) => dispatch => {
        return userApi.register(postData).then(({data}) => {
            const {status} = data;
            if (status === 'error') {
                setStatus('');
                openNotification({
                    title: "Регистрация неуспешна",
                    text: "Ошибка при регистрации",
                    type: "error"
                });
            } else {
                setStatus('success');
            }
        })
            .catch(err => {
                const data = err.response.data;
                if (data.message && (data.message.code === 11000)) {
                    setStatus('user_found');
                } else {
                    setStatus('error');
                }
            });
    },
    fetchUserLogin: (setSubmitting, setStatus, postData) => dispatch => {
        return userApi.login(postData).then(({data}) => {
            const {status, token} = data;
            if (status === 'error') {
                setStatus('');
                openNotification({
                    title: "Ошибка при авторизации",
                    text: "Неверный логин или пароль",
                    type: "error"
                });
            } else {
                setStatus('');
                openNotification({
                    title: "Отлично",
                    text: "Авторизация успешна",
                    type: "success"
                });
                dispatch(actions.setUserData(data));
                localStorage.token = token;
                axios.defaults.headers.common['token'] = localStorage.token;
                dispatch(actions.fetchUserData());
            }
        })
            .catch(err => {
                setStatus('error');
            });
    }
};

export default actions;
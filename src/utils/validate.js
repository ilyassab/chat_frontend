export default ({isAuth, values, errors}) => {

    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите e-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Неверно введен e-mail';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/i.test(value) && !isAuth) {
                    errors.password = 'Пароль должен содержать цифру и букву';
            }
        },
        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Введите имя';
            }
        },
        password2: (value) => {
            if (!value) {
                errors.password2 = 'Повторите пароль';
            } else if (value !== values.password) {
                errors.password2 = 'Пароли не совпадают';
            }
        }
    };

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
};
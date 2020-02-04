import React from 'react';
import {Form, Icon, Input} from "antd";
import {Block, Button} from "../../../components";
import {Link} from 'react-router-dom';
import {validateField} from '../../../utils/helpers';

const LoginForm = props => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        status
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form className="login-form" onKeyUp={(e) => {
                    e.keyCode === 13 && handleSubmit();
                }}>
                    <Form.Item
                        validateStatus={validateField('email', touched, errors)}
                        hasFeedback
                        help={!touched.email ? '' : errors.email}
                    >
                        <Input
                            id="email"
                            prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="E-mail"
                            size="large"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField('password', touched, errors)}
                        hasFeedback
                        help={!touched.password ? '' : errors.password}
                    >
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Пароль"
                            size="large"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={"error"}
                        help={status === "error" ? "Some errors" : ''}
                    >
                        <Button onClick={handleSubmit} type="primary" size="large">
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/register">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    );
};

export default LoginForm;
import React from 'react';
import {Form, Icon, Input} from "antd";
import {Block, Button} from "../../../components";
import {Link} from 'react-router-dom';
import {validateField} from "../../../utils/helpers";

const RegisterForm = props => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        status,
    } = props;
    return (
        <div>
            {!(status === 'success') ? (<div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>) : (<div className="auth__top">
                        <h2>Регистрация прошла успешно!</h2>
                    </div>)}
            <Block>
                {!(status === 'success') ? (
                    <Form className="login-form">
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
                            validateStatus={validateField('fullname', touched, errors)}
                            hasFeedback
                            help={!touched.fullname ? '' : errors.fullname}
                        >
                            <Input
                                id="fullname"
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Ваше имя"
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
                            validateStatus={validateField('password2', touched, errors)}
                            hasFeedback
                            help={!touched.password2 ? '' : errors.password2}
                        >
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Повторите пароль"
                                size="large"
                                id="password2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={"error"}
                            help={status === "error" ? 'Some errors' : status === "user_found" ? 'E-mail уже зарегистрирован' : ''}
                        >
                            <Button onClick={handleSubmit} type="primary" size="large">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Link className="auth__register-link" to="/login">
                            Войти в аккаунт
                        </Link>
                    </Form>) : (
                    <div className="auth__success-block">
                        <div>
                            <Icon type="info-circle" theme="twoTone"/>
                        </div>
                        <h2>Подтвердите свой аккаунт</h2>
                        <br/>
                        <br/>
                        <p>На Вашу почту отправлено письмо с ссылкой для подтверждения аккаунта.</p>
                    </div>
                )}
            </Block>
        </div>
    );
};

export default RegisterForm;
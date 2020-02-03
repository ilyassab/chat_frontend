import React, {Fragment, useEffect, useState} from 'react';
import {Icon, Spin} from "antd";
import {userApi} from '../../utils/api';

import {Block, Button} from '../../components';


import './VerifyForm.scss';

const VerifyForm = props => {//close
    const {location, history} = props;
    const hash = location.search && location.search.split('=')[1];

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (loading) {
            userApi.verify(hash).then(data => {
                setLoading(false);
                setVerified(true);
            }).catch(err => {
                setLoading(false);
                setVerified(false);
            })
        }
    });

    const handleClick = () => {
      history.push('/login');
    };

    if (loading) {
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
        return (
            <div className="verify">
                <Block className='block__spinner'>
                    <Spin indicator={antIcon}/>
                </Block>
            </div>
        )
    }

    return (
        <div className="verify">
            <Block>
                <div className="verify__success-block">
                    {verified ? (
                        <Fragment>
                            <div>
                                <Icon type="check-circle" theme="twoTone"/>
                            </div>
                            <h2> Вы успешно подтвердили почту!</h2>
                             <br/>
                            <Button onClick={handleClick} type="primary">Войти</Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div>
                                <Icon type="close-circle" theme="twoTone"/>
                            </div>
                            <h2>Пользователь не подтвержден</h2>
                        </Fragment>
                    )
                    }
                </div>
            </Block>
        </div>
    )
};

export default VerifyForm;
import React, {useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Icon} from 'antd';

import {Messages, Status, Sidebar} from "../../containers";

import './Home.scss';
import {dialogsActions} from "../../redux/actions";

const Home = (props) => {

    const {setCurrentDialog} = props;

    useEffect(() => {
        const {location: {pathname}} = props;
        const dialogId = pathname.split('/').pop();

        setCurrentDialog(dialogId);

    }, [props, setCurrentDialog]);

    return (
        <section className="home">
            <div className="chat">
                <Sidebar/>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div/>
                        <Status/>
                        <Icon type='ellipsis' style={{fontSize: '22px'}}/>
                    </div>

                        <Messages/>
                </div>
            </div>
        </section>
    )
};

export default withRouter(connect(
    ({dialogs}) => dialogs,
    dialogsActions
)(Home));
import React from 'react';
import {Empty, Spin} from "antd";

import {Message} from "..";

import './Messages.scss';

const Messages = props => {
    const {
        blockRef,
        items,
        currentUser,
        onDeleteMessage,
        isLoading
    } = props;

    return <div ref={blockRef} className="messages__block">
        {isLoading ? (
                <div className='messages--loading'>
                    <Spin tip="Загрузка сообщений..."/>
                </div>
            )
            : items.length > 0 ? items.map(item => (
                    <Message
                        key={item._id}
                        id={item._id}
                        user={item.user}
                        date={item.date}
                        text={item.text}
                        read={item.read}
                        onDeleteMessage={onDeleteMessage}
                        isMe={currentUser._id === item.user._id}
                    />))
                :
                <Empty description={'Нет ни одного сообщения'}/>}
        </div>
};

export default Messages;
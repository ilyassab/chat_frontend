import React, {useState} from 'react';
import classname from 'classnames';
import {Empty, Spin} from "antd";

import {Message} from "..";

import './Messages.scss';
import {ChatInput} from "../../containers";

const Messages = props => {
    const {
        blockRef,
        items,
        currentUser,
        onDeleteMessage,
        isLoading
    } = props;

    const [attachActive, setAttachActive] = useState(false);

    return (
        <div className={classname("chat__dialog-messages", {
            "chat__dialog-messages-ext": attachActive
        })}
        >
            <div ref={blockRef} className="messages__block">
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
                                attachments={item.attachments}
                                date={item.date}
                                text={item.text}
                                read={item.read}
                                onDeleteMessage={onDeleteMessage}
                                isMe={currentUser._id === item.user._id}
                            />))
                        :
                        <Empty description={'Нет ни одного сообщения'}/>}
            </div>
            <div className="chat__dialog-input">
                <ChatInput setAttachActive={setAttachActive}/>
            </div>
        </div>
    )
};

export default Messages;
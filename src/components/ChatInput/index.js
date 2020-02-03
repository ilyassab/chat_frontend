import React, {useState} from 'react';
import {Button, Input} from "antd";

import './ChatInput.scss';

const ChatInput = (props) => {

    const {
        onSendMessage
    } = props;

    const [value, setValue] = useState('');

    return (
        <div className="chat-input">
            <Input
                onKeyUp={e => {
                    e.keyCode === 13 && onSendMessage(value);
                    e.keyCode === 13 && setValue('');
                }}
                value={value}
                onChange={e => setValue(e.target.value)}
                size='large'
                placeholder='Введите текст сообщения...'
            />
            <div className="chat-input__actions">
                <Button
                    type='ghost'
                    icon='message'
                    onClick={() => {
                        onSendMessage(value);
                        setValue('');
                    }}
                />
            </div>
        </div>
    );
};

export default ChatInput;
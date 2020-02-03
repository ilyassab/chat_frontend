import React, {useState} from 'react';
import {Button, Input} from "antd";
import {UploadField} from '@navjobs/upload';
import {Picker} from "emoji-mart";

import './ChatInput.scss';

const ChatInput = (props) => {

    const {
        onSendMessage
    } = props;

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const togglePicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible)
    };

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                {emojiPickerVisible && (
                    <div className="chat-input__emoji-picker">
                        <Picker set='emojione'/>
                    </div>
                )}
                <Button onClick={togglePicker} type='ghost' icon='smile'/>
            </div>
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
                {value ? <Button type='ghost' icon='message'/> : <Button type='ghost' icon='audio'/>}
                <UploadField
                    file={files => console.log(files)}
                    containerProps={{className: 'photos'}}
                    uploadProps={{
                        accept: '.jpg,.png,.jpeg,.gif,.bmp',
                        multiple: 'multiple'
                    }}
                >
                    <Button type='ghost' icon='camera'/>
                </UploadField>
            </div>
        </div>
    );
};

export default ChatInput;
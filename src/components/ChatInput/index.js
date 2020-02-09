import React, {Fragment, useState} from 'react';
import classnames from 'classnames';
import {Button, Input} from "antd";
import {UploadField} from '@navjobs/upload';
import {Picker} from "emoji-mart";

import UploadFiles from "../UploadFiles";

import './ChatInput.scss';

const ChatInput = (props) => {

    const {
        onSendMessage,
        onSelectFiles,
        setAttachments,
        onRecordingClick,
        onStopRecordingClick,
        recording,
        attachments
    } = props;

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const togglePicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible)
    };

    const onSend = () => {
        if ((attachments.length > 0 && attachments.find(item => item.status === 'uploading') === undefined) || attachments.length === 0) {
            onSendMessage(value, attachments);
            setValue('');
            setAttachments([]);
        }
    };

    return (
        <Fragment>
            <div className="chat-input">
                <div className="chat-input__smile-btn">
                    {emojiPickerVisible && (
                        <div className="chat-input__emoji-picker">
                            <Picker set='emojione'/>
                        </div>
                    )}
                </div>
                <Input
                    onKeyUp={e => {
                        if (e.keyCode === 13) {
                            onSend();
                        }
                    }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    size='large'
                    placeholder='Введите текст сообщения...'
                />
                <div className="chat-input__actions">
                    {value || attachments.length > 0 ?
                        <Button type='ghost' icon='message' onClick={() => {
                            onSend();
                        }}/> :
                        <Button
                            className={classnames('chat-input__audio', {
                                'chat-input__audio-recording' : recording
                            })}
                            onClick={() => {
                                if (!recording) {
                                    onRecordingClick();
                                } else {
                                    onStopRecordingClick()
                                }
                            }}
                            type='ghost'
                            icon='audio'
                        />
                    }
                    <UploadField
                        onFiles={files => onSelectFiles(files)}
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
            <div className={'chat-input__attachments'}>
                <UploadFiles attachments={attachments}/>
            </div>
        </Fragment>
    );
};

export default ChatInput;

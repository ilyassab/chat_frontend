import React, {useState} from 'react';
import {connect} from 'react-redux';

import {ChatInput as BaseChatInput} from "../components";
import {messagesActions} from '../redux/actions'
import {filesApi} from "../utils/api";

window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

const ChatInput = props => {
    const {
        fetchSendMessage,
        setAttachActive
    } = props;

    const [attachments, setAttachments] = useState([]);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    if (attachments.length > 0) {
        setAttachActive(true)
    } else {
        setAttachActive(false)
    }

    const onRecordingClick = () => {
        setRecording(true);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, onRecording, onError);
        }
    };

    const onStopRecordingClick = () => {
        setRecording(false);
        mediaRecorder.stop();
    };

    const onRecording = stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.ondataavailable = e => {
            const file = new File([e.data], 'audio.webm');
            filesApi.send(file).then(({data}) => {
                fetchSendMessage('', [data.file]);
            })
                .catch((err) => console.log(err));
        };
    };

    const onError = err => {
        console.log('The following error occured: ' + err);
    };


    const onSendMessage = (text, attachments) => {
        fetchSendMessage(text, attachments);
    };

    const onSelectFiles = (files) => {

        if (attachments.length + files.length > 4) {
            return;
        }

        for (let file of files) {
            const uid = Math.round(Math.random() * 1000);
            setAttachments((attachments) => [
                ...attachments,
                {
                    uid: uid,
                    name: 'image.png',
                    status: 'uploading',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ]);
            filesApi.send(file).then(({data}) => {

                const file = data.file;

                setAttachments((attachments) => [
                    ...attachments.map(item => {
                        if (item.uid === uid) {
                            return {
                                uid: file._id,
                                name: file.filename,
                                status: 'done',
                                url: file.url,
                            }
                        }
                        return item;
                    })
                ])
            })
        }
    };

    return (
        <BaseChatInput
            onSendMessage={onSendMessage}
            onSelectFiles={onSelectFiles}
            recording={recording}
            onRecordingClick={onRecordingClick}
            onStopRecordingClick={onStopRecordingClick}
            attachments={attachments}
            setAttachments={setAttachments}
        />
    );
};

export default connect(
    null,
    messagesActions
)(ChatInput);

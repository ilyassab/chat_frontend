import React from 'react';
import {connect} from 'react-redux';

import {ChatInput as BaseChatInput} from "../components";
import {messagesActions} from '../redux/actions'

const ChatInput = props => {
    const {
        fetchSendMessage
    } = props;

    const onSendMessage = (text) => {
        fetchSendMessage(text);
    };

    return (
        <BaseChatInput onSendMessage={onSendMessage}/>
    );
};

export default connect(
    null,
    messagesActions
)(ChatInput);
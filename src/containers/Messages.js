import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import {Empty} from 'antd';

import {messagesActions} from "../redux/actions";

import {Messages as BaseMessages} from "../components";
import socket from "../core/socket";

const Messages = props => {

    const messagesRef = useRef(null);

    const {
        items,
        currentDialog,
        fetchMessages,
        data,
        addMessage,
        removeMessageById,
        isLoading
    } = props;

    console.log(props);

    useEffect(() => {
        if (currentDialog !== 'im') {
            fetchMessages(currentDialog);

            socket.on("SERVER:NEW_MESSAGE", () => {
                console.log('hererere');
                addMessage(currentDialog);
            });

        }

        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE');
        }

    }, [currentDialog, fetchMessages, addMessage]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo(0, 9999999);
        }
    }, [items]);

    if (currentDialog === 'im') {
        return <Empty description={'Откройте диалог'}/>;
    }

    return (
            <BaseMessages
                blockRef={messagesRef}
                onDeleteMessage={removeMessageById}
                items={items}
                currentUser={data}
                isLoading={isLoading}
            />
    );
};

export default connect(
    ({dialogs, messages, user}) => ({currentDialog: dialogs.currentDialog, ...messages, ...user}),
    messagesActions
)(Messages);
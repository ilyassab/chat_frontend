import React, {useState} from 'react';
import {connect} from 'react-redux';

import {dialogsApi, userApi} from '../utils/api';
import {Sidebar as BaseSidebar} from "../components";

const Sidebar = props => {

    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [messageText, setMessageText] = useState('');

    const onClose = () => {
        setVisible(false);
        setInputValue('');
        setMessageText('');
    };

    const handleChangeInput = (value) => {
        setInputValue(value)
    };

    const onSearch = (value) => {
        setIsLoading(true);
        userApi.findUsers(value)
            .then(({data}) => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    };

    const onSelectUser = userId => {
        setSelectedUserId(userId);
    };

    const onAddDialog = () => {
        setIsLoading(true);
        if (messageText) {
            dialogsApi
                .create(selectedUserId, messageText)
                .then(({data}) => {
                    setIsLoading(false);
                    setMessageText('');
                    setInputValue('');
                    onClose();
                })
                .catch(() => {
                    setIsLoading(false);
                })
        }
        setIsLoading(false);
    };

    return (
        <BaseSidebar
            inputValue={inputValue}
            visible={visible}
            isLoading={isLoading}
            onClose={onClose}
            onSelectUser={onSelectUser}
            setVisible={setVisible}
            setInputValue={setInputValue}
            setMessageText={setMessageText}
            messageText={messageText}
            onChangeInput={handleChangeInput}
            onSearch={onSearch}
            users={users}
            onAddDialog={onAddDialog}
        />
    );
};

export default connect()(Sidebar);
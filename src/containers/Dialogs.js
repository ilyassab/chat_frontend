import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";

import socket from '../core/socket';
import {dialogsActions} from "../redux/actions";
import {Dialogs as BaseDialogs} from '../components';

const Dialogs = props => {
    const {
        fetchDialogs,
        items,
        data,
        currentDialog,
        firstLoaded
    } = props;

    const userId = data && data._id;
    const [inputValue, setValue] = useState('');
    const [filterArray, setFilteredArray] = useState(Array.from(items));

    const onChangeInput = value => {
        setFilteredArray(items.filter(
            dialog => dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
        ));
        setValue(value);
    };

    useEffect(() => {
        if (!items.length && !firstLoaded) {
            fetchDialogs();

            socket.on("SERVER:DIALOG_CREATED", () => {
                fetchDialogs();
            });

        } else {
            setFilteredArray(items);
        }
    }, [fetchDialogs, items, firstLoaded]);

    return (
        <BaseDialogs
            items={filterArray}
            userId={userId}
            onSearch={onChangeInput}
            inputValue={inputValue}
            currentDialog={currentDialog}
        />
    )

};

export default connect(
    ({dialogs, user}) => ({...user, ...dialogs}),
    dialogsActions
)(Dialogs);
import React from 'react';
import {connect} from 'react-redux';

import {Status as BaseStatus} from "../components";
import isUserOnline from "../utils/isUserOnline";

const Status = props => {
    const {
        dialogs,
        user
    } = props;

    console.log(user);

    if (!dialogs.items.length || dialogs.currentDialog === 'im') {
        return (
            <div className="chat__dialog-header-center">
                <b className="chat__dialog-header-username status__username">Hello, {user ? user.fullname : 'username'}</b>
            </div>
        );
    }

    let online = false;
    const currentDialog = dialogs.items.find(dialog => dialog._id === dialogs.currentDialog);

    if (currentDialog.author._id === user._id) {
        online = isUserOnline(currentDialog.partner.last_seen);
    } else {
        online = isUserOnline(currentDialog.author.last_seen);
    }

    return (
        <BaseStatus online={online}
                    fullname={currentDialog.partner._id === user._id ?
                        currentDialog.author.fullname :
                        currentDialog.partner.fullname}
        />
    );
};

export default connect(
    ({dialogs, user}) => ({
        dialogs,
        user: user.data
    }),
)(Status);
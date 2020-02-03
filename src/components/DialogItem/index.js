import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import {Link} from 'react-router-dom';

import isUserOnline from "../../utils/isUserOnline";
import {ReadIcon, Avatar} from '..';

import './DialogItem.scss';

const getMessageTime = date => {
    const dateObj = new Date(date);
    if (isToday(dateObj)) {
        return format(dateObj, 'HH:mm');
    } else {
        return format(dateObj, 'dd.MM.yyyy');
    }
};
const DialogItem = props => {
    const {
        partner = {},
        author = {},
        userId,
        message,
        unread,
        isMe,
        id,
        currentDialog
    } = props;
    return (
        <Link to={`/dialog/${id}`}>
            <div
                className={classNames('dialogs__item', {
                    'dialogs__item--online': isUserOnline(partner._id === userId ? author.last_seen : partner.last_seen),
                    'active': currentDialog === id
                })}
            >
                <div className="dialogs__item-avatar">
                    {<Avatar user={partner}/>}
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{partner._id === userId ? author.fullname : partner.fullname}</b>
                        {message && <span>{getMessageTime(message.createdAt)}</span>}
                    </div>
                    <div className="dialogs__item-info-bottom">
                        {message && <p>{message.text}</p>}
                        {unread === 0 && isMe && message && <ReadIcon isRead={message.unread}/>}
                        {unread > 0 &&
                        <div className="dialogs__item-info-bottom-count">{unread > 9 ? '+9' : unread}</div>}
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default DialogItem;
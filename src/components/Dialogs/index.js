import React from 'react';
import {Input, Empty} from "antd";

import {DialogItem} from "..";

import './Dialogs.scss';

const Dialogs = ({ items, onSearch, inputValue, currentDialog }) => {
    items = items.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(items);
    return (
        <div className="dialogs">
            <div className="chat__sidebar-search">
                <Input.Search
                    placeholder="Поиск среди контактов"
                    onChange={e => onSearch(e.target.value)}
                    value={inputValue}
                />
            </div>
            {items.length > 0 ? items.map(item => (
                <DialogItem
                    key={item._id}
                    id={item._id}
                    author={item.author}
                    partner={item.partner}
                    message={item.lastMessage}
                    unread={0}
                    onSearch={onSearch}
                    currentDialog={currentDialog}
                />
            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Нет диалогов'}/>}
        </div>
    );
};

export default Dialogs;
import React from 'react';
import {Icon, Modal, Select, Input} from "antd";

import {Dialogs} from "../../containers";

const {Option} = Select;
const {TextArea} = Input;

const Sidebar = props => {
    const {
        visible,
        inputValue,
        messageText,
        setVisible,
        setMessageText,
        isLoading,
        onClose,
        onChangeInput,
        onSearch,
        onSelectUser,
        onAddDialog,
        users=[]
    } = props;

    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <Icon type="team"/>
                    <span>Список диалогов</span>
                </div>
                <Icon onClick={() => setVisible(true)} type="form"/>
            </div>
            <div className="chat__sidebar-dialogs">
                <Dialogs/>
            </div>
            <Modal
                title='Создать диалог'
                visible={visible}
                onOk={onAddDialog}
                onCancel={onClose}
                okText='Создать'
                cancelText='Закрыть'
                confirmLoading={isLoading}
            >
                <p>Введите имя или e-mail пользователя:</p>
                <Select
                    value={inputValue}
                    style={{ width: '100%' }}
                    onSearch={onSearch}
                    onChange={onChangeInput}
                    onSelect={onSelectUser}
                    notFoundContent={null}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    showSearch
                >
                    {options}
                </Select>
                <br />
                <br />
                <p>Введите текст сообщения:</p>
                <TextArea
                    onChange={e => setMessageText(e.target.value)}
                    value={messageText}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </Modal>
        </div>
    );
};

export default Sidebar;
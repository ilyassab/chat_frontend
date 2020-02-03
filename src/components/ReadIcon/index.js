import React from 'react';
import checkedSVG from "../../assets/img/read.svg";
import notCheckedSVG from "../../assets/img/noread.svg";

const ReadIcon = ({isRead}) =>
    isRead ? (
        <img className="message__icon-read" src={checkedSVG} alt="Checked icon"/>
    ) : (
        <img className="message__icon-read message__icon-read--no" src={notCheckedSVG} alt="Checked icon"/>
    );

export default ReadIcon;
import React, {useState, useRef, useEffect} from 'react';
import {Popover, Button} from 'antd';
import classNames from 'classnames';

import {Time, ReadIcon, Avatar} from '..';
import {convertCurrentTime} from '../../utils/helpers';

import waveSvg from '../../assets/img/wave.svg';
import playSVG from '../../assets/img/play.svg';
import pauseSVG from '../../assets/img/pause.svg';

import './Message.scss';

const AudioElem = ({audio}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef(null);

    const togglePlay = () => {
        if (audioElem) {
            if (!isPlaying) {
                audioElem.current.play();
            } else {
                audioElem.current.pause();
            }
        }
    };

    useEffect(() => {
        audioElem.current.addEventListener(
            'playing',
            () => {
                setIsPlaying(true);
            });
        audioElem.current.addEventListener(
            'ended',
            () => {
                setIsPlaying(false);
                setProgress(0);
            });
        audioElem.current.addEventListener(
            'pause',
            () => {
                setIsPlaying(false);
            });
        audioElem.current.addEventListener(
            'timeupdate',
            () => {
                const duration = (audioElem.current && audioElem.current.duration) || 0;
                setCurrentTime(audioElem.current.currentTime);
                setProgress((audioElem.current.currentTime / duration) * 100);
            })
    }, []);

    return (
        <div className="message__audio">
            <audio ref={audioElem} src={audio} preload="auto"/>
            <div className="message__audio-progress" style={{width: progress + '%'}}/>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ?
                            <img src={pauseSVG} alt={`waveSvg ${audio}`}/> :
                            <img src={playSVG} alt={`waveSvg ${audio}`}/>
                        }
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img src={waveSvg} alt={`waveSvg ${audio}`}/>
                </div>
                <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
    );
};

const Message = (props) => {
    const {
        user = {},
        text,
        read,
        id,
        date,
        audio,
        isMe,
        onDeleteMessage,
        attachments = [],
        isTyping
    } = props;

    return (
        <div className={classNames('message', {
            "message--isme": isMe,
            "message--is-typing": isTyping,
            "message--is-audio": audio,
            "message--image": attachments.length === 1 && text === ''
        })}>
            <div className="message__content">
                {isMe && <ReadIcon isRead={read}/>}
                <Popover
                    content={
                        <div>
                            <Button onClick={() => onDeleteMessage(id)} >Удалить сообщение</Button>
                        </div>
                    }
                    trigger='click'
                >
                    <div className='message__icon-actions'>
                        <Button type='link' icon='ellipsis'/>
                    </div>
                </Popover>
                <div className="message__avatar">
                    <Avatar user={user}/>
                </div>
                <div className="message__info">
                    {(audio || text || isTyping) &&
                    <div className="message__bubble">
                        {text && <p className="message__text">{text}</p>}
                        {isTyping && (
                            <div className="message__typing">
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        )}
                        {audio && <AudioElem audio={audio}/>}
                    </div>
                    }
                    <div className="message__attachments">
                        {
                            attachments.map(item => (
                                <div key={item._id} className="message__attachments-item">
                                    <img src={item.url} alt={item.filename}/>
                                </div>
                            ))
                        }
                    </div>
                    {date &&
                    <span className="message__date">
                        <Time date={date}/>
                    </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Message;
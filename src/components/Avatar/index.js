import React from 'react';
import {generateAvatarFromHash} from "../../utils/helpers";

import './Avatar.scss';

const Avatar = ({user}) => {
    if (user.avatar) {
        return <img src={user.avatar} alt={`${user.avatar} avatar`}/>
    } else {
        const colors = generateAvatarFromHash(user._id);
        const firstUserChar = user.fullname[0].toUpperCase();
        return (
            <div
                className="avatar avatar--symbol"
                style={{background: `linear-gradient(135deg,${colors.color} 0%,${colors.colorLighten} 96.52%)`}}
            >
                {firstUserChar}
            </div>
        )
    }
};

export default Avatar;
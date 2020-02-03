import React from 'react';
import classNames from 'classnames';

import './AuthBlock.scss';

const AuthBlock = ({children, className}) => <div className={classNames("block", className)}>{children}</div>;

export default AuthBlock;
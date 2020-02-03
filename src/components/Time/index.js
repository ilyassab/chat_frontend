import React, {Fragment} from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import rulocale from 'date-fns/locale/ru';

const Time = ({date}) => (
    <Fragment>
        {formatDistanceToNow(new Date(date), {addSuffix: true, locale: rulocale})}
    </Fragment>
);

export default Time;
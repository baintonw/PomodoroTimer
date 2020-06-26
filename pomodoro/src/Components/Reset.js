import React from 'react';

//styles
import './reset.scss';

const Reset = (props) => {
    return(
        <button onClick={(e) => props.resetClock(e)} className="reset-btn">Reset</button>
    )
};

export default Reset
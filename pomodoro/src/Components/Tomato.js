import React from 'react';
import tomato from '../assets/tomato.svg';
import './tomato.scss'


const Tomato = () => {
    return(
        <div className="tomato">
            <img className="tomato-img" src={tomato} />
        </div>
    )
}

export default Tomato
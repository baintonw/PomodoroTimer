import React from 'react';

//scss
import './timer.scss';

const formatTime = (timeLeft) => {
        //should take time elapsed timeElapsed and format it as a string
        //mm:ss
    
        let minutes = ''
        let seconds = ''
    
        minutes = timeLeft.minutes + ''
        seconds = timeLeft.seconds + ''
        
        if(minutes.length < 2) {
            minutes = '0' + minutes
        }
        if(seconds.length < 2) {
            seconds = '0' + seconds
        }
    
        return minutes + ':' + seconds    
    }

const Timer = (props) => {
    return (
    <button onClick={props.running ? (e) => props.stopTimer(e) : (e) => props.startTimer(e)} className="timer">{formatTime(props.timeLeft)}</button>
    )
};

export default Timer
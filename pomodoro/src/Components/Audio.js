import React from "react"


const Audio = (props) => {
    return(
        <div>
            <audio src={props.src} controls ></audio>
        </div>
    )
};

export default Audio
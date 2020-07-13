import React from "react"

//styles
import "./checkbox-prompt.scss"

//Icons
import Icon from "./Icon.js"

//svgs
import path from "../assets/cross.svg";



const CheckboxPrompt = (props) => {
    return(
        <div className="checkbox-prompt">
                <div onClick={(e) => props.promptCheck(e)}>
                    <Icon  svgPath={path}></Icon>
                </div>
                <h2 className="checkbox-prompt__heading">Please check a box to start your break!</h2>
        </div>
    )
};

export default CheckboxPrompt
import React from "react"

//styles
import "./modal-content.scss"

//Icons
import Icon from "./Icon.js"

//svgs
import path from "../assets/cross.svg";



const CheckboxModalContent = (props) => {
    console.log('props in welcome modal: ', props)
    return(
        <div className="modal-container__content">
                <div onClick={(e) => props.promptCheck(e)}>
                    <Icon  svgPath={path}></Icon>
                </div>
                <h2 className="modal-container__content__heading">Please check a box to start your break!</h2>
                <button>Click me to make me go away</button>
        </div>
    )
};

export default CheckboxModalContent
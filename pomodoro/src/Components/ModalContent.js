import React from "react"

//Components
import WelcomeModalContent from "./WelcomeModalContent"
import Icon from "./Icon.js"

//styles
import "./modal-content.scss"

//svgs
import path from "../assets/cross.svg";



const renderContent = (props) => {

    //default welcome screen content
    return(
        <WelcomeModalContent handleModalToggle={props.handleModalToggle}
                             setTask={props.setTask}
                             handleTaskSubmit={props.handleTaskSubmit}
                             handleMenuToggle={props.handleMenuToggle}               
        >
        </WelcomeModalContent>
    )
};

const ModalContent = (props) => {
    return (renderContent(props))
};

export default ModalContent
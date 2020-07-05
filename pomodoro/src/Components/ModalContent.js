import React from "react"

//Components
import Icon from "./Icon.js"
import WelcomeModalContent from "./WelcomeModalContent.js"

//styles
import "./modal-content.scss"

//svgs
import path from "../assets/cross.svg";

const renderContent = (props) => {
    //default welcome screen content
    return(
        <WelcomeModalContent></WelcomeModalContent>
    )
        
    
};

const ModalContent = (props) => {
    return (renderContent(props))
};

export default ModalContent
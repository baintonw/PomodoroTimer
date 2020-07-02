import React from "react";

//Components
import ModalContent from "../Components/ModalContent.js"
// import Icon from "./Icon.js"

//styles
import "./modal.scss";

//svgs
import path from "../assets/cross.svg";

const handleClick = (e) => {
    console.log('you clicked it!')
}

const renderModalContent = (props) => {
    if(props.break) {
        return null
    } else {
        return (
            <ModalContent
                    break={props.break}
                    task={props.task}
                    handleTaskSubmit={props.handleTaskSubmit}
                    handleMenuToggle={props.handleMenuToggle}
                    setTask={props.setTask}
                    handleModalToggle={props.handleModalToggle}
            ></ModalContent>
        )
    } 
};

const Modal = (props) => {
    console.log('this is the props: ', props)
    return(
        <div className={props.modalIsOpen ? "modal-container" : "modal-container closed"}>
            {renderModalContent(props)}
        </div>
    )
};

export default Modal;
import React from "react";

//Components
import ModalContent from "../Components/ModalContent.js"
// import Icon from "./Icon.js"

//styles
import "./modal.scss";

//svgs
import path from "../assets/cross.svg";
import CheckboxModalContent from "../Components/CheckboxModalContent.js";

const handleClick = (e) => {
    console.log('you clicked it!')
}

const renderModalContent = (props) => {
    //If prompted to pick a task(default state), prompt a user to pick a task
    if(props.pickATask){
        //render the modal content at beginning of ux
        console.log('%c PICK A TASK IS PRESENT', 'color: tomato; font-size: 25px')
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
    //if we're on break don't render modal content, render something else
    //and if there is no prompt to check a box

    if(props.break && !props.checkboxPrompt) {
        return null
    }
    
    
};

const Modal = (props) => {
    console.log('this is the props in MODAL: ', props)
    return(
        <div className={props.modalIsOpen ? "modal-container" : "modal-container closed"}>
            {renderModalContent(props)}
        </div>
    )
};

export default Modal;
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

const Modal = (props) => {
    // console.log('this is the props: ', props)
    return(
        <div className={props.modalIsOpen ? "modal-container" : "modal-container closed"}>
            <ModalContent
                handleModalToggle={props.handleModalToggle}
            ></ModalContent>
        </div>
    )
};

export default Modal;
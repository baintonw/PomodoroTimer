import React from "react";

//Components
import Icon from "../Components/Icon.js"

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
            <div className="modal-container__content">
                <div onClick={(e) => props.handleModalToggle(e)}>
                    <Icon  svgPath={path}></Icon>
                </div>
                <h2 className="modal-container__content__heading">What are you working on today?</h2>
                <form onSubmit={props.handleTaskSubmit}>
                    {/* <label>What are you working on today?</label> */}
                    <label name="task">Project</label>
                    <input name="task"></input>
                    <label name="task">Task</label>   
                    <input 
                        onChange={(e) => props.setTask(e)}
                        name="task"
                        required
                        ></input>
                    <input type="submit" value="Go"></input>
                </form>
            </div>
        </div>
    )
};

export default Modal;
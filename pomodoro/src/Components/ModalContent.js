import React from "react"

//Components
import Icon from "./Icon.js"

//styles
import "./modal-content.scss"

//svgs
import path from "../assets/cross.svg";

const ModalContent = (props) => {
    return(
        <div className="modal-container__content">
                <div onClick={(e) => props.handleModalToggle(e)}>
                    <Icon  svgPath={path}></Icon>
                </div>
                <h2 className="modal-container__content__heading">What are you working on today?</h2>
                <form onSubmit={(e) =>
                        {
                             props.handleTaskSubmit(e);
                             props.handleMenuToggle(e);
                            
                        }
                    }>
                    
                    <label className="modal-container__content__label" name="task">Please pick a task: </label>  
                    <input className="modal-container__content__input"
                        onChange={(e) => props.setTask(e)}
                        name="task"
                        required
                        ></input>
                    <input className="btn-submit" type="submit" value="Submit"></input>
                </form>
            </div>
    );
};

export default ModalContent
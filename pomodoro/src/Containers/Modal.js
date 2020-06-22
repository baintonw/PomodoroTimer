import React from "react";

//styles
import "./modal.scss"

const Modal = (props) => {
    return(
        <div className="modal-container">
            <div className="modal-container__content">
                <h2 className="modal-heading">What are you working on today?</h2>
                <form>
                    {/* <label>What are you working on today?</label> */}
                </form>
            </div>
        </div>
    )
};

export default Modal;
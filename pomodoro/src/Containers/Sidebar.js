import React from 'react';


//styles
import './sidebar.scss'


const Sidebar = (props) => {
    return (
        <div className={props.menuIsOpen ? "menu open" : "menu"}>
                <ul className="menu-list">
                    <li className="menu-list__item">
                    <h2 className="menu-list__heading">Current Task</h2>
                    <p className="menu-task-name">{props.task}</p>
                    </li>
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Interval</h2>
                        <p>25 minutes</p>
                    </li>
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Break Period</h2>
                        <p>5 minutes</p>
                    </li>
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Checks</h2>

                        <div className="checkbox-container">
                            <input onClick={(e) => props.handleCheck(e)} className="checkbox-container__checkbox" type="checkbox"/>
                            <input onClick={(e) => props.handleCheck(e)} className="checkbox-container__checkbox" type="checkbox"/>
                            <input onClick={(e) => props.handleCheck(e)} className="checkbox-container__checkbox" type="checkbox"/>
                            <input onClick={(e) => props.handleCheck(e)} className="checkbox-container__checkbox" type="checkbox"/>
                        </div>


                    </li>
                </ul>
        </div>
        
    )
};

export default Sidebar
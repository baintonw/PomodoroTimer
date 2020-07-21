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
                        <h2 className="menu-list__heading">Set</h2>
                        <p>{props.set + 1}</p>
                    </li>
                    <li className="menu-list__item">
    <h2 className="menu-list__heading">Interval</h2>
                        <p>{props.intervals}/4</p>
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
                <button className="clock-in-btn spin circle" onClick={(e) => props.clockIn(e)} >{props.clockedIn ? 'Clock Out' : 'Clock In'}</button>


        </div>
        
    )
};

export default Sidebar
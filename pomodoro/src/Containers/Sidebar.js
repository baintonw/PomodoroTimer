import React from 'react';


//styles
import './sidebar.scss'


const Sidebar = (props) => {
    return (
        <div className={props.menuIsOpen ? "menu open" : "menu"}>
                <ul className="menu-list">
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Current Task</h2>
                        <h3 className="menu-list__value">{props.task}</h3>
                    </li>
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Set</h2>
                        <h3 className="menu-list__value">{props.set + 1}</h3>
                    </li>
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Interval</h2>
                        <h3 className="menu-list__value">{props.intervals}/4</h3>
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
                <button className={!props.clockedIn ? "clock-in-btn spin circle blue" : "clock-in-btn spin circle red"} onClick={(e) => props.clockIn(e)} >{props.clockedIn ? 'Clock Out' : 'Clock In'}</button>


        </div>
        
    )
};

export default Sidebar
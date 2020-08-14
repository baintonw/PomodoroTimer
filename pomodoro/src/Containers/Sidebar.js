import React from 'react';

import { Link } from 'react-router-dom';


//styles
import './sidebar.scss'

//components
import Timesheet from '../Components/Timesheet'


const Sidebar = (props) => {
    console.log('clock in time in Sidebar: ', props.clockInTime)
    return (
        <div className={props.menuIsOpen ? "menu open" : "menu"}>
                {/* <h2>{props.formatDateToString(props.clockInTime)}</h2> */}
                <ul className="menu-list">
                    <li className="menu-list__item">
                        <h2 className="menu-list__heading">Clock In Time</h2>
                        <h3 className="menu-list__value">{props.clockInTime ? props.formatDateToString(props.clockInTime) : "Not clocked in"}</h3>
                    </li>
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
                <Link to="timesheet">Timesheet</Link>

        </div>
        
    )
};

export default Sidebar
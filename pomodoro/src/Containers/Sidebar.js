import React from 'react';

//styles
import './sidebar.scss'

const Sidebar = () => {
    return (
        <div className="menu open">
            <div className="list-container">
                {/* flex container */}
                <ul className="menu-list">
                    {/* item */}
                    <li className="menu-list-item">
                            <h2>Current Task</h2>
                            <p className="menu-task-name">Work</p>
                    </li>
                    <li className="menu-list-item" style={{ paddingRight: `2.9rem`}}>
                        <h2>Interval</h2>
                        <p>25 minutes</p>
                    </li>
                    <li className="menu-list-item">
                        <h2>Break Period</h2>
                        <p>5 minutes</p>
                    </li>
                    <li className="menu-list-item">
                        <h2>Checks</h2>
                        <div className="checks-container">
                            <input className="menu-checkbox" type="checkbox"/>
                            <input className="menu-checkbox" type="checkbox"/>
                            <input className="menu-checkbox" type="checkbox"/>
                            <input className="menu-checkbox" type="checkbox"/>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
        
    )
};

export default Sidebar
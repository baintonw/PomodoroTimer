import React from 'react'

//Components
import Set from './Set'

const colorArray = [];

const Timesheet = (props) => {
    return (
        <div className="timesheet">
            <h1>Timesheet - 08/14/20</h1>
            <Set number="1"></Set>
            <Set number="2"></Set>
            <Set number="3"></Set>
            <Set number="4"></Set>
            <Set number="5"></Set>
        </div>
    )
}

export default Timesheet
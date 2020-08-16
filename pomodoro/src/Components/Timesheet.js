import React from 'react'

//Components
import Set from './Set'

//styles
import './timesheet.scss'


const Timesheet = (props) => {
    console.log('this is props in timesheet: ', props)

    return (
        <div className="timesheet">
            <h1 className="heading">Timesheet - 08/14/20</h1>
            <h2>User: {props.location.state.user}</h2>
            <h2>Age: {props.location.state.age}</h2>
            <Set number="1"></Set>
            <Set number="2"></Set>
            <Set number="3"></Set>
            <Set number="4"></Set>
            <Set number="5"></Set>
        </div>
    )
}

export default Timesheet
import React from "react"

//Styles
import "./set.scss"

const Set = (props) => {
    return (
        <div className="set">
            <h2 className="set__number">{props.number}</h2>
            <table className="set__table">
                <thead>
                    <tr className="set__row">
                        <th className="set__heading">Number</th>
                        <th className="set__heading">Start</th>
                        <th className="set__heading">End</th>
                        <th className="set__heading">Task</th>
                    </tr>
                </thead>
                <tbody>        
                    <tr className="set__row">
                        <td>1</td>
                        <td>9:00 AM</td>
                        <td>9:25 PM</td>
                        <td>Center the div</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="set__row">
                        <td>2</td>
                        <td>9:30 AM</td>
                        <td>9:55 PM</td>
                        <td>Color the div</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="set__row">
                        <td>3</td>
                        <td>10:00 AM</td>
                        <td>10:25 PM</td>
                        <td>Box shadow</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="set__row">
                        <td>4</td>
                        <td>10:30 AM</td>
                        <td>10:55 PM</td>
                        <td>Touch ups</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Set
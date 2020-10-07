import React from 'react'

const goal = ({ goal, updates }) => {
    return (
        <div>
            <label>
                <input type="checkbox" defaultChecked={goal.fields.complete} disabled />
            </label>
            <h2>{goal.fields.title}</h2>
            <div>
                <h3>DETAILS</h3>
                <p>{goal.fields.details}</p>
                <h3>UPDATES</h3>
                {updates.map((update, index) => (
                    <p key={index}>{update.fields.update}</p>
                ))}
            </div>
        </div>
    )
}

export default goal

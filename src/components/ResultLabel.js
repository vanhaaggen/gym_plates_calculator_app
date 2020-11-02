import React from 'react'
import '../styles/ResultLabel.sass'

export default function (props) {
    const { weight, amount, unit, color } = props

    let abbrev = unit === 'kilos' ? 'Kg' : 'Lbs'

    const lableStyle = {
        background: `linear-gradient(to bottom right,transparent 50%,${color} 0) bottom right/10px 10px no-repeat,
        #ffffff`,
        border: `1px solid ${color}`,
        overflow: 'hidden'
    }

    return (
        <div className="result-label-cont" style={lableStyle}>
            <div className="result-label-cont__text" >
                <p>{`${amount} X`}</p>
                <p className="inner-label">
                    {weight} <span className="abbrev">{abbrev}</span>
                </p>
            </div >
        </div >

    )
}
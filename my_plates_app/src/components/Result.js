import React from 'react'
import getPlatesColor from '../logic/colorPlates'
import './Result.sass'

export default function ({ plates }) {



    return (
        <div className="result-cont">
            <ul className="result-cont__ul">
                {plates.map((value, i) => {
                    return (
                        <li key={`plates-li-${i}`}>
                            <p className="result-cont__ul--txt"
                                style={{
                                    borderLeft: `10px solid ${getPlatesColor(value[0])}`
                                }}>{value[0]} X {value[1]}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
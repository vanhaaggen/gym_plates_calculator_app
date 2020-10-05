import React from 'react'
import '../styles/BarWeightInput.sass'

export default function ({ bWeight }) {
    return (
        <div className="input-cont">
            <div className="input-cont__group">
                <label className="input-cont__group--label" htmlFor="targetWeight">Target Weight</label>
                <input className="input-cont__group--input" type="number" name="targetWeight" id="targetWeight" />
            </div>
            <div className="input-cont__group">
                <label className="input-cont__group--label" htmlFor="barWeight">Bar Weight</label>
                <select className="input-cont__group--input select" name="barWeight" id="barWeight">
                    <option value={`${bWeight[0]}`}>{bWeight[0]}</option>
                    <option value={`${bWeight[1]}`}>{bWeight[1]}</option>
                </select>
            </div>
        </div>
    )
}
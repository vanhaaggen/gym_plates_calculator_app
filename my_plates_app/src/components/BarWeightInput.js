import React from 'react'

export default function ({ bWeight }) {
    return (
        <div className="">
            <div className="">
                <label htmlFor="targetWeight">Target Weight</label>
                <input type="number" name="targetWeight" id="targetWeight" />
            </div>
            <div className="l">
                <label htmlFor="barWeight">Bar Weight</label>
                <select name="barWeight" id="barWeight">
                    <option value={`${bWeight[0]}`}>{bWeight[0]}</option>
                    <option value={`${bWeight[1]}`}>{bWeight[1]}</option>
                </select>
            </div>
        </div>
    )
}
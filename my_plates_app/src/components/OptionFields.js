import React, { useState } from 'react'
import getAvailPlates from '../logic/getAvailPlates'
import calcWeights from '../logic/calcWeights'

export default function () {
    const weights = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]

    const handleCalcWeights = async (desiredWeight, barWeight, weightsAvail) => {
        try {
            const weightsToRack = await calcWeights(desiredWeight, barWeight, weightsAvail)
            console.log('Response arrived: ', weightsToRack)
        } catch ({ message }) {
            console.log(message)

        }
    }
    return (
        <div className="container">
            <form className="form" onSubmit={event => {
                event.preventDefault()

                const { target: { targetWeight: { value: targetWeight }, barWeight: { value: barWeight }, weight } } = event
                const availPlates = getAvailPlates(weight)

                handleCalcWeights(Number(targetWeight), Number(barWeight), availPlates)
            }
            }>
                <div className="">
                    <div className="">
                        <label htmlFor="targetWeight">Target Weight</label>
                        <input type="number" name="targetWeight" id="targetWeight" />
                    </div>
                    <div className="l">
                        <label htmlFor="barWeight">Bar Weight</label>
                        <select name="barWeight" id="barWeight">
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <h3>Available Plates</h3>
                <div className="">
                    {weights.map((weight, index) => {
                        return <>
                            <div className="" key={`w-${index}`}>
                                <label className="" htmlFor={`weight${weight}`}>{weight}</label>
                                <input type="number" name="weight" min="0" max="12" defaultValue="0" />
                            </div>
                        </>
                    })}
                </div>
                <button className="bttn">Calculate</button>
            </form>
        </div>
    )

    function newFunction() {
        debugger
    }
}
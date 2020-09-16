import React, { useState, useReducer } from 'react'
import getAvailPlates from '../logic/getAvailPlates'
import calcWeights from '../logic/calcWeights'

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]
const pounds = [100, 55, 45, 35, 25, 10, 5, 2.5, 1.25]

export default function () {
    const [massUnit, setMassUnit] = useState(kilos)

    function MassUnitButton() {
        return (
            <>
                <button onClick={() => setMassUnit(kilos)}>Kilos</button>
                <button onClick={() => setMassUnit(pounds)}>Pounds</button>
            </>
        )
    }

    const unit = massUnit[0] === 25 ? 'kilos' : 'pounds'
    console.log('optionfields: ', unit)

    const handleCalcWeights = async (desiredWeight, barWeight, weightsAvail, unit) => {
        try {
            const weightsToRack = await calcWeights(desiredWeight, barWeight, weightsAvail, unit)

            console.log('Response arrived: ', weightsToRack.result)
        } catch ({ message }) {
            console.log(message)
        }
    }


    return (
        <div className="container">
            <MassUnitButton />
            <p>{unit}</p>
            <form className="form" onSubmit={event => {
                event.preventDefault()

                const { target: { targetWeight: { value: targetWeight }, barWeight: { value: barWeight }, weight } } = event
                const availPlates = getAvailPlates(weight)

                handleCalcWeights(Number(targetWeight), Number(barWeight), availPlates, unit)
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
                    {massUnit.map((weight, index) => {
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
import React, { useState } from 'react'
import getAvailPlates from '../logic/getAvailPlates'
import calcWeights from '../logic/calcWeights'
import BarWeightInput from './BarWeightInput'

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]
const pounds = [100, 55, 45, 35, 25, 10, 5, 2.5, 1.25]
const barKilos = [15, 20]
const barPounds = [33, 44]

export default function () {
    const [massUnit, setMassUnit] = useState(kilos)
    const [data, setData] = useState()
    const [error, setError] = useState()

    let unit = massUnit[0] === 25 ? 'kilos' : 'pounds'
    let barWeight = unit === 'kilos' ? barKilos : barPounds

    function setToNull() {
        setData(null)
        setError(null)
    }

    function MassUnitButton() {
        return (
            <>
                <button onClick={() => {
                    setMassUnit(kilos)
                    setToNull()
                }}>Kilos</button>
                <button onClick={() => {
                    setMassUnit(pounds)
                    setToNull()
                }}>Pounds</button>
            </>
        )
    }

    const handleCalcWeights = async (desiredWeight, barWeight, weightsAvail, unit) => {
        try {
            const weightsToRack = await calcWeights(desiredWeight, barWeight, weightsAvail, unit)
            setData(weightsToRack.result)
            console.log('Response arrived: ', weightsToRack.result)
        } catch ({ message }) {
            setError(message)
            console.log(message)
        }
    }



    const inputWeightAmount = (amount) => {
        let arr = []
        for (let i = 0; i <= amount; i++) {
            arr.push(<option value={i}>{i}</option>)
        }
        return arr
    }

    return (
        <div className="container">
            <MassUnitButton />
            <p>{unit}</p>
            <form className="form" onSubmit={event => {
                event.preventDefault()

                const { target: { targetWeight: { value: targetWeight }, barWeight: { value: barWeight }, weight } } = event
                const availPlates = getAvailPlates(weight)
                console.log(availPlates)
                handleCalcWeights(parseInt(targetWeight), parseInt(barWeight), availPlates, unit)
            }
            }>
                <BarWeightInput bWeight={barWeight} />
                <h3>Available Plates</h3>
                <div className="">
                    {massUnit.map((weight, index) => {
                        return <>
                            <div className="" key={`w-${index}`}>
                                <label className="" htmlFor={`weight${weight}`}>{weight}</label>
                                <select name="weight" id="weight">
                                    {inputWeightAmount(20)}
                                </select>
                            </div>
                        </>
                    })}
                </div>
                <button className="bttn">Calculate</button>
            </form>
            {data && <ul>
                {data.map(value => {
                    return (
                        <li>
                            <p>{value[0]} X {value[1]}</p>
                        </li>
                    )
                })}
            </ul>}
            {error && <p>{error}</p>}
        </div>

    )


}
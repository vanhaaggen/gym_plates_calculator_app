import React, { useEffect, useState } from 'react'
import wakeupDyno from '../helpers/wake-up-dyno'
import getAvailPlates from '../helpers/getAvailPlates'
import calcWeights from '../helpers/calcWeights'
import BarWeightInput from './BarWeightInput'
import Result from './Result'
import '../styles/App.sass'

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]
const barKilos = [15, 20]
const barPounds = [33, 44]

export default function () {
    const [massUnit, setMassUnit] = useState(kilos)
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [toogle, setToogle] = useState(false)

    let unit = massUnit[0] === 25 ? 'kilos' : 'pounds'
    let barWeight = unit === 'kilos' ? barKilos : barPounds

    useEffect(() => {
        async function wakeup() {
            try {
                const response = await wakeupDyno()
                console.log(response)
            } catch ({ error }) {
                console.log(error)
            }
        }
        wakeup()
    }, [])

    function resetAll() {
        setData(null)
        setError(null)
    }

    function isButtonActive(strg) {
        if (unit === strg) {
            return {
                background: '#545353',
                color: '#e2e2e2',
                border: '1px solid #545353'
            }
        }
    }

    function MassUnitButton() {
        return (
            <>
                <button className="unit-button"
                    style={isButtonActive('kilos')}
                    onClick={() => {
                        setMassUnit(kilos)
                        resetAll()
                    }}>Kg</button>
                <button className="unit-button"
                    style={isButtonActive('pounds')}
                    onClick={() => {
                        setMassUnit(pounds)
                        resetAll()
                    }}>Lbs</button>
            </>
        )
    }


    const handleCalcWeights = async (desiredWeight, barWeight, weightsAvail, unit) => {
        try {
            const weightsToRack = await calcWeights(desiredWeight, barWeight, weightsAvail, unit)
            console.log(weightsToRack)
            weightsToRack && resetAll()
            setData(weightsToRack.result)

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
        <>
            <div className="unit-button-cont">
                <p>Mass unit</p>
                <MassUnitButton />
            </div>
            <form className="form" onSubmit={event => {
                event.preventDefault()
                setToogle(true)
                const { target: { targetWeight: { value: targetWeight }, barWeight: { value: barWeight }, weight } } = event
                const availPlates = getAvailPlates(weight)
                console.log(availPlates)
                handleCalcWeights(parseInt(targetWeight), parseInt(barWeight), availPlates, unit)
            }
            }>
                <BarWeightInput bWeight={barWeight} />
                <div className="reveals-main">

                    {!data && <>
                        <h3>Available Plates</h3>
                        <div className="w-select-cont">
                            {massUnit.map((weight, index) => {
                                return <>
                                    <div className="w-select-cont__group" key={`w-${index}`}>
                                        <label className="w-select-cont__group--label" htmlFor={`weight${weight}`}>{weight}</label>
                                        <select className="w-select-cont__group--select" name="weight">
                                            {inputWeightAmount(20)}
                                        </select>
                                    </div>
                                </>
                            })}
                        </div>
                        {error && <div className="error-cont">
                            <p className="error-cont__message">{error}</p>
                        </div>
                        }

                        <div className="bttn-cont">
                            <button className="bttn-cont__calc-bttn">Calculate</button>
                        </div>
                    </>
                    }

                    {data && <>
                        <Result plates={data} toogle={toogle} />
                        <div className="bttn-cont">
                            <button className="bttn-cont__calc-bttn" onClick={() => {
                                resetAll()
                                setToogle(false)
                            }}>New Calculation</button>
                        </div>
                    </>
                    }


                </div>
            </form>

        </>

    )


}
import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import getAvailPlates from '../logic/getAvailPlates'
import calcWeights from '../logic/calcWeights'
import BarWeightInput from './BarWeightInput'
import Result from './Result'
import './OptionFields.sass'

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]
const barKilos = [15, 20]
const barPounds = [33, 44]

export default function () {
    const [massUnit, setMassUnit] = useState(kilos)
    const [data, setData] = useState({})
    const [error, setError] = useState()
    const [toogle, setToogle] = useState(true)

    let unit = massUnit[0] === 25 ? 'kilos' : 'pounds'
    let barWeight = unit === 'kilos' ? barKilos : barPounds

    const transitions = useTransition(toogle, null, {
        from: { overflow: 'hidden', height: 0, opacity: 0 },
        enter: { height: 450, opacity: 1 },
        leave: { height: 0, opacity: 0 },
    })


    function resetAll(togl) {
        setData(null)
        setError(null)
        setToogle(togl || !toogle)
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
                        resetAll(true)
                    }}>Kg</button>
                <button className="unit-button"
                    style={isButtonActive('pounds')}
                    onClick={() => {
                        setMassUnit(pounds)
                        resetAll(true)
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
                const { target: { targetWeight: { value: targetWeight }, barWeight: { value: barWeight }, weight } } = event
                const availPlates = getAvailPlates(weight)
                console.log(availPlates)
                handleCalcWeights(parseInt(targetWeight), parseInt(barWeight), availPlates, unit)
            }
            }>
                <BarWeightInput bWeight={barWeight} />
                {error && <div className="error-cont">
                    <p className="error-cont__message"><span role="img" aria-label="exclamation">❗</span>{error}</p>
                </div>}
                <div className="reveals-main">
                    {transitions.map(({ item, key, props }) =>
                        item
                            ?
                            <animated.div key={key} style={props}>
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

                                <div className="bttn-cont">
                                    <button className="bttn-cont__calc-bttn">Calculate</button>
                                </div>
                            </animated.div>

                            : <animated.div key={key} style={props}>
                                {data && <>
                                    <Result plates={data} />
                                    <div className="bttn-cont">
                                        <button className="bttn-cont__calc-bttn" onClick={() => resetAll(true)}>New Calculation</button>
                                    </div>
                                </>}
                            </animated.div>
                    )}
                </div>
            </form>

        </>

    )


}
import React from 'react'

export default function () {

    const weights = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]
    const createAvailablePlatesDOMNodes = (weightArr) => {

    }

    return (
        <div className="container">
            <form>
                <div class="container__options">
                    <div class="label-input__options">
                        <label for="targetWeight">Target Weight</label>
                        <input type="number" name="targetWeight" id="targetWeight" />
                    </div>
                    <div class="label-input__options">
                        <label for="barWeight">Bar Weight</label>
                        <select name="barWeight" id="barWeight">
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <h3>Available Plates</h3>
                <div class="container__weights-available">
                    {weights.map((weight, index) => {
                        return <>
                            <div class="label-input" key={`w-${index}`}>
                                <label class="weight-label" for={`${weight}`}>{weight}</label>
                                <input type="number" name={`${weight}`} id={`${weight}`} min="0" max="12"></input>
                            </div>
                        </>
                    })}
                </div>
            </form>
        </div>
    )
}
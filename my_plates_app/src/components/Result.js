import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import getPlatesColor from '../logic/colorPlates'
import getValues from '../logic/getValue'
import './Result.sass'

export default function ({ plates }) {
    const [chartData, setChartData] = useState({})



    const chart = () => {
        setChartData({
            labels: getValues(plates, 0),
            datasets: [
                {
                    label: 'Weights to Rack',
                    data: getValues(plates, 1),
                    backgroundColor: [
                        'rgba(239, 35, 60, 1)',
                        'rgba(56, 97, 201, 1)',
                        'rgba(252, 210, 81, 1)',
                        'rgba(55, 198, 62, 1)'
                    ]
                }
            ],
        })

    }

    useEffect(() => {
        chart()
    }, [])

    return (
        <div className="result-cont">
            <Doughnut data={chartData} options={{
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI
            }} />
        </div>
    )
}

/*{plates.map((value, i) => {
                    return (
                        <li key={`plates-li-${i}`}>
                            <p className="result-cont__ul--txt"
                                style={{
                                    borderLeft: `10px solid ${getPlatesColor(value[0])}`
                                }}>{value[0]} X {value[1]}</p>
                        </li>
                    )
                })} */
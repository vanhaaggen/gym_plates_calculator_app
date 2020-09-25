import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import getColorPlates from '../logic/colorPlates'
import getValues from '../logic/getValue'
import "chartjs-plugin-datalabels"
import './Result.sass'

export default function ({ plates }) {
    const [chartData, setChartData] = useState({})
    const [chartPlugins, setChartPlugins] = useState({})

    useEffect(() => {
        const chart = () => {
            setChartData({
                labels: getValues(plates, 0),
                datasets: [
                    {
                        label: 'Weights to Rack',
                        data: getValues(plates, 1),
                        backgroundColor: getColorPlates(getValues(plates, 0))
                    }
                ],
            })

        }
        chart()
    }, [])

    useEffect(() => {
        const plugins = () => {
            setChartPlugins({
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                tooltips: {
                    enabled: false
                },
                plugins: {
                    datalabels: {
                        color: '#111',
                        textAlign: 'center',
                        font: {
                            lineHeight: 1.6
                        },
                        formatter: (value, ctx) => {
                            return `${ctx.chart.data.labels[ctx.dataIndex]} X ${value}`
                        }
                    }
                }

            })

        }
        plugins()
    }, [])

    return (
        <div className="result-cont">
            <Doughnut data={chartData} options={chartPlugins} />
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
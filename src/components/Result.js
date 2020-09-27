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
                title: {
                    display: true,
                    text: 'Weights to Rack',
                    fontSize: 20,
                    fontColor: '#545353'
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                plugins: {
                    datalabels: {
                        textStrokeColor: '#ffffff',
                        textAlign: 'center',
                        padding: 0,
                        borderRadius: 3,
                        font: {
                            lineHeight: 1.6,
                            weight: 'bold',
                            size: 16
                        },
                        color: (ctx) => {
                            const index = ctx.dataIndex
                            if (index === 2 || index === 7 || index === 4 || index === 9) {
                                return '#545353'
                            } else {
                                return '#ffffff'
                            }
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
            <Doughnut
                data={chartData}
                options={chartPlugins} />
        </div>
    )
}

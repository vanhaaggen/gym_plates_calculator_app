import React, { useState } from 'react'
import { useTrail, animated } from 'react-spring'
import ResultLabel from './ResultLabel'
import weightColor from '../helpers/colorPlates'
import getWeightValue from '../helpers/getValue'
import '../styles/Result.sass'

const config = {
  mass: 5,
  tension: 2000,
  friction: 200
}

export default function ({ plates, toogle, unit }) {
  const [color] = useState(weightColor(getWeightValue(plates, 0)))

  const trail = useTrail(plates.length, {
    config,
    opacity: toogle ? 1 : 0,
    x: toogle ? 0 : 20,
    height: toogle ? 80 : 0,
    from: {
      opacity: 0,
      x: 20,
      height: 0,
    }
  })
  console.log(color)
  return (
    <div className="result-cont">

      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={plates[index]}
          className="result-text"
          style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
          <animated.div style={{ height }}>
            <ResultLabel
              weight={plates[index][0]}
              amount={plates[index][1]}
              unit={unit}
              color={color[index]} />
          </animated.div>
        </animated.div>

      ))}

    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useTrail, animated } from 'react-spring'
import getColorPlates from '../helpers/colorPlates'
import getValues from '../helpers/getValue'
import '../styles/Result.sass'

const config = {
  mass: 5,
  tension: 2000,
  friction: 200
}

export default function ({ plates, toogle }) {
  const [color, setColor] = useState()

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



  return (
    <div className="result-cont">

      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={plates[index]}
          className="result-text"
          style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
          <animated.div style={{ height }}><p>{`${plates[index][0]} X ${plates[index][1]}`}</p></animated.div>
        </animated.div>

      ))}

    </div>
  )
}

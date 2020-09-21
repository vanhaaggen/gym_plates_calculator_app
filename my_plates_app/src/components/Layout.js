import React from 'react'
import './Layout.sass'

export default function ({ children }) {
    return (
        <>
            <h1>Barbell Racking Calculator</h1>
            {children}
            <p>Made with ❤ by Chris-Haag-Dev</p>
        </>
    )
}
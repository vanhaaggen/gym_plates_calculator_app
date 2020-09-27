import React from 'react'
import './Layout.sass'

export default function ({ children }) {

    const titlePlates = ['#ef233c', '#0077ee', '#ffd500', '#80b918', '#f3eff5']

    return (
        <>  <div className="signature-cont">
            <p className="signature-cont__text">Made with <span role="img" aria-label="heart">❤</span> by <a href="https://github.com/vanhaaggen" target="_blank" rel="noopener noreferrer">Christian Haag</a></p>
        </div>
            <div className="main-container">
                <div className="title-cont">
                    <div className="title-cont__plates">
                        {titlePlates.map((el, i) => {
                            return <div className={`title-cont__plates--piece`}
                                key={i}
                                style={{ background: `${el}` }}>
                            </div>
                        })}
                    </div>
                    <h1 className="title-cont__h1-title">
                        <span className="title-cont__h1-title--first">Barbell Racking</span>
                        <span className="title-cont__h1-title--second">Calculator</span>
                    </h1>
                </div>

                {children}

            </div>
        </>
    )
}
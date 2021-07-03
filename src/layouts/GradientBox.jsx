import React from 'react'

function GradientBox({children}) {
    return (
        <div className="gradientbox" style={{
            height:350,
            color:"white"
        }}>
            {children}
        </div>
    )
}

export default GradientBox

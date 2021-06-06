import React from 'react'

import "./Box.css"

function ShadowBox({children,width,height}) {
    return (
        <div>
            <div className="nav-shadow bg-white customrounded" style={{width:width??width,height:height??height}}>
                {children}
            </div>
        </div>
    )
}

export default ShadowBox

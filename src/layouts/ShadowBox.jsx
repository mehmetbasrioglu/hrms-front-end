import React from 'react'

import "./Box.css"

function ShadowBox({children,width,height,margined,zoomed}) {
    return (
        <div>
            <div 
            className={"nav-shadow bg-white customrounded"}
            
            style={{width:width??width,height:height??height,
            marginTop:margined?margined:0
            }}>
                {children}
            </div>
        </div>
    )
}

export default ShadowBox

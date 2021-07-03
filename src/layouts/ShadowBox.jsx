import React from 'react'

import "./Box.css"

function ShadowBox({children,width,height,margined,zoomed,className,unanimated}) {
    return (
        <div>
            <div 
            className={`nav-shadow bg-white ${unanimated?"customroundedwithoutanim":"customrounded"} ${className ? className: ""}`}
            
            style={{width:width??width,height:height??height,
            marginTop:margined?margined:0,
            }}>
                {children}
            </div>
        </div>
    )
}

export default ShadowBox

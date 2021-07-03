import React from 'react'

import "./Box.css"

function ShadowBoxWithHeader({children,button,buttonState=false,secondary,onClick,marginBottom,headerText,padding,width,height,margined,zoomed,className,unanimated}) {
    return (
        <div >
            <div 
            className={`nav-shadow bg-white ${unanimated?"customroundedwithoutanim":"customrounded"} ${className ? className: ""}`}
            
            style={{width:width??width,height:height??height,
            marginTop:margined?margined:0,
            marginBottom:marginBottom?marginBottom:0
            }}>
        <div className="shadowboxHeader">
            <span>{headerText}</span>
            {button&& buttonState && <button className={`${secondary ? "secondary":"primary"}`} onClick={onClick}>{button}</button>}
        </div>
        <div style={{
            
            padding:padding
        }}>
    {children}
        </div>
            
            </div>
        </div>
    )
}

export default ShadowBoxWithHeader

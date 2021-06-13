import React from 'react'

function MiniRoundedBox({children,className,width , height,margined}) {
    return (
        <div className={`nav-shadow customroundedwithoutanim ${className?className:""}`}
        
        style={{width:width??width,height:height??height,marginTop:margined ? margined:0,marginBottom:margined ? margined:0}}
        >
            {children}
        </div>
    )
}

export default MiniRoundedBox

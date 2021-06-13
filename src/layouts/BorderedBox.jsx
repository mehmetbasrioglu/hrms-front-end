import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

function BorderedBox({header,children}) {
    return (
        <div className="customroundedwithoutanim "
        style={{
            border:"1px solid var(--turuncu)",
            color:"var(--navlink)"
        }}
        >
            <div
            style={{
                background:"var(--turuncu)",
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
                height:40,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                color:"white",
                fontSize:18
            
            
            }}>
                <span><FaInfoCircle size={25}/> {header} </span>
            </div>
            {children}
        </div>
    )
}

export default BorderedBox

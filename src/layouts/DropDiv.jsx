import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import $ from "jquery"

import "./Drops.css"

function DropDiv({children,header,subtext}) {
    const [toggle,setToggleState] = React.useState(false)
    const [loading,setLoading] = React.useState(false)

    const toggleHnadler = () => {
        if(toggle){
            setToggleState(false)
        }
        else{
            setToggleState(true)
            setLoading(true)
        }
    }

    return (
        <div className="dropdiv">
            <div  onClick={toggleHnadler}  className="d-flex justify-content-between" style={{paddingBottom:20}}>
                <div className="d-flex flex-column">
                    <strong>{header}</strong>
                    <small>{subtext}</small>
                    </div>
                <div >{toggle ? <MdKeyboardArrowUp size={30}/> : <MdKeyboardArrowDown size={30}/>}</div>
            </div>
            {loading && <div
            className={`${toggle ? "slideDown":"slideUp"}`}
            style={{
                borderTop:"1px solid var(--navlinkborder)",
                height:!toggle && "0px",overflow:"hidden"}}>
                {children}
            </div>}
        </div>
    )
}

export default DropDiv

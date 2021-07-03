import React from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'

function CvNavItem({add,icon,text}) {
    return (
        <div className="d-flex navlinkcolor align-items-center mtop-10"
        style={{cursor:"pointer"}}
        >
            {add&&<span><FaPlus style={{marginRight:10}}/>{text}</span>}
            {!add&& icon &&<span><span style={{marginRight:10}}>{icon}</span>{text}</span>}
        </div>
    )
}

export default CvNavItem

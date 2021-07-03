import React from 'react'
import { FaTrash } from 'react-icons/fa'

function TalentItem({title}) {
    return (
            <div className="roundedbox talent relative" style={{margin:10}}>
                <span >{title}</span>
                <FaTrash className="delete"/>
            </div>
    )
}

export default TalentItem

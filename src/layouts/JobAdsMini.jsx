import { Avatar } from '@material-ui/core'
import React from 'react'

function JobAdsMini({title="undefined",city="undefined",companyName="undefined",img}) {
    return (
        <div className="miniJobAds">
            <div className="d-flex flex-column">
                <div className="d-flex flex-column" style={{borderBottom:"1px solid var(--navlinkborder)",paddingBottom:20}}>
                <span >
          <strong>{title}</strong>
        </span>
                <span>{city}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center" style={{marginTop:10}}>
                    <span>{companyName}</span>
                    <Avatar src={img} className="miniAvatar"/>
                </div>
            </div>
        </div>
    )
}

export default JobAdsMini

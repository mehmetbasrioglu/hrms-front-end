import React from 'react'
import { FaEdit, FaUserGraduate, FaUserTie } from 'react-icons/fa'

function JobExpItem({workplaceName,onEditClick,department,entryDate,exitDate}) {
    return (
        <div className="d-flex align-items-center" style={{marginTop:20}}>
            <div>
                <FaUserTie size={60} style={{color:"var(--navlink)"}}/>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column" style={{width:300,marginLeft:60}}>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">İşyeri Adı</span>
                    <span>{workplaceName}</span>
                </div>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Departman</span>
                    <span>{department}</span>
                </div>
                </div>
                <div className="d-flex flex-column" style={{marginLeft:60}}>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Başlangıç Tarihi</span>
                    <span>{entryDate}</span>
                </div>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">İş Durumu</span>
                    <span>Devam Ediyor</span>
                </div>
                </div>
                <div className="d-flex flex-column" style={{marginLeft:60}}>
                    <button style={{border:"none",background:"none"} } onClick={onEditClick}><FaEdit size={25} style={{color:"var(--navlink)",cursor:"pointer"}}  /></button>
                </div>
                
            </div>
        </div>
    )
}

export default JobExpItem

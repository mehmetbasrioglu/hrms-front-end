import React from 'react'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import MiniRoundedBox from './MiniRoundedBox'

import FavouriteService from "../services/favouriteService"

function FavItem({data,jobId, onClick}) {
    const job = data.find(j => j.jobAdvertisement.id === jobId)
    return (
      <div className="d-flex"style={{width:"fit-content"}} onClick={
        (e) => {
            !job ? onClick({
                "candidateId": 4,
                "jobAdvertisementId": jobId
              }):onClick({
                "candidateId": 4,
                "jobAdvertisementId": jobId
              },true)
        }

    }>
      <span style={{
        width:"max-content",
        marginRight:10,
        transition:"0.5s",
        }}>{job ? "İlan kaydedildi":"İlan kaydet"}</span>
  
     {job && <FaHeart size={20} /> }
     {!job && <FaRegHeart size={20} /> }
    </div>
    )
}

export default FavItem

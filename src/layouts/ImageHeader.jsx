import React from 'react'

import {BiImageAdd} from "react-icons/bi"

function ImageHeader({children,img,isFP,onHeaderPhotoUploadHandler}) {
    return (
       <div
       className="bg-white d-flex flex-column"
       >
            <div className="gradientbox relative header" style={{
            height:350,
            color:"white"
        }}>
            {img && <img src={img}
            style={{
                width:"100%",
                height:"100%"
            }}
            
            />}
            
            {isFP && <div className="uploadimage">
                <span><BiImageAdd/> Resim Yükle</span>
                
                <input
                
             onChange={onHeaderPhotoUploadHandler}
                        class="file-upload"
                        type="file"
                        accept="image/*"
                      />
            </div>}
        </div>
        {children}
        </div>
    )
}

export default ImageHeader

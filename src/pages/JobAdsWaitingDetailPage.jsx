import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import JobAdvertisementService from '../services/jobAdvertisementService';

import nodata from "../assets/images/nodata.svg"

import TextTransition, { presets } from "react-text-transition";
import ShadowBox from '../layouts/ShadowBox';
import BorderedBox from '../layouts/BorderedBox';
import { FaUserTie } from 'react-icons/fa';

import MiniRoundedBox from "../layouts/MiniRoundedBox";

import {FaClipboardCheck, FaEye, FaTrash} from "react-icons/fa"

import {MdKeyboardArrowLeft} from "react-icons/md"

import ConvertToDotNumber from "../helpers/ConvertToDotNumber"

function JobAdsWaitingDetailPage() {
    const {id} = useParams();
    const [jobAds, setjobAds] = React.useState([]);

    const history = useHistory();

    const TEXTS = [
        "Üzgünüz İlan Bulunamadı",
        "Üzgünüz İlan Bulunamadı ",
      ];

    React.useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        
    
          jobAdvertisementService.getOneById(id).then((data) => {
            setjobAds(data.data.data);
            console.log(data.data.data)
          });
        
    
      },[]);

      const confirm = () => {
        
        let jobAdvertisementService = new JobAdvertisementService();
          jobAdvertisementService.confirmJobAdById(id).then((data)=>console.log(data))
      }

      
  const [indexOfTexts, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);


    return (
        <div style={{paddingTop:100,paddingLeft:100,paddingRight:100,paddingBottom:40}}>
            <div className="row">
            {
            jobAds.length > 0 ? (
                <div className="col-1">
                <div className="d-flex flex-column">
                <MiniRoundedBox
                className="d-flex justify-content-center align-items-center bg-white transformed2 pointer"
                width={45}
                height={45}
                >
                    <span className="icon3d" onClick={(e) => history.push("/admin/is-ilanlari")}>
                  <MdKeyboardArrowLeft />
                  </span>
                </MiniRoundedBox>
                </div>
                </div>):""}
               <div className="col">
               {
            jobAds.length > 0 ? (
              jobAds.map(data=>(
                  <ShadowBox unanimated>
                    <div className="d-flex flex-column vh-100" style={{padding:30}}>
                        <div className=" d-flex justify-content-center align-items-center">
                            <h1>{data.employer.companyName}</h1>
                        </div>
                        <div className=" d-flex justify-content-center align-items-center " style={{margin:10}}>
                        <div className="banner">
                        <img 
                        src="https://assets.new.siemens.com/siemens/assets/api/uuid:51e9b5ab-2621-47d0-8f00-ba076a460cb0/width:2000/quality:high/key-visual-smartoffice-1920x1080px.jpg"
                        className="customroundedwithoutanim"
                        />
                        </div>
                        </div>

                        <div className="flexone">
                        <p style={{margin:10}}>
                            {data.description}
                        </p>
                        </div>

                        <div className="">
                        <BorderedBox
                        header={"İş İlani Detayları"}
                        >
                            <div className="d-flex justify-content-between align-items-center" style={{paddingLeft:30,paddingRight:30,paddingTop:30}}>
                                <span style={{fontWeight:"bold"}}>Pozisyon: {data.jobtitle.title}</span>
                                <span style={{fontWeight:"bold"}}>Çalışma Tipi: {data.workType.workType}</span>

                            </div>
                            <div className="d-flex justify-content-between align-items-center" style={{paddingLeft:30,paddingRight:30,paddingTop:20}}>
                                <span style={{fontWeight:"bold",width:300}}>Kontenjan: <span className="kontenjan"><FaUserTie/> {data.quota}</span></span>
                                <span style={{fontWeight:"bold"}}>Çalışma Zamanı: {data.workHour.workHours}</span>

                            </div>
                            <div className="d-flex justify-content-between align-items-center" style={{paddingLeft:30,paddingRight:30,paddingTop:20,paddingBottom:30}}>
                                <span style={{fontWeight:"bold"}}>Maaş Aralığı: {ConvertToDotNumber(data.minSalary)} - {ConvertToDotNumber(data.maxSalary)} TL</span>
                                <span style={{fontWeight:"bold"}}>Şehir: {data.city.cityName}</span>

                            </div>
                        </BorderedBox>
                        </div>



                    </div>
                  </ShadowBox>
              ))):(
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <h3 className="d-flex justify-content-center align-items-center" style={{color:"var(--navlink)"}}>
                <TextTransition
        text={ TEXTS[indexOfTexts % TEXTS.length] }
        springConfig={ presets.wobbly }
      />

                </h3>
                <img src={nodata} height={250} style={{paddingTop:20}} />
                </div>
              )
                  
                }
               </div>
               {
            jobAds.length > 0 ? (
               <div className="col-1">
               <div className="d-flex flex-column" style={{marginLeft:40}}>
                <MiniRoundedBox
                className="d-flex justify-content-center align-items-center bg-color1 transformed pointer"
                width={45}
                height={45}
                >
                    <span className="icon3d" onClick={confirm}>
                  <FaClipboardCheck />
                  </span>
                </MiniRoundedBox>
                <MiniRoundedBox
                className="d-flex justify-content-center align-items-center bg-color2 transformed2 pointer"
                width={45}
                height={45}
                margined={10}
                >
                   <span className="icon3d">
                  <FaTrash />
                  </span>
                </MiniRoundedBox>
                </div>
                </div>
            ):""}
            </div>
        </div>
    )
}

export default JobAdsWaitingDetailPage

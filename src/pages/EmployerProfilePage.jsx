import { Avatar } from "@material-ui/core";
import React from "react";
import { FaEllipsisV, FaGithub, FaLinkedin, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ImageHeader from "../layouts/ImageHeader";
import InformationBox from "../layouts/InformationBox";
import JobAdsBox from "../layouts/JobAdsBox";
import ShadowBoxWithHeader from "../layouts/ShadowBoxWithHeader";
import EmployerService from "../services/employerService";
import EmployerUpdateService from "../services/employerUpdateService";

import JobAdvertisementService from "../services/jobAdvertisementService";

function EmployerProfilePage() {
  const id = 6; // Gittigidiyor id auth maalesef daha gösterilmedi
  const [employerData, setEmployerData] = React.useState({});
  const [updateStatus,setUpdateStatus] = React.useState(false);
  let employerService = new EmployerService();
  
  let employerUpdateService = new EmployerUpdateService();
  React.useEffect(() => {
    employerService.findById(id).then((data) => {
      setEmployerData(data.data.data);
      //console.log(employerData);
    });
    employerUpdateService.findById(id).then((res)=>{
        if(res.data.data != null){
            setUpdateStatus(true)
        }
        else{
            setUpdateStatus(false)
        }
    })
  }, [employerData]);

  const imageChangeHandler = ({ target: { files } }) => {
    let data = new FormData();
    data.append("employerId",id)
    data.append("multipartFile",files[0])
     console.log(data)
     employerService.addProfilePhoto(data).then((res)=>console.log(res))
  };

  

  const onHeaderPhotoUploadHandler = ({ target: { files } }) => {
    let data = new FormData();
   data.append("employerId",id)
   data.append("multipartFile",files[0])
    console.log(data)
    employerService.addHeaderPhoto(data).then((res)=>console.log(res))
 };

  
  const [jobAds, setjobAds] = React.useState([]);
  let jobAdvertisementService = new JobAdvertisementService();

  jobAdvertisementService.getConfirmedJobsAndActiveted(id).then((data) => {
    setjobAds(data.data.data);
    //console.log(data.data.data)
    
  });


  return (
    <div>
      <div className="d-flex container">
        <div className="col">
          <ImageHeader
          isFP={true}
            img={
               employerData.headerImageUrl 
            }
            onHeaderPhotoUploadHandler={onHeaderPhotoUploadHandler}
          >
            <div className="d-flex flex-column" style={{ padding: 10 }}>
              <div className="borderbottom" style={{ paddingBottom: 20 }}>
                <div className="d-flex align-items-end">
                  <div
                    className="relative hoveredAvatar"
                    style={{ width: "max-content", marginTop: -90 }}
                  >
                    <Avatar
                      className="boxedAvatar"
                      src={employerData.avatarUrl}
                    />
                    <div className="plus">
                      <FaPlusCircle />
                      <span>Resim Yükle</span>
                      <input
                        onChange={imageChangeHandler}
                        class="file-upload"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                  <h4 style={{marginLeft:20}}>{employerData.companyName}</h4>
                  {updateStatus &&  <span style={{marginLeft:20,color:"var(--turuncu)"}}>(Güncelleme Onay Bekliyor)</span>}
                  </div>
                  <div>
                      <button className="borderedbutton">Ayarlar</button>
                      <span style={{color:"#bba3a5"}}><FaEllipsisV/></span>
                      </div>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span className="" style={{ width: 155}}>
                      Website
                    </span>
                    <span className="navlinkcolor" style={{ }}>
                      {employerData.webAdress}
                    </span>
                  </div>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span className="" >Telefon Numarası</span>
                    <span className="navlinkcolor" style={{ marginLeft: 30 }}>
                      {employerData.phoneNumber}
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: 120 }}>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span className="" style={{ width: 155 }}>
                      Kuruluş Yılı
                    </span>
                    <span className="navlinkcolor" style={{ marginLeft: 30 }}>
                      {employerData.foundYear &&
                        employerData.foundYear.split(/[-]/)[0]}
                    </span>
                  </div>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span  style={{ width: 155 }}>
                      Sektör
                    </span>
                    <span className="navlinkcolor" style={{ marginLeft: 30 }}>
                      {employerData.industry}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ImageHeader>
          <nav class="navbar navbar-expand-md navbar-dark bg-transparent shadowbar">
            <div class="container-fluid">
              <div class="mx-auto order-0">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item active">
                    <a class="nav-link ">Hakkında</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">İş ilanı</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="d-flex" style={{paddingBottom:50}}>
            <div className="col">
              <InformationBox company={employerData.companyName}>
                <p className="breakWord">
                  1847 yılında Werner von Siemens tarafından Almanya’da
                  temelleri atılan Siemens, Türkiye’de 162 yıldır faaliyet
                  göstermektedir. Siemens Türkiye, teknolojiye olan tutkusu ve
                  köklü birikimiyle; enerji, altyapı, elektrifikasyon,
                  otomasyon, dijitalizasyon ve sağlık sektörlerine öncülük eden
                  çalışmalara imza atmaktadır. 3 binden fazla çalışanı bulunan
                  Siemens Türkiye, dolaylı olarak ise 40 bin kişiye istihdam
                  sağlamaktadır. Siemens Türkiye’de kadın çalışan oranı
                  %24,5'dir. Siemens Türkiye, ülke ekonomisine, doğrudan,
                  dolaylı ve teşvik edilen olmak üzere yılda 3,2 milyar TL
                  tutarında katkı sağlamaktadır. (PriceWaterhouse Coopers 2016
                  Raporu) Merkezi İstanbul Kartal’da bulunan Siemens Türkiye,
                  Ankara, İzmir, Adana ve Bursa’daki ofisleri, Gebze’deki
                  Entegre Üretim Tesisleri ve Ankara ODTÜ’de yer alan Teknokent
                  ofisleri ile hizmet vermektedir.
                </p>
              </InformationBox>
              <JobAdsBox
              data={jobAds.map((res)=> {return res})}
              company={employerData.companyName}>
                  
              </JobAdsBox>
            </div>
            <div className="col-4" style={{ padding: 30 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerProfilePage;

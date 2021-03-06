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

function ThirdPersonEmployerPage() {
  const { id } = useParams();
  const [employerData, setEmployerData] = React.useState({});
  let employerService = new EmployerService();
  
  let employerUpdateService = new EmployerUpdateService();
  React.useEffect(() => {
    employerService.findById(id).then((data) => {
      setEmployerData(data.data.data);
      //console.log(employerData);
    });
  }, [employerData]);
  
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
            isFP={false}
            img={
              employerData.headerImageUrl 
           }
          >
            <div className="d-flex flex-column" style={{ padding: 10 }}>
              <div className="borderbottom" style={{ paddingBottom: 20 }}>
                <div className="d-flex align-items-end">
                  <div
                    className="relative "
                    style={{ width: "max-content", marginTop: -90 }}
                  >
                    <Avatar
                      className="boxedAvatar"
                      src={employerData.avatarUrl}
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                  <h4 style={{marginLeft:20}}>{employerData.companyName}</h4>
                  </div>
                  <div>
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
                    <span className="" >Telefon Numaras??</span>
                    <span className="navlinkcolor" style={{ marginLeft: 30 }}>
                      {employerData.phoneNumber}
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: 120 }}>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span className="" style={{ width: 155 }}>
                      Kurulu?? Y??l??
                    </span>
                    <span className="navlinkcolor" style={{ marginLeft: 30 }}>
                      {employerData.foundYear &&
                        employerData.foundYear.split(/[-]/)[0]}
                    </span>
                  </div>
                  <div className="d-flex " style={{ padding: 10 }}>
                    <span  style={{ width: 155 }}>
                      Sekt??r
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
                    <a class="nav-link ">Hakk??nda</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">???? ilan??</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="d-flex" style={{paddingBottom:50}}>
            <div className="col">
              <InformationBox company={employerData.companyName}>
                <p className="breakWord">
                  1847 y??l??nda Werner von Siemens taraf??ndan Almanya???da
                  temelleri at??lan Siemens, T??rkiye???de 162 y??ld??r faaliyet
                  g??stermektedir. Siemens T??rkiye, teknolojiye olan tutkusu ve
                  k??kl?? birikimiyle; enerji, altyap??, elektrifikasyon,
                  otomasyon, dijitalizasyon ve sa??l??k sekt??rlerine ??nc??l??k eden
                  ??al????malara imza atmaktad??r. 3 binden fazla ??al????an?? bulunan
                  Siemens T??rkiye, dolayl?? olarak ise 40 bin ki??iye istihdam
                  sa??lamaktad??r. Siemens T??rkiye???de kad??n ??al????an oran??
                  %24,5'dir. Siemens T??rkiye, ??lke ekonomisine, do??rudan,
                  dolayl?? ve te??vik edilen olmak ??zere y??lda 3,2 milyar TL
                  tutar??nda katk?? sa??lamaktad??r. (PriceWaterhouse Coopers 2016
                  Raporu) Merkezi ??stanbul Kartal???da bulunan Siemens T??rkiye,
                  Ankara, ??zmir, Adana ve Bursa???daki ofisleri, Gebze???deki
                  Entegre ??retim Tesisleri ve Ankara ODT?????de yer alan Teknokent
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

export default ThirdPersonEmployerPage;

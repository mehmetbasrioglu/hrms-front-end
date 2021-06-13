import React from "react";

import ShadowBox from "../layouts/ShadowBox";

import "./Pages.css";
import CityService from "../services/cityService";
import JobTitleService from "../services/jobTitleService";
import JobAdvertisementService from "../services/jobAdvertisementService"
import RoundedBox from "../layouts/RoundedBox";


import nodata from "../assets/images/nodata.svg"

import TextTransition, { presets } from "react-text-transition";

import moment from "moment";
import 'moment/locale/tr' 




function JobAdvertisementPage() {
  

moment.locale('tr')

const TEXTS = [
  "Üzgünüz Henüz Hiç İş İlani Yayınlanmamış",
  "Üzgünüz Henüz Hiç İş İlani Yayınlanmamış ",
];

  const [cities, setCities] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [jobAds, setjobAds] = React.useState([]);

  React.useEffect(() => {
    let cityService = new CityService();
    let titleService = new JobTitleService()
    let jobAdvertisementService = new JobAdvertisementService();
    cityService.getAll().then((data) => {
      setCities(data.data.data);
    });
    titleService.getAll().then((data) => {
        setTitles(data.data.data);
      });

      jobAdvertisementService.getConfirmedJobAds().then((data) => {
        setjobAds(data.data.data);
        console.log(data.data.data)
      });
    

  },[]);

  const [indexOfTexts, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

    
  return (
    <div style={{paddingTop:100}}>
      <div className="row  margintop">
        <div className="col-2">
          <ShadowBox margined={60}>
            <div className="p-10 d-flex flex-column jobads-right">
              <span>Şehirler</span>
              <div className="custom-select">
                <select className="rounded">
                  {cities.map((data) => (
                    <option value="">{data.cityName}</option>
                  ))}
                </select>
                <span className="custom-arrow" />
              </div>
              <span>Tarih</span>
              <label class="custom-container-radio">
                Tümü
                <input type="radio" name="radio" />
                <span class="checkmark"></span>
              </label>
              <label class="custom-container-radio">
                Bugün
                <input type="radio" name="radio" />
                <span class="checkmark"></span>
              </label>
              <span>Sektör</span>
              <div className="custom-select">
                <select className="rounded">
                  {titles.map((data) => (
                    <option value="">{data.title}</option>
                  ))}
                </select>
                <span className="custom-arrow" />
              </div>
            </div>
          </ShadowBox>
        </div>
        <div className="col" style={{paddingBottom:50}}>
           <div className="jobads-right">
         
           <div className="custom-select bg-white-cs ">
             
           <span style={{marginRight:10}}>Sıralama</span>
             <div className="zoomed" >
                <select className="rounded miniselect ">
                    <option value="">Önerilen</option>
                    <option value="">Yeniden Eskiye</option>
                    <option value="">Eskiden Yeniye</option>
                </select>
                <span className="custom-arrow " style={{marginTop:-2}}/>
              </div>
             </div>
           </div>
          {
            jobAds.length > 0 ? (
              jobAds.map(data=>(
                <ShadowBox margined={20} zoomed>
                <div className="p-10">
                <div className="d-flex jobads-right align-items-center justify-content-between">
                <div className="d-flex jobads-right align-items-center">
                <span >{data.employer.companyName}</span>
                <span className="yeni">Yeni</span>
                </div>
                <div className="d-flex jobads-right align-items-center">
                <span >{data.city.cityName}</span>
                </div>
                </div>
                <div className="jobads-right align-items-center">
                <span className="font-light">{data.jobtitle.title}</span>
                </div>
                <div className="jobads-right align-items-center">
                <span className="font-light">{data.description}</span>
                </div>
                <div className="jobads-right mtop-10 d-flex justify-content-between align-items-center">
                <div className="d-flex">
                <RoundedBox title={data.workHour.workHours}/>
                <RoundedBox title={data.workType.workType}/>
                </div>
                <span>{moment(data.createdDate).locale("tr").fromNow()}</span>
                </div>
    
                </div>
              </ShadowBox>
              ))
            ):(
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
      </div>
    </div>
  );
}

export default JobAdvertisementPage;

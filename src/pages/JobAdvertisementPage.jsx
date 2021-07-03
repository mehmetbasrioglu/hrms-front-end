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
import Pagination from "../layouts/Pagination";

import {FaBookmark, FaRegBookmark, FaRegStar, FaStar} from "react-icons/fa"
import MiniRoundedBox from "../layouts/MiniRoundedBox";
import FavouriteService from "../services/favouriteService";
import FavItem from "../layouts/FavItem";
import WorkHourService from "../services/WorkHourService";
import { useHistory } from "react-router-dom";


function JobAdvertisementPage() {
  

moment.locale('tr')

const TEXTS = [
  "Üzgünüz Henüz Hiç İş İlani Yayınlanmamış",
  "Üzgünüz Henüz Hiç İş İlani Yayınlanmamış ",
];

   const history = useHistory();
  const [cities, setCities] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [workHours, setWorkHours] = React.useState([]);

  
  const [jobAds, setjobAds] = React.useState([]);
  const [currentPage,setCurrentPage] = React.useState(1)
  const [postsPerPage,setPostsPerPage] = React.useState(10)


  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobAds.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber);






  const [selectedCity, setSelectedCity] = React.useState(0)
  const [selectedTitle, setSelectedTitle] = React.useState(0)
  const [selectedWorkHour, setSelectedWorkHour] = React.useState(0)
  
  let jobAdvertisementService = new JobAdvertisementService();

  
  React.useEffect(() => {
    let cityService = new CityService();
    let titleService = new JobTitleService()
    let workHourService = new WorkHourService();
    cityService.getAll().then((data) => {
      setCities(data.data.data);
    });
    titleService.getAll().then((data) => {
        setTitles(data.data.data);
      });
      workHourService.getAll().then((data) => {
        setWorkHours(data.data.data);
      });


      // jobAdvertisementService.getConfirmedJobAds().then((data) => {
      //   setjobAds(data.data.data);
      //   console.log(data.data.data)
      // });

      jobAdvertisementService.getConfirmedJobAdsWithPageable(currentPage,postsPerPage).then((data) => {
        setjobAds(data.data.data);
        //console.log(data.data.data)
        
      });
      //getConfirmedJobAdsWithPageable
    

  },[]);

  const reset = () => {
    jobAdvertisementService.getConfirmedJobAdsWithPageable(currentPage,postsPerPage).then((data) => {
      setjobAds(data.data.data);
      setCurrentPage(1)
      setSelectedCity(0)
      setSelectedTitle(0)
      setSelectedWorkHour(0)
      //console.log(data.data.data)
      
    });
  }

  const [indexOfTexts, setIndex] = React.useState(0);



  
  
  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);


  const filtreHandler =  () => {
    let object = {
      "city": {
        "id": selectedCity
      },
      "jobtitle": {
        "id": selectedTitle
      },
      "workHour": {
        "id": selectedWorkHour
      }
    }
    /*
    
      "workHour": {
        "id": 0
      }
      */
     jobAdvertisementService.getFilter(object,1,postsPerPage).then((data) => {
      setjobAds(data.data.data);
      setCurrentPage(1)
      
    });
  }
  let favservice = new FavouriteService();

  const [favjobs, setFav] = React.useState([]);
  
  React.useEffect(()=> {
    favservice.findByCandidateId(4).then((res)=> {
      setFav(res.data.data)
      //console.log(res.data.data)
    })
    
  },[favjobs])
  
  const saveToDB = (object,bool) => {
    if(bool){
      favservice.delete(object.candidateId,object.jobAdvertisementId)
      return;
    }
    else{
      favservice.add(object)
    }
  }

    
  return (
    <div style={{paddingTop:100}}>
      <div className="row  margintop">
        <div className="col-2">
          <h3>{jobAds.length} İş İlani</h3>
          <ShadowBox margined={28}>
            <div className="p-10 d-flex flex-column jobads-right">
              <span>Şehirler</span>
              <div className="custom-select">
                <select className="rounded"
                value={selectedCity}
                onChange={(e)=> setSelectedCity(e.currentTarget.value)}
                >
                   <option value="0">Şehir seç</option>
                  {cities.map((data) => (
                    <option value={data.id}>{data.cityName}</option>
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
                <select
                 className="rounded"
                 value={selectedTitle}
                onChange={(e)=> setSelectedTitle(e.currentTarget.value)}
                
                >
                   <option value="">Pozisyon seç</option>
                  {titles.map((data) => (
                    <option value={data.id}>{data.title}</option>
                  ))}
                </select>
                <span className="custom-arrow" />
              </div>
              <span>Çalışma Türü</span>
              <div className="custom-select">
              <select
                 className="rounded"
                 value={selectedWorkHour}
                onChange={(e)=> setSelectedWorkHour(e.currentTarget.value)}
                
                >
                   <option value="">Çalışma Türü seç</option>
                  {workHours.map((data) => (
                    <option value={data.id}>{data.workHours}</option>
                  ))}
                </select>
                <span className="custom-arrow" />
              </div>
              <button className="btn-gradient" onClick={filtreHandler}>Güncelle</button>
              <button className="btn-ungradient" onClick={reset}>Reset</button>
            </div>
          </ShadowBox>
        </div>
        <div className="col" style={{paddingBottom:50}}>
           <div className="jobads-right">
         
           <div className="custom-select bg-white-cs ">
             
           <span style={{marginRight:10}}>Görüntülenen İlan Sayısı</span>
             <div className="zoomed" >
                <select
                onChange={(e)=> {
                  setPostsPerPage(e.target.value)
                  setCurrentPage(1)
                }}
                className="rounded miniselect ">
                    <option value="1">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span className="custom-arrow " style={{marginTop:-2}}/>
              </div>
             </div>
           </div>
          {
            jobAds.length > 0 ? (
              currentPosts.map(data=>(
                <div className="zoomed d-flex" style={{marginTop:20}}>
                <div className="w-100">
                <ShadowBox unanimated >
                <div className="p-10">
                <div className="d-flex">


                  <div className="avatarsection d-flex flex-column w-100">
                    <div className="d-flex">
                    <div className="borderedAvatar" style={{cursor:"pointer"}}  onClick={(e)=> history.push("/employer/profile/"+data.employer.id)}>
                    <img src={data.employer.avatarUrl} />
                    </div>
                    <div className="d-flex flex-column w-100">
                <div className="d-flex jobads-right align-items-center justify-content-between">
                <div className="d-flex jobads-right flex-column">
                <span style={{color:"black",marginTop:-10}}>{data.jobtitle.title}</span>
                <span style={{marginTop:-20}}>{data.employer.companyName}</span>
                <span style={{marginTop:-25,fontWeight:200}}>{data.city.cityName}</span>
                </div>
                </div>
                </div>
                
                <div className="flexmini" style={{marginLeft:20}}
                  onClick={(e) =>{
                    
                    console.log("test")
                  }}
                  >
                  <FavItem 
                  
                  onClick={saveToDB}
                  
                  data={favjobs} jobId={data.id}/>
                    
                  </div>
                </div>
                
                <div className="jobads-right mtop-10 d-flex justify-content-between align-items-center">
                <div className="d-flex">
                <RoundedBox title={data.workHour.workHours}/>
                <RoundedBox title={data.workType.workType}/>
                </div>
                <span>{moment(data.createdDate).locale("tr").fromNow()}</span>
                </div>
                  </div>

                  

               
                </div>
    
                </div>
              </ShadowBox> 
                  </div>
              </div>
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
          
          <Pagination
          paginate={paginate}
          currentPageNum={currentPage}
          postsPerPage={postsPerPage}  totalPost={jobAds.length}/>
        </div>
      </div>
    </div>
  );
}

export default JobAdvertisementPage;

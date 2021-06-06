import React from "react";

import ShadowBox from "../layouts/ShadowBox";

import "./Pages.css";
import CityService from "../services/cityService";
import JobTitleService from "../services/jobTitleService";
import RoundedBox from "../layouts/RoundedBox";

function JobAdvertisementPage() {
  const [cities, setCities] = React.useState([]);
  const [titles, setTitles] = React.useState([]);

  React.useEffect(() => {
    let cityService = new CityService();
    let titleService = new JobTitleService()
    cityService.getAll().then((data) => {
      setCities(data.data.data);
    });
    titleService.getAll().then((data) => {
        setTitles(data.data.data);
      });

  },[]);

  return (
    <div>
      <div className="row  margintop">
        <div className="col-2">
          <ShadowBox>
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
        <div className="col">
           <div className="jobads-right">
         
           <div className="custom-select bg-white-cs">
           <span style={{marginRight:10}}>Sıralama</span>
                <select className="rounded miniselect">
                    <option value="">Önerilen</option>
                    <option value="">Yeniden Eskiye</option>
                    <option value="">Eskiden Yeniye</option>
                </select>
                <span className="custom-arrow" />
              </div>
           </div>
          <ShadowBox height={130}>
            <div className="p-10">
            <div className="d-flex jobads-right align-items-center justify-content-between">
            <div className="d-flex jobads-right align-items-center">
            <span >SIEMENS</span>
            <span className="yeni">Yeni</span>
            </div>
            <div className="d-flex jobads-right align-items-center">
            <span >İstanbul</span>
            </div>
            </div>
            <div className="jobads-right align-items-center">
            <span className="font-light">Full Stack Developer</span>
            </div>
            <div className="jobads-right mtop-10 d-flex justify-content-between align-items-center">
            <RoundedBox title={"Tam Zamanlı"}/>
            <span>1 gün önce</span>
            </div>

            </div>
          </ShadowBox>
        </div>
      </div>
    </div>
  );
}

export default JobAdvertisementPage;

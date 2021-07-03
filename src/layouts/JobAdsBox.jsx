import React from "react";
import JobAdsMini from "./JobAdsMini";

function JobAdsBox({data,company}) {

  return (
    <div>
      <div className="miniBox d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 20 }}>
        <span >
          <strong>{company} İş İlanları</strong>
        </span>
        <span className="hrmslink">Tüm İş İlanları Gör({data.length})</span>
        </div>
        <div className="container customRow "style={{padding:10}}>
          {data.slice(0,4).map(data=>(
            <JobAdsMini
            title={data.jobtitle.title}
            city={data.city.cityName}
            img={data.employer.avatarUrl}
            companyName={data.employer.companyName}
            
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobAdsBox;

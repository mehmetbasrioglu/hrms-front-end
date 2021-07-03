import { Avatar } from "@material-ui/core";
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPlusCircle,
  FaTrophy,
  FaUserEdit,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { useParams } from "react-router-dom";
import CvNavItem from "../layouts/CvNavItem";
import GradientBox from "../layouts/GradientBox";
import JobExpItem from "../layouts/JobExpItem";
import LangItem from "../layouts/LangItem";
import SchoolItem from "../layouts/SchoolItem";
import ShadowBoxWithHeader from "../layouts/ShadowBoxWithHeader";
import TalentItem from "../layouts/TalentItem";
import CandidateCvService from "../services/candidateCvService";
import TalentService from "../services/talentService";
import CandidateTalentService from "../services/candidateTalentService"
import LanguageService from "../services/languageService"
import CandidateLanguagesService from "../services/candidateLanguagesService"
import JobTitleService from "../services/jobTitleService"
import CandidateSchoolService from "../services/candidateSchoolService"
import CandidateJobExperienceService from "../services/candidateJobExperienceService"

import * as Yup from "yup";
import { Formik } from "formik";
import moment from "moment";

function CandidateCVPage() {
  const { id } = useParams();

  const [cv, setCv] = React.useState({});
  const [schools, setSchools] = React.useState([]);
  const [languages, setLang] = React.useState([]);
  const [languageItems, setLangItems] = React.useState([]);
  const [talents, setTalents] = React.useState([]);
  const [talentItems, setTalentItems] = React.useState([]);
  const [jobExperience, setJobExperience] = React.useState([]);
  const [jobTitleItems, setJobTitleItems] = React.useState([]);
  const [coverLetter, setCoverLetter] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [newestSchool,setNewestSchoolState] = React.useState(false);
  const [newestJobExp,setNewestJobExpState] = React.useState(false);
  const [editableSchool,setEditableSchool] = React.useState(false);
  const [editableTalent,setEditableTalent] = React.useState(false);
  const [editableLang,setEditableLang] = React.useState(false);
  const [editableJobExp,setEditableJobExp] = React.useState(false);
  
  const [savedJobData, setSavedJobData] = React.useState({});
  const [savedSchoolData, setSavedSchoolData] = React.useState({});

  let candidateTalentService = new CandidateTalentService();
  let languageService = new LanguageService();
  let candidateLanguagesService = new CandidateLanguagesService();
  let jobTitleService = new JobTitleService();
  let candidateJobExperienceService = new CandidateJobExperienceService()
  let candidateSchoolService = new CandidateSchoolService();
  
  let cvService = new CandidateCvService();
  React.useEffect(() => {
    
    let talentService = new TalentService();
    
    cvService.findByCvId(id).then((data) => {
      setCv(data.data.data);
      setSchools(data.data.data.schools);
      setLang(data.data.data.languages);
      setTalents(data.data.data.talents);
      setJobExperience(data.data.data.jobExperience);
      setCoverLetter(data.data.data.coverLetter);
      //console.log(cv);
    });
    talentService.getAll().then((data)=>setTalentItems(data.data.data))
    languageService.getAll().then((data)=>setLangItems(data.data.data))
    jobTitleService.getAll().then((data)=>setJobTitleItems(data.data.data))

  }, [cv]);

  const imageChangeHandler = ({target: {files}}) => {
      
      let data = new FormData();
      data.append("candidateCvId",id)
      data.append("multipartFile",files[0])
    //  console.log(data)
      cvService.addCvPhoto(data).then((res)=>console.log(res))
  }
  const ratingHandler = (langId,level) => {
      candidateLanguagesService.update(id,langId,level)
   //   candidateLanguagesService.
  }
  return (
    <div>
      <div className="d-flex">
        <div
          className="col-2 bg-white min-vh-100"
          style={{ paddingTop: 100, paddingLeft: 20 }}
        >
          <div className="d-flex flex-column">
            <span className="navlinkcolor" style={{ fontWeight: "bold" }}>
              Eklediğim Alanlar
            </span>
            {schools.length > 0 && (
              <CvNavItem text={"Eğitim Bilgileri"} icon={<FaUserGraduate />} />
            )}
            {languages.length > 0 && (
              <CvNavItem text={"Dil"} icon={<MdLanguage />} />
            )}
            {talents.length > 0 && (
              <CvNavItem text={"Yetenekler"} icon={<FaTrophy />} />
            )}
            {jobExperience.length > 0 && (
              <CvNavItem text={"İş Deneyimi"} icon={<FaUserTie />} />
            )}

            {coverLetter.length > 0 && (
              <CvNavItem text={"Önsöz"} icon={<FaUserEdit />} />
            )}
            <span
              className="navlinkcolor mtop-20"
              style={{ fontWeight: "bold" }}
            >
              Ekleyebileceğim Alanlar
            </span>
            {coverLetter.length < 1 && <CvNavItem add text={"Önsöz"} />}
            {schools.length < 1 && <CvNavItem add text={"Eğitim Bilgileri"} />}
            {languages.length < 1 && <CvNavItem add text={"Yabancı Dil"} />}
            {talents.length < 1 && <CvNavItem add text={"Yetenekler"} />}
            {jobExperience.length < 1 && <CvNavItem add text={"İş Deneyimi"} />}
          </div>
        </div>
        <div className="col">
          <GradientBox>
            <div style={{ paddingTop: 100, paddingLeft: 50 }}>
              <h3>25.06.2021</h3>
              <small>Son Güncelleme</small>
            </div>
          </GradientBox>
          <div className="container d-flex flex-column align-items-center justify-content-center">
            <ShadowBoxWithHeader
              margined={-160}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"İletşim Bilgileri"}
            >
              <div className="d-flex">
                <div className="relative hoveredAvatar">
                <Avatar className="profileAvatar" src={cv.avatarUrl} />
                <div className="plus">
                <FaPlusCircle/>
                <span>Resim Yükle</span>
                <input onChange={imageChangeHandler} class="file-upload" type="file" accept="image/*"/>
                </div>
                </div>
                <div className="d-flex flex-column" style={{ marginLeft: 20 }}>
                  <h4>Mehmet Basrioğlu</h4>
                  <div className="d-flex">
                    <div>
                      <div className="d-flex flex-column">
                        <span className="navlinkcolor">E-posta Adresi</span>
                        <span style={{ color: "383636" }}>mhmtb@gmail.com</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="navlinkcolor">Telefon Numarası</span>
                        <span style={{ color: "383636" }}>0507 000 0000</span>
                      </div>
                    </div>
                    <div style={{ marginLeft: 120 }}>
                      <div className="d-flex flex-column">
                        <span className="navlinkcolor">Doğum Tarihi</span>
                        <span style={{ color: "383636" }}>2000.08.17</span>
                      </div>
                      <div className="d-flex socialmedia">
                        <span className="linkedin">
                          <FaLinkedin />
                        </span>
                        <span className="github">
                          <FaGithub />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ShadowBoxWithHeader>
            <ShadowBoxWithHeader
              margined={24}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"Önsöz"}
              button={"Güncelle"}
              buttonState={true}
              secondary
              onClick={(e)=> {
                  cvService.updateCoverLetter(id,coverLetter).then((result)=> console.log(result))
              }}
            >
              <div className="d-flex w-100">
                <textarea  className="w-100 coverLetter" onChange={(e) => setCoverLetter(e.currentTarget.value)} value={coverLetter}></textarea>
              </div>
            </ShadowBoxWithHeader>
            <ShadowBoxWithHeader
              margined={24}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"Eğitim"}
              buttonState={cv.schools && cv.schools.length > 0 && true}
              
              button={"Yeni Eğitim Ekle"}
              onClick={(e)=>setNewestSchoolState(true)}
            >
              <div className="d-flex flex-column">
                {cv.schools && !editableSchool && !newestSchool &&
                  cv.schools.map((data) => (
                    <SchoolItem
                      id={data.id}
                      schoolName={data.schoolName}
                      department={data.department}
                      entryDate={data.entryDate}
                      
                      
              onEditClick={(e) => {
                setEditableSchool(true)
                candidateSchoolService.getById(data.id).then((res)=>{
                    //2012-12-08"
                    setSavedSchoolData({
                        id:res.data.data[0].id,

                        candidateCvId: id,
                        department: res.data.data[0].department,
                         entryDate:`${res.data.data[0].entryDate.split(/[-]/)[0]}-${res.data.data[0].entryDate.split(/[-]/)[1]}-${res.data.data[0].entryDate.split(/[-]/)[2]}`,
                         graduationDate: res.data.data[0].graduationDate && `${res.data.data[0].graduationDate.split(/[-]/)[0]}-${res.data.data[0].graduationDate.split(/[-]/)[1]}-${res.data.data[0].graduationDate.split(/[-]/)[2]}`,
                         schoolName: res.data.data[0].schoolName
                       })
                })
                
              }}
                    />
                  ))}
                  {editableSchool && <Formik
                   initialValues={{
                    id:"",
                    candidateCvId: id,
                    department: savedSchoolData.department || "",
                     entryDate: savedSchoolData.entryDate  || "",
                     graduationDate: savedSchoolData.graduationDate || "",
                     schoolName: savedSchoolData.schoolName || ""
                   }}
                   enableReinitialize={true}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {

                     let object = {
                         
                        "id":savedSchoolData.id,
                        "candidateCvId": id,
                        "department": values.department,
                        "entryDate": values.entryDate,
                        "graduationDate": values.graduationDate,
                        "schoolName": values.schoolName
                      }
                      setSubmitting(false)
                      candidateSchoolService.update(object).then((res)=> console.log(res))
                      //console.log(object)
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş eğitimlerinizi
                         güncelleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Okul Adı</span>
                       <input
                       name="schoolName"
                       
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.schoolName}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         onChange={handleChange}
                         onBlur={handleBlur}
                         //2012-12-08"
                         value={values.entryDate}
                         name="entryDate"
                          class="form-control"
                          type="date"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         onChange={handleChange}
                         onBlur={handleBlur}
                         //2012-12-08"
                         value={values.graduationDate}
                         name="graduationDate"
                          class="form-control"
                          type="date"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon</span>
                        <input
                       name="department"
                       
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.department}
                          type="text"
                          className="roundedinput"
                        />
                         </div>
                         <div className="d-flex w-100 align-items-center justify-content-center mtop-10">
                             
                        <button
                       onClick={(e)=> setEditableSchool(false)}
                       className="btn-talent"
                       style={{width:"100%",marginRight:10}}
                     >
                       Vazgeç
                     </button>
                        
                     <button
                       type="submit"
                       disabled={!dirty || isSubmitting}
                       className="btn-talent"
                       style={{width:"100%",marginRight:10}}
                     >
                       Kaydet
                     </button>
                     </div>
                     </div>
 
                     </form>
                   )}
                 </Formik>}
                   {schools.length < 1 &&  <Formik
                   initialValues={{
                    candidateCvId: id,
                    department: "",
                     entryDate: "",
                     graduationDate: "",
                     schoolName: ""
                   }}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {
                     console.log(values);
                     let object = {
                        "candidateCvId": id,
                        "department": values.department,
                        "entryDate": values.entryDate,
                        "graduationDate": values.graduationDate,
                        "schoolName": values.schoolName
                      }
                    candidateSchoolService.add(object).then(()=>{
                    setSubmitting(false)

                    })
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş deneyimlerinizi
                         ekleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Okul Adı</span>
                       <input
                          name="schoolName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.workplaceName || ""}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         name="entryDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.entryDate}

                          class="form-control"
                          type="datetime-local"
                          id="entryDate"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         name="graduationDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.graduationDate}

                          class="form-control"
                          type="datetime-local"
                          id="graduationDate"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon</span>
                        <input
                          name="department"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.department || ""}
                          type="text"
                          className="roundedinput"
                        />
                         </div>
                         <div className="d-flex w-100 align-items-center justify-content-center mtop-10">
                             
                             <button
                            onClick={(e)=> setNewestSchoolState(false)}
                            className="btn-talent"
                            style={{width:"100%",marginRight:10}}
                          >
                            Vazgeç
                          </button>
                             
                          <button
                            type="submit"
                            disabled={!dirty || isSubmitting}
                            className="btn-talent"
                            style={{width:"100%",marginRight:10}}
                          >
                            Kaydet
                          </button>
                          </div>
                     </div>
 
                     </form>
                   )}
                 </Formik>}
                 {newestSchool && !editableSchool &&  <Formik
                   initialValues={{
                    candidateCvId: id,
                    department: "",
                     entryDate: "",
                     graduationDate: "",
                     schoolName: ""
                   }}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {
                     console.log(values);
                     let object = {
                        "candidateCvId": id,
                        "department": values.department,
                        "entryDate": values.entryDate,
                        "graduationDate": values.graduationDate,
                        "schoolName": values.schoolName
                      }
                    candidateSchoolService.add(object).then(()=>{
                    setSubmitting(false)

                    })
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş deneyimlerinizi
                         ekleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Okul Adı</span>
                       <input
                          name="schoolName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.workplaceName || ""}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         name="entryDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.entryDate}

                          class="form-control"
                          type="datetime-local"
                          id="entryDate"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         name="graduationDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.graduationDate}

                          class="form-control"
                          type="datetime-local"
                          id="graduationDate"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon</span>
                        <input
                          name="department"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.department || ""}
                          type="text"
                          className="roundedinput"
                        />
                         </div>
                         <div className="d-flex w-100 align-items-center justify-content-center mtop-10">
                             
                             <button
                            onClick={(e)=> setNewestSchoolState(false)}
                            className="btn-talent"
                            style={{width:"100%",marginRight:10}}
                          >
                            Vazgeç
                          </button>
                             
                          <button
                            type="submit"
                            disabled={!dirty || isSubmitting}
                            className="btn-talent"
                            style={{width:"100%",marginRight:10}}
                          >
                            Kaydet
                          </button>
                          </div>
                     </div>
 
                     </form>
                   )}
                 </Formik>}
              </div>
            </ShadowBoxWithHeader>
            <ShadowBoxWithHeader
              margined={24}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"İş Deneyimi"}
              buttonState={cv.jobExperience && cv.jobExperience.length > 0 && true}
              secondary
              button={"Yeni İş Deneyimi Ekle"}
              onClick={(e)=>setNewestJobExpState(true)}
            >
              <div className="d-flex flex-column">
                {cv.jobExperience &&  !editableJobExp && !newestJobExp &&
                  cv.jobExperience.map((data) => (
                    <JobExpItem
                      workplaceName={data.workplaceName}
                      department={data.jobtitle.title}
                      entryDate={data.entryDate}
                      onEditClick={(e) => {
                        setEditableJobExp(true)
                        candidateJobExperienceService.getById(data.id).then((res)=>{
                            
                            //2012-12-08"
                            setSavedJobData({
                                id:res.data.data[0].id,
                                cvId: id,
                                jobTitleId: res.data.data[0].jobtitle.id,
                                entryDate: `${res.data.data[0].entryDate.split(/[-]/)[0]}-${res.data.data[0].entryDate.split(/[-]/)[1]}-${res.data.data[0].entryDate.split(/[-]/)[2]}`,
                                exitDate: `${res.data.data[0].exitDate.split(/[-]/)[0]}-${res.data.data[0].exitDate.split(/[-]/)[1]}-${res.data.data[0].exitDate.split(/[-]/)[2]}`,
                                workplaceName: res.data.data[0].workplaceName,
                                jobDetail:res.data.data[0].jobDetail,
                              })
                              
                        })
                        
                        
                      }}
                    />
                  ))}
                          {editableJobExp &&
                   <Formik
                   initialValues={{
                    id:savedJobData.id,
                     cvId: id,
                     jobTitleId: savedJobData.jobTitleId || "",
                     entryDate: savedJobData.entryDate || "",
                     exitDate: savedJobData.exitDate || "",
                     workplaceName: savedJobData.workplaceName || "test",
                     jobDetail:savedJobData.jobDetail || ""
                   }}
                   enableReinitialize={true}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {
                     console.log(values);
                     let object = {
                        "id":values.id,
                        "cvId": id,
                        "entryDate": values.entryDate,
                        "exitDate": values.exitDate,
                        "jobTitleId": values.jobTitleId,
                        "workplaceName":values.workplaceName,
                        "jobDetail":values.jobDetail
                      }
                   
                      candidateJobExperienceService.update(object)
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş deneyimlerinizi
                         ekleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Şirket Adı</span>
                       <input
                          name="workplaceName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.workplaceName}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         onChange={handleChange}
                         onBlur={handleBlur}
                         //2012-12-08"
                         value={values.entryDate}
                         name="entryDate"
                          class="form-control"
                          type="date"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         onChange={handleChange}
                         onBlur={handleBlur}
                         //2012-12-08"
                         value={values.exitDate}
                         name="exitDate"
                          class="form-control"
                          type="date"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon (Düzenlenemez)</span>
                       <select
                           className="roundedinput talentWidth"
                          
                           id="jobTitleId"
                           name="jobTitleId"
                           value={values.jobTitleId}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           disabled
                         >
                           <option value={0} label="Pozisyon Seçin" />
                           {jobTitleItems.map((data, index) => (
                             <option key={index}  value={data.id}>
                               {data.title}
                             </option>
                           ))}
                         </select>
                         </div>
                         
                        <button
                       type="submit"
                       disabled={!dirty || isSubmitting}
                       className="btn-talent"
                       style={{ margin: 30 }}
                     >
                       Kaydet
                     </button>
                     </div>
                     <div className="d-flex flex-column w-100">
                     <span>
                         İş Tanımı
                       </span>
                     <textarea
                          name="jobDetail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.jobDetail}
                          type="text"
                          className="roundedinput h-100"
                          style={{marginTop:30}}
                          id="jobDetail"
                        />
                        </div>
 
                     </form>
                   )}
                 </Formik>}

                  {jobExperience.length < 1  &&
                   <Formik
                   initialValues={{
                     cvId: id,
                     jobTitleId: "",
                     entryDate: "",
                     exitDate: "",
                     workplaceName: "",
                     jobDetail:""
                   }}
                   validationSchema={Yup.object({
                    jobTitleId: Yup.number().required(
                       "Doldurulması gerekiyor!"
                     ),
                   })}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {
                     console.log(values);
                     let object = {
                        "cvId": id,
                        "entryDate": values.entryDate,
                        "exitDate": values.exitDate,
                        "jobTitleId": values.jobTitleId,
                        "workplaceName":values.workplaceName,
                        "jobDetail":values.jobDetail
                      }
                   candidateJobExperienceService.add(object).then(()=>{

                    setSubmitting(false)
                   })
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş deneyimlerinizi
                         ekleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Şirket Adı</span>
                       <input
                          name="workplaceName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.workplaceName || ""}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         name="entryDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.entryDate}

                          class="form-control"
                          type="datetime-local"
                          id="entryDate"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         name="exitDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.exitDate}

                          class="form-control"
                          type="datetime-local"
                          id="exitDate"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon</span>
                       <select
                           className="roundedinput talentWidth"
                          
                           id="jobTitleId"
                           name="jobTitleId"
                           value={values.talentId}
                           onChange={handleChange}
                           onBlur={handleBlur}
                         >
                           <option value="" label="Pozisyon Seçin" />
                           {jobTitleItems.map((data, index) => (
                             <option key={index} value={data.id}>
                               {data.title}
                             </option>
                           ))}
                         </select>
                         </div>
                         
                        <button
                       type="submit"
                       disabled={!dirty || isSubmitting}
                       className="btn-talent"
                       style={{ margin: 30 }}
                     >
                       Kaydet
                     </button>
                     </div>
                     <div className="d-flex flex-column w-100">
                     <span>
                         İş Tanımı
                       </span>
                     <textarea
                          name="jobDetail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          className="roundedinput h-100"
                          style={{marginTop:30}}
                          id="jobDetail"
                        />
                        </div>
 
                     </form>
                   )}
                 </Formik>}
                 {newestJobExp  &&
                   <Formik
                   initialValues={{
                     cvId: id,
                     jobTitleId: "",
                     entryDate: "",
                     exitDate: "",
                     workplaceName: "",
                     jobDetail:""
                   }}
                   validationSchema={Yup.object({
                    jobTitleId: Yup.number().required(
                       "Doldurulması gerekiyor!"
                     ),
                   })}
                   onSubmit={(
                     values,
                     { setSubmitting, setErrors, setStatus, resetForm }
                   ) => {
                     console.log(values);
                     let object = {
                        "cvId": id,
                        "entryDate": values.entryDate,
                        "exitDate": values.exitDate,
                        "jobTitleId": values.jobTitleId,
                        "workplaceName":values.workplaceName,
                        "jobDetail":values.jobDetail
                      }
                   candidateJobExperienceService.add(object).then(()=>{

                    setSubmitting(false)
                   })
                      
                   }}
                 >
                   {({
                     values,
                     touched,
                     errors,
                     dirty,
                     isSubmitting,
                     handleSubmit,
                     handleReset,
                     handleBlur,
                     handleChange,
                   }) => (
                     <form onSubmit={handleSubmit} className="d-flex w-100">
                       <div className="d-flex flex-column splitFlex">
                       <span>
                         Özgeçmişinizde yer alan iş deneyimlerinizi
                         ekleyebilirsiniz.
                       </span>
                       <div className="d-flex flex-column" style={{margin:10}}>
                        <span>Şirket Adı</span>
                       <input
                          name="workplaceName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.workplaceName || ""}
                          type="text"
                          className="roundedinput"
                        />
                        </div>
                    <div className="d-flex " style={{margin:10}}>
                    <div className="d-flex flex-column" style={{marginRight:10}}>
                    <span>Başlangıç Tarihi</span>
                    <input
                         name="entryDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.entryDate}

                          class="form-control"
                          type="datetime-local"
                          id="entryDate"
                        />
                        </div>
                        <div className="d-flex flex-column">
                    <span>Bitiş Tarihi</span>
                    <input
                         name="exitDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.exitDate}

                          class="form-control"
                          type="datetime-local"
                          id="exitDate"
                        />
                        </div>
                        </div>
                        <div  className="d-flex flex-column" style={{margin:10}}>
                        <span>Pozisyon</span>
                       <select
                           className="roundedinput talentWidth"
                          
                           id="jobTitleId"
                           name="jobTitleId"
                           value={values.talentId}
                           onChange={handleChange}
                           onBlur={handleBlur}
                         >
                           <option value="" label="Pozisyon Seçin" />
                           {jobTitleItems.map((data, index) => (
                             <option key={index} value={data.id}>
                               {data.title}
                             </option>
                           ))}
                         </select>
                         </div>
                         
                        <button
                       type="submit"
                       disabled={!dirty || isSubmitting}
                       className="btn-talent"
                       style={{ margin: 30 }}
                     >
                       Kaydet
                     </button>
                     </div>
                     <div className="d-flex flex-column w-100">
                     <span>
                         İş Tanımı
                       </span>
                     <textarea
                          name="jobDetail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          className="roundedinput h-100"
                          style={{marginTop:30}}
                          id="jobDetail"
                        />
                        </div>
 
                     </form>
                   )}
                 </Formik>}
              </div>
            </ShadowBoxWithHeader>
            <ShadowBoxWithHeader
              margined={24}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"Dil"}
              buttonState={cv.languages && cv.languages.length > 0 && true}
              
              button={"Yeni Dil Ekle"}
              onClick={(e)=>setEditableLang(true)}
            >
              <div className="d-flex flex-column">
                {cv.languages && !editableLang &&
                  cv.languages.map((data) => (
                    <LangItem lang={data.language.languagesName}
                    onClick={ratingHandler}
                    level={data.level}
                    langId={data.language.id}
                    
                    color={{filled: "#fdd053", unfilled: "rgba(253, 208, 83,0.5)"}}/>
                  ))}
                  {languages.length < 1 &&
                  <Formik
                  initialValues={{
                    cvId: id,
                    languageId: "",
                  }}
                  validationSchema={Yup.object({
                    languageId: Yup.number().required(
                      "Doldurulması gerekiyor!"
                    ),
                  })}
                  onSubmit={(
                    values,
                    { setSubmitting, setErrors, setStatus, resetForm }
                  ) => {
                    console.log(values);
                    let object = {
                      "candidateCvId": id,
                      "languageId": parseInt(values.languageId)
                    }
                    candidateLanguagesService.add(object).then((res)=> 
                   {
                    setSubmitting(false)
                    
                    if(res.data.success == false){
                        setErrors({languageId:"Daha önce sisteme kaydedilmiş"})
                      //  console.log(res.success)
                      }
                   }
                    )
                  }}
                >
                  {({
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleSubmit,
                    handleReset,
                    handleBlur,
                    handleChange,
                  }) => (
                    <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                      <span>
                        Özgeçmişinizde yer alan dillerinizi
                        ekleyebilirsiniz. Dil eklendikten hemen sonra yıldızlardan dil seviyenizi belirleyebilirsiniz.
                      </span>
                      {errors.languageId ? (
                        <div className="input-feedback">
                          {errors.languageId}
                        </div>
                      ) : (
                        ""
                      )}
                      <select
                          className="rounded talentWidth"
                          id="languageId"
                          name="languageId"
                          value={values.languageId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="" label="Yetenek Seçin" />
                          {languageItems.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.languagesName}
                            </option>
                          ))}
                        </select>
                        <div className="d-flex" style={{ margin: 30 }}>
                          <button
                       onClick={(e)=> setEditableLang(false)}
                       className="btn-talent"
                       style={{width:"100%",marginRight:10}}
                     >
                       Vazgeç
                     </button>
                         <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn-talent"
                        style={{width:"100%",marginRight:10}}
                      >
                        Kaydet
                      </button>
                      </div>

                    </form>
                  )}
                </Formik>
                }
              </div>
            </ShadowBoxWithHeader>
            <ShadowBoxWithHeader
              margined={24}
              marginBottom={30}
              padding={30}
              width={"130vh"}
              unanimated
              className="d-flex flex-column"
              headerText={"Yetenek"}
              
              button={"Yeni Yetenek Ekle"}
              buttonState={talents.length > 0 && true}
              onClick={(e)=>setEditableTalent(true)}
              secondary
            >
              <div className="d-flex flex-wrap">
                {talents.length > 0 && !editableTalent &&
                  talents.map((data) => (
                    <TalentItem title={data.talent.talentName} />
                  ))}
                {talents.length < 1 && editableTalent == false && (
                  <Formik
                    initialValues={{
                      cvId: id,
                      talentId: "",
                    }}
                    validationSchema={Yup.object({
                      talentId: Yup.number().required(
                        "Doldurulması gerekiyor!"
                      ),
                    })}
                    onSubmit={(
                      values,
                      { setSubmitting, setErrors, setStatus, resetForm }
                    ) => {
                      console.log(values);
                      let object = {
                        "cvId": id,
                        "id":0,
                        "talentId": parseInt(values.talentId)
                      }
                      candidateTalentService.add(object).then((res)=> 
                      {
                        setSubmitting(false)
                        console.log(res.data.success)
                        
                        if(res.data.success == false){
                          setErrors({talentId:"Daha önce sisteme kaydedilmiş"})
                        //  console.log(res.success)
                        }
                      }

                      )
                    }}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleSubmit,
                      handleReset,
                      handleBlur,
                      handleChange,
                    }) => (
                      <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                        <span>
                          Özgeçmişinizde yer alan yeteneklerinizi
                          ekleyebilirsiniz
                        </span>
                        {errors.talentId ? (
                        <div className="input-feedback">
                          {errors.talentId}
                        </div>
                      ) : (
                        ""
                      )}
                        <select
                            className="rounded talentWidth"
                            id="talentId"
                            name="talentId"
                            value={values.talentId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Yetenek Seçin" />
                            {talentItems.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.talentName}
                              </option>
                            ))}
                          </select>
                          <div className="d-flex" style={{ margin: 30 }}>
                         <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn-talent"
                        style={{width:"100%",marginRight:10}}
                      >
                        Kaydet
                      </button>
                      </div>

                      </form>
                    )}
                  </Formik>
                )}
                {editableTalent && <Formik
                    initialValues={{
                      cvId: id,
                      talentId: "",
                    }}
                    validationSchema={Yup.object({
                      talentId: Yup.number().required(
                        "Doldurulması gerekiyor!"
                      ),
                    })}
                    onSubmit={(
                      values,
                      { setSubmitting, setErrors, setStatus, resetForm }
                    ) => {
                      console.log(values);
                      let object = {
                        "cvId": id,
                        "id":0,
                        "talentId": parseInt(values.talentId)
                      }
                      candidateTalentService.add(object).then((res)=> 
                      {
                        setSubmitting(false)
                        console.log(res.data.success)
                        
                        if(res.data.success == false){
                          setErrors({talentId:"Daha önce sisteme kaydedilmiş"})
                        //  console.log(res.success)
                        }
                      }

                      )
                    }}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleSubmit,
                      handleReset,
                      handleBlur,
                      handleChange,
                    }) => (
                      <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                        <span>
                          Özgeçmişinizde yer alan yeteneklerinizi
                          ekleyebilirsiniz
                        </span>
                        {errors.talentId ? (
                        <div className="input-feedback">
                          {errors.talentId}
                        </div>
                      ) : (
                        ""
                      )}
                        <select
                            className="rounded talentWidth"
                            id="talentId"
                            name="talentId"
                            value={values.talentId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Yetenek Seçin" />
                            {talentItems.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.talentName}
                              </option>
                            ))}
                          </select>
                          <div className="d-flex" style={{ margin: 30 }}>
                          <button
                       onClick={(e)=> setEditableTalent(false)}
                       className="btn-talent"
                       style={{width:"100%",marginRight:10}}
                     >
                       Vazgeç
                     </button>
                         <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn-talent"
                        style={{width:"100%",marginRight:10}}
                      >
                        Kaydet
                      </button>
                      </div>

                      </form>
                    )}
                  </Formik>}
              </div>
            </ShadowBoxWithHeader>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateCVPage;

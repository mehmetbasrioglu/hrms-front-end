import { Formik } from 'formik';
import React from 'react'
import DropDiv from '../layouts/DropDiv'
import ShadowBox from '../layouts/ShadowBox'

import EmployerService from "../services/employerService";
import EmployerUpdateService from "../services/employerUpdateService";

function EmployerProfileSettingsPage() {
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
    

    // "data": {
    //     "id": 6,
    //     "email": "gittigidiyor@gittigidiyor.com",
    //     "password": "gg123456",
    //     "systemUser": [],
    //     "companyName": "Gitti Gidiyor Bilgi Teknolojileri San. Tic. A.Ş.",
    //     "webAdress": "gittigidiyor.com",
    //     "phoneNumber": "000 000 0000",
    //     "avatarUrl": "http://res.cloudinary.com/drtniio0r/image/upload/v1625250466/qezyyzyegrodgqiczwq3.png",
    //     "industry": "Bilgi Teknolojileri",
    //     "foundYear": "2001-02-05",
    //     "headerImageUrl": "http://res.cloudinary.com/drtniio0r/image/upload/v1625254531/jukwws4aomclctujitgf.jpg"
    //   }
    return (
        <div className="container">
            <div >
      <div className="row  margintop ">
        <div className="col-2">
          <ShadowBox unanimated className="">
            <div className="p-10 d-flex flex-column jobads-right">
              <ul className="customList">
                <li><span className="active"></span> Ayarlar</li>
              </ul>
            </div>
          </ShadowBox>
        </div>
        <div className="col-10 " style={{paddingBottom:50}}>
            
            <DropDiv
            header={"İşveren Bilgilerim"}
            
            subtext={"Şirket bilgilerini buradan düzenleyebilirsin"}
            >
                <div className="">
                {!updateStatus && 
                 <Formik
                 initialValues={{
                  company_name: employerData.companyName || "",
                  industry:employerData.industry || "",
                  webAddress:  employerData.webAdress || "",
                  foundYear:  employerData.foundYear || "",
                   phoneNumber:  employerData.phoneNumber ||"",
                   schoolName: ""
                 }}
                 enableReinitialize={true}
                 onSubmit={(
                   values,
                   { setSubmitting, setErrors, setStatus, resetForm }
                 ) => {

                    setSubmitting(false)
                    employerUpdateService.update(id,values)
                    .then((res)=>{
                      console.log(res)
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
                     <div className="d-flex flex-column w-100">
                     <div className="d-flex " style={{margin:10}}>
                      <div className="d-flex flex-column w-100" style={{marginRight:10}}>
                      <span>Şirket Adı</span>
                     <input
                     name="company_name"
                     
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.company_name}
                        type="text"
                        className="roundedinput"
                      />
                      </div>
                      <div className="d-flex flex-column w-100">
                      <span>Sektör</span>
                     <input
                     name="industry"
                     
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.industry}
                        type="text"
                        className="roundedinput"
                      />
                      </div>
                      </div>
                  <div className="d-flex " style={{margin:10}}>
                  <div className="d-flex flex-column w-100" style={{marginRight:10}}>
                  <span>Kuruluş Tarihi</span>
                  <input
                       onChange={handleChange}
                       onBlur={handleBlur}
                       //2012-12-08"
                       value={values.foundYear}
                       name="foundYear"
                        class="form-control"
                        type="date"
                      />
                      </div>
                      <div className="d-flex flex-column w-100">
                      <span>Web Address</span>
                     <input
                     name="webAddress"
                     
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.webAddress}
                        type="text"
                        className="roundedinput"
                      />
                      </div>
                      </div>
                      <div className="d-flex " style={{margin:10}}>
                      <div className="d-flex flex-column w-100">
                      <span>Telefon Numarası</span>
                     <input
                     name="phoneNumber"
                     
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.phoneNumber}
                        type="text"
                        className="roundedinput"
                      />
                      </div>
                      </div>
                       <div className="d-flex w-100 align-items-center justify-content-center mtop-10">
                      
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
               </Formik>
               }
               {updateStatus && 
               <div className="d-flex justify-content-center align-items-center">
                <h5>Güncelleme onayı bekliyor</h5>
                </div>
               }
               
                </div>
            </DropDiv>

            <DropDiv
            header={"Hesap Bilgileri"}
            subtext={"Email ve Şifre bilgilerini değiştirebilirsin"}
            >
            
            </DropDiv>
             
        
        </div>
      </div>
    </div>
        </div>
    )
}

export default EmployerProfileSettingsPage

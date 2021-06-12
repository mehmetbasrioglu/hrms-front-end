import React from "react";

import RoundedBox from "../layouts/RoundedBox";
import ShadowBox from "../layouts/ShadowBox";

import CityService from "../services/cityService";
import JobTitleService from "../services/jobTitleService";
import WorkHourService from "../services/WorkHourService";
import WorkTypeService from "../services/WorkTypeService";

import * as Yup from "yup";
import { Formik } from "formik";

import $ from "jquery"
import JobAdvertisementService from "../services/jobAdvertisementService";
import { useHistory } from "react-router-dom";

function CreateJobAdvertisementPage() {
  const [cities, setCities] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [hours, setWorkHours] = React.useState([]);
  const [types, setWorkTypes] = React.useState([]);

  React.useEffect(() => {
    let cityService = new CityService();
    let titleService = new JobTitleService();
    let hourService = new WorkHourService();
    let typeService = new WorkTypeService();
    cityService.getAll().then((data) => {
      setCities(data.data.data);
    });
    titleService.getAll().then((data) => {
      setTitles(data.data.data);
    });

    hourService.getAll().then((data) => {
      setWorkHours(data.data.data);
    });

    typeService.getAll().then((data) => {
      setWorkTypes(data.data.data);
    });


  }, []);

  const history = useHistory();

  const jobAdvertisementService = new JobAdvertisementService();

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="row  margintop">
        <div className="col">
          <div style={{ padding: 20 }}>
            <Formik
              initialValues={{
                appealExpirationDate: "",
                cityId: "",
                description: "",
                employerId: "",
                jobtitleId: "",
                maxSalary: "",
                minSalary: "",
                quota: "",
                workHourId: "",
                workTypeId: "",
              }}
              validationSchema={Yup.object({
                description: Yup.string().required(
                  "İş Tanıtımı Boş Bırakılamaz"
                ),
                minSalary: Yup.number()
                  .typeError("Metin Girilemez !")
                  .required("Boş Bırakılamaz"),
                maxSalary: Yup.number()
                  .typeError("Metin Girilemez !")
                  .required("Boş Bırakılamaz"),
                cityId: Yup.number().required("Doldurulması gerekiyor!"),
                jobtitleId: Yup.number().required("Doldurulması gerekiyor!"),
                workHourId: Yup.number().required("Doldurulması gerekiyor!"),
                workTypeId: Yup.number().required("Doldurulması gerekiyor!"),
                quota: Yup.number().typeError("Metin Girilemez !").min(1, "Kontenjan minimum 1 olmak zorunda").required("Doldurulması gerekiyor!"),
              })}
              onSubmit={(
                values,
                { setSubmitting, setErrors, setStatus, resetForm }
              ) => {

                //Transformed Values
                values.jobtitleId = parseInt(values.jobtitleId);
                values.workHourId = parseInt(values.workHourId);
                values.workTypeId = parseInt(values.workTypeId);
                values.cityId = parseInt(values.cityId);
                values.quota = parseInt(values.quota);
                values.minSalary = parseInt(values.minSalary);
                values.maxSalary = parseInt(values.maxSalary);
                values.employerId = 3; // auth yapmadığımız için kendim default id setledim
                //Transformed Values End


                jobAdvertisementService.add(values).then((data)=>{
                    console.log(data)
                    history.push("/is-ilanlari")
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
                <form onSubmit={handleSubmit}>
                  <div className="jobads-right">
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn-softpink"
                        style={{ marginRight: 10 }}
                      >
                        İptal Et
                      </button>
                      <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn-lightblue"
                        style={{ marginRight: 10 }}
                      >
                        Oluştur
                      </button>
                    </div>
                  </div>
                  <ShadowBox margined={20}>
                    <div className="d-flex justify-content-between">
                      <div className="f-1 d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>Şehir</strong>
                        <div className="custom-select jobads-right ">
                          <select
                            className="rounded"
                            id="cityId"
                            name="cityId"
                            value={values.cityId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Şehir Seçin" />
                            {cities.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.cityName}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                        {errors.cityId && touched.cityId ? (
                          <div className="input-feedback">{errors.cityId}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="f-1  d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>Pozisyon</strong>
                        <div className="custom-select jobads-right ">
                          <select
                            className="rounded"
                            name="jobtitleId"
                            value={values.jobtitleId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Pozisyon Seçin" />
                            {titles.map((data, index) => (
                              <option
                                key={index}
                                value={data.id}
                                label={data.title}
                              >
                                {data.title}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                        {errors.jobtitleId && touched.jobtitleId ? (
                          <div className="input-feedback">
                            {errors.jobtitleId}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="f-1 d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>
                          Minimum Maaş
                        </strong>
                        <div className="jobads-right ">
                          <input
                            type="text"
                            className="rounded"
                            name="minSalary"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values.minSalary}
                          />
                        </div>
                        {errors.minSalary && touched.minSalary ? (
                          <div className="input-feedback">
                            {errors.minSalary}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="f-1  d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>
                          Maksimum Maaş
                        </strong>
                        <div className=" jobads-right ">
                          <input
                            type="text"
                            className="rounded"
                            name="maxSalary"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values.maxSalary}
                          />
                        </div>
                        {errors.maxSalary && touched.maxSalary ? (
                          <div className="input-feedback">
                            {errors.maxSalary}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="f-1 d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>İş Türü</strong>
                        <div className="custom-select jobads-right ">
                          <select
                            className="rounded"
                            name="workHourId"
                            value={values.workHourId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {hours.map((data, index) => (
                              <option
                                key={index}
                                value={data.id}
                                label={data.workHours}
                              >
                                {data.workHours}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                      <div className="f-1  d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>
                          Çalışma Zamanı
                        </strong>
                        <div className="custom-select jobads-right ">
                          <select
                            className="rounded"
                            name="workTypeId"
                            value={values.workTypeId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {types.map((data, index) => (
                              <option
                                key={index}
                                value={data.id}
                                label={data.workType}
                              >
                                {data.workType}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="f-1 d-flex flex-column">
                        <strong style={{ marginBottom: 10 }}>
                          İlan Bitiş Tarihi
                        </strong>
                        <div className="jobads-right ">
                          
                        <input
                         name="appealExpirationDate"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         values={values.appealExpirationDate}

                          class="form-control"
                          type="datetime-local"
                          id="appealExpirationDate"
                        />
                        </div>
                        {errors.appealExpirationDate && touched.appealExpirationDate ? (
                          <div className="input-feedback">
                            {errors.appealExpirationDate}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    
                    <div className="f-1 d-flex flex-column">
                      <strong style={{ marginBottom: 10 }}>Kontenjan</strong>
                      <div className="jobads-right ">
                        <input
                          name="quota"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.quota[0] || ""}
                          type="text"
                          className="rounded"
                        />
                      </div>
                      {errors.quota && touched.quota ? (
                        <div className="input-feedback">
                          {errors.quota}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>


                    <div className="f-1 d-flex flex-column">
                      <strong style={{ marginBottom: 10 }}>İş Tanımı</strong>
                      <div className="jobads-right ">
                        <textarea
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.description[0] || ""}
                          type="text"
                          className="rounded"
                        />
                      </div>
                      {errors.description && touched.description ? (
                        <div className="input-feedback">
                          {errors.description}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                  </ShadowBox>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJobAdvertisementPage;

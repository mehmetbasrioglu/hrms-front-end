import axios from "axios";

export default class CandidateLanguagesService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatelanguages/getall")
    }

    add(object){
        return axios.post("http://localhost:8080/api/candidatelanguages/add",object)
    }

    update(cvId,langId,level){
        return axios.post(`http://localhost:8080/api/candidatelanguages/updateLevel?cvId=${cvId}&langId=${langId}&level=${level}`)
    }
}
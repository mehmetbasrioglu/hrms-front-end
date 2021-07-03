import axios from "axios";

export default class CandidateCvService{

    getAll(){
        return axios.get("http://localhost:8080/api/cv/getall")
    }

    findByCandidateId(id){
        return axios.get("http://localhost:8080/api/cv/findbycandidateid?id="+id)
    }

    findByCvId(id){
        return axios.get("http://localhost:8080/api/cv/findbycvid?id="+id)
    }

    addCvPhoto(formData){
        return axios.post("http://localhost:8080/api/cv/addcvphoto?candidateCvId=",formData)
    }

    updateCoverLetter(cvId,text){
        return axios.post(`http://localhost:8080/api/cv/updateCoverLetter?cvId=${cvId}&text=${text}`)
    }






    














}
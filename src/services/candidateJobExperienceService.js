import axios from "axios";

export default class CandidateJobExperienceService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidateexperience/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/candidateexperience/getbyid?id="+id)
    }

    getJobExperienceWithOrdered(id){
        return axios.get("http://localhost:8080/api/candidateexperience/getcandidateJobExperiencesswithordered?id="+id)
    }

    add(object){
        return axios.post("http://localhost:8080/api/candidateexperience/add",object)
    }

    update(object){
        return axios.post("http://localhost:8080/api/candidateexperience/update",object)
    }

}
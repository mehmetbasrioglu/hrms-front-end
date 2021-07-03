///api/favourite/findByCandidateIdAndJobId?candidateId=4&jobId=1

import axios from "axios";

export default class FavouriteService{
    getAll(){
        return axios.get("http://localhost:8080/api/favourite/getall")
    }

    findByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/favourite/findByCandidateId?id=${candidateId}`)
    }

    findByCandidateIdAndJobId(candidateId,jobId){
        return axios.get(`http://localhost:8080/api/favourite/findByCandidateId?id=${candidateId}&jobId=${jobId}`)
    }

    add(object){
        return axios.post("http://localhost:8080/api/favourite/add",object)
    }

    
    delete(candidateId,jobId){
        return axios.delete(`http://localhost:8080/api/favourite/delete?id=${candidateId}&jobId=${jobId}`)
    }

}
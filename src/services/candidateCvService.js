import axios from "axios";

export default class candidateCvService{
    getAll(){
        return axios.get("http://localhost:8080/api/cv/getall")
    }

    findByCandidateId(id){
        return axios.get("http://localhost:8080/api/cv/findbycandidateid?id="+id)
    }

    














}
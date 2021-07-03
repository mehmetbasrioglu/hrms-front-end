import axios from "axios";

export default class CandidateTalentService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatetalents/getall")
    }

    add(value){
        return axios.post("http://localhost:8080/api/candidatetalents/add",value)
    }
}
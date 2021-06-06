import axios from "axios";

export default class candidateService{
    getAll(){
      return  axios.get("http://localhost:8080/api/candidate/getall")
    }
}
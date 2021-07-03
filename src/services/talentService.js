import axios from "axios";

export default class TalentService{
    getAll(){
        return axios.get("http://localhost:8080/api/talent/getall")
    }
}
import axios from "axios";

export default class WorkHourService{
    getAll(){
        return axios.get("http://localhost:8080/api/workhour/getall")
    }
}
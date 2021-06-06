import axios from "axios";

export default class CityService{
    getAll(){
        return axios.get("http://localhost:8080/api/city/getall")
    }
}
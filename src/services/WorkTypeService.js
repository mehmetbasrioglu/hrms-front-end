import axios from "axios";

export default class WorkTypeService{
    getAll(){
        return axios.get("http://localhost:8080/api/worktype/getall")
    }
}
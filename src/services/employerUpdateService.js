import axios from "axios";

export default class EmployerUpdateService{
    getAll(){
        return axios.get("http://localhost:8080/api/employers/status/getall")
    }

    findById(id){
        return axios.get("http://localhost:8080/api/employer/status/findbyemployerid?employerId="+id)
    }

    
    update(employerId,formData){
        let object = {
            "employerId":employerId,
            "update":formData
        }
        return axios.post("http://localhost:8080/api/employer/status/add",object)
    }





}
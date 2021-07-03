import axios from "axios";

export default class EmployerService{
    getAll(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    findById(id){
        return axios.get("http://localhost:8080/api/employers/findbyid?id="+id)
    }
    
    
    addProfilePhoto(formData){
        return axios.post("http://localhost:8080/api/employers/uploadphoto?employerId=",formData)
    }


    addHeaderPhoto(formData){
        return axios.post("http://localhost:8080/api/employers/uploadheaderphoto?employerId=",formData)
    }
    


}
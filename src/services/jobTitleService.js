import axios from "axios";

export default class JobTitleService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobtitle/getall")
    }


    //Title ID
    findById(id){
        return axios.get("http://localhost:8080/api/jobtitle/findbyid/"+id)
    }

    findByTitleName(titleName){
        return axios.get("http://localhost:8080/api/jobtitle/findbytitle/"+titleName)
    }


}
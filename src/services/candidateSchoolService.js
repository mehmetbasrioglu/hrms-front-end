import axios from "axios";

export default class candidateSchoolService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidateschools/getall")
    }

    findByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidateschools/findbycandidatecvid?id="+id)
    }

    getById(id){
        return axios.get("http://localhost:8080/api/candidateschools/getbyid?id="+id)
    }

    getCvSchoolsWithOrdered(id){
        return axios.get("http://localhost:8080/api/candidateschools/getcandidateschoolswithordered?id"+id)
    }

    add(object){
        return axios.post("http://localhost:8080/api/candidateschools/add",object)
    }

    update(object){
        return axios.post("http://localhost:8080/api/candidateschools/update",object)
    }


}
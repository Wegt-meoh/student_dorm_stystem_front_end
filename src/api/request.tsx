import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { AjaxRequest, ServiceUrl } from "../constant/contant";

function login(studentNumber: string, password: string) {    
    return axios({
        method: 'post',
        url: 'http://localhost:8000'+ServiceUrl.login,
        data: {
            studentNumber: studentNumber,
            password: password,
            uuid: uuidv4()
        },
        responseType: 'json'
    })
}

function getInfo(token:string){
    return axios({
        method: 'get',
        url: 'http://localhost:8000'+ServiceUrl.getInfo,
        headers: { [AjaxRequest.HEADER_TOKEN_KEY]: token },
        responseType: 'json'
    })
}

export { login ,getInfo}
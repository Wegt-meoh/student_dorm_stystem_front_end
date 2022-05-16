import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { AjaxRequest, ServiceUrl } from "../constant/contant";

function login(studentNumber: string, password: string) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000' + ServiceUrl.login,
        data: {
            studentNumber: studentNumber,
            password: password,
            uuid: uuidv4()
        },
        responseType: 'json'
    })
}

function getInfo(token: string) {
    console.log('getInfo')
    return axios({
        method: 'get',
        url: 'http://localhost:8000' + ServiceUrl.getInfo,
        headers: { [AjaxRequest.HEADER_TOKEN_KEY]: token },
        responseType: 'json'
    })
}

function listUser(token:string,pageNum: number, pageSize: number) {
    let url:string ='http://localhost:8000' + ServiceUrl.list+'?'+AjaxRequest.PAGE_NUM+'='+pageNum+'&'+AjaxRequest.PAGE_SIZE+'='+pageSize    
    return axios({
        method: 'get',
        url: url,
        headers: { [AjaxRequest.HEADER_TOKEN_KEY]: token },
        [AjaxRequest.PAGE_NUM]: 1,
        [AjaxRequest.PAGE_SIZE]: 2,
    })
}

export { login, getInfo,listUser }
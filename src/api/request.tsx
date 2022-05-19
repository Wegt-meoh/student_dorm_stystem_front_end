import { message } from "antd";
import axios from "axios"
import qs from "qs";
import { v4 as uuidv4 } from 'uuid';
import { AjaxRequest, AjaxResult, HttpStatus, ServiceUrl } from "../constant/contant";
import { SysUser } from "../utils/customType";
import { getToken, removeToken } from "./handleToken";

const baseUrl = 'http://localhost:8000'

const server = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

server.interceptors.request.use(values => {
    if (values.headers === undefined) values.headers = {}
    const useToken: boolean | undefined = values.headers[AjaxRequest.HEADER_USE_TOKEN] as boolean | undefined
    if (useToken === true) {
        const token = getToken()
        if (token !== undefined) {
            values.headers[AjaxRequest.HEADER_TOKEN_KEY] = token
        }
    }
    if (values.method === 'get' && values.params !== undefined) {
        const url = values.url + '?' + qs.stringify(values.params)
        values.params = undefined
        values.url = url
    }
    return values
}, error => {
    message.error('error: ' + error)
    return Promise.reject(error)
})

server.interceptors.response.use(values => {
    const code = values.data[AjaxResult.CODE_TAG] === undefined ? 200 : values.data[AjaxResult.CODE_TAG]
    const msg = values.data[AjaxResult.MSG_TAG]
    if (values.request.responseType === 'blob' || values.request.responseType === 'arraybuffer') {
        return values.data
    }
    switch (code) {
        case HttpStatus.ERROR:
            message.error('msg: ' + msg, 2)
            return Promise.reject(msg)
        case HttpStatus.UNAUTHORIZED:
            message.info('msg: ' + msg, 2)
            removeToken()
            window.location.href = '/app/login'
            return Promise.reject(msg)
        case HttpStatus.SUCCESS:
            return values
        default:
            message.info('unknow code: ' + code + 'msg: ' + msg, 2)
            return Promise.reject(msg)
    }
}, error => {
    message.error('error: ' + error, 2)
    return Promise.reject(error)
})

function login(studentNumber: string, password: string) {
    return server({
        method: 'post',
        url: ServiceUrl.login,
        data: {
            studentNumber: studentNumber,
            password: password,
            uuid: uuidv4()
        }
    })
}

function getInfo() {
    return server({
        method: 'get',
        headers: { [AjaxRequest.HEADER_USE_TOKEN]: true },
        url: ServiceUrl.getInfo
    })
}

function listUser(pageNum: number, pageSize: number) {
    return server({
        method: 'get',
        url: ServiceUrl.list,
        params: { pageNum: pageNum, pageSize: pageSize },
        headers: { [AjaxRequest.HEADER_USE_TOKEN]: true }
    })
}

function logout() {
    return server({
        method: 'post',
        url: ServiceUrl.logout,
        headers: { [AjaxRequest.HEADER_USE_TOKEN]: true }
    })
}

function addUser(data: SysUser) {
    return server({
        method: 'post',
        url: ServiceUrl.addUser,
        data: data,
        headers: { [AjaxRequest.HEADER_USE_TOKEN]: true }
    })
}

function deleteUser(userId:number){
    return server({
        method:'delete',
        url:ServiceUrl.delUser,
        data:{userId:userId},
        headers: { [AjaxRequest.HEADER_USE_TOKEN]: true }
    })
}

export { login, getInfo, listUser, logout, addUser ,deleteUser}
import { message } from "antd";
import axios from "axios";
import { getToken } from "./handleToken";

const axiosService = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

axiosService.interceptors.request.use(
    config => {
        const needToken = config.headers?.needToken === true
        if (typeof getToken() === 'string' && needToken) {
            if (config.headers === undefined) {
                config.headers = { 'Authorization': 'Bearer ' + getToken() }
            } else {
                config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            }
        }
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

axiosService.interceptors.response.use(
    result => {
        const {code}=result.data
        switch(code){
            case '304':
                break
            case '200':
                return result.data
            case '500':
                break
            default:
        }
    },
    error => {
        console.log('err' + error)
        let messageText = error.message;
        if (messageText == "Network Error") {
            messageText = "后端接口连接异常";
        }
        else if (messageText.includes("timeout")) {
            messageText = "系统接口请求超时";
        }
        else if (messageText.includes("Request failed with status code")) {
            messageText = "系统接口" + messageText.substr(messageText.length - 3) + "异常";
        }
        message.error(messageText, 5)
        return Promise.reject(error)
    }
)

export { axiosService }
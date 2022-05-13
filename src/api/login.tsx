import { message } from "antd"
import axios from "axios"
import { AjaxResult, HttpStatus } from "../constant/contant"

import { setToken } from '../utils/handleToken'

function login(studentNumber: string, password: string) {
    const hide = message.loading('login...', 0)
    axios({
        method: 'post',
        url: 'http://localhost:8000/login',
        data: {
            studentNumber: studentNumber,
            password: password,
            uuid: '12321sdfdsfd'
        },
        responseType: 'json'
    }).then((result) => {
        hide()
        const code = result.data[AjaxResult.CODE_TAG]
        const msg = result.data[AjaxResult.MSG_TAG]
        const data = result.data[AjaxResult.DATA_TAG]
        console.log('code: '+code)
        console.log('msg: '+msg)
        switch (code) {
            case HttpStatus.SUCCESS:
                const token=result.data.token
                setToken(token)
                // setToken(token)
                message.success('login success', 1)
                // window.location.href = '/'
                break
            case HttpStatus.UNAUTHORIZED:
                message.info('login denied error username or password', 2)
                break
            case HttpStatus.ERROR:
                message.error(msg, 2)
                break
            default:
                message.error('code: '+code+', msg: '+msg)
        }
    }).catch((reason) => {
        hide()
        message.error('login server error reason:' + reason, 2)
    })
}

export { login }
import { message } from "antd"
import axios from "axios"

import { setToken } from '../utils/handleToken'

function login(username: string, password: string, role: string, rememberMe: boolean) {
    const hide = message.loading('login...', 0)
    axios({
        method: 'get',
        url: 'http://localhost:8000/login',
        params: {
            username: username,
            password: password,
            role: role
        },
        responseType: 'json'
    }).then((result) => {
        hide()
        const { status } = result.data
        switch (status) {
            case '200':
                if (rememberMe === true) {
                    const token = result.data.token as string
                    setToken(token)
                }
                message.success('login success', 1)
                window.location.href = '/'
                break
            case '304':
                message.info('login denied error username or password', 2)
                break
            default:
                message.error('login server error status:' + status, 2)
                break
        }
    }).catch((reason) => {
        hide()
        message.error('login server error', 2)
    })
}

export { login }
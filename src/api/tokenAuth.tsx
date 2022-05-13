import { message } from "antd";
import axios from "axios";
import { getToken, removeToken } from "../utils/handleToken";

function tokenAuth(): any {
    const token = getToken()
    axios({
        method: 'get',
        url: 'http://localhost:8000/tokenAuth',
        params: { token: token },
        responseType: 'json'
    }).then((result) => {
        const { status } = result.data
        switch (status) {
            case '200':
                console.log(result.data)
                return result.data
            case '304':
                removeToken()
                message.info('token out date', 2)
                window.location.href = '/app/login'
                break
            default:
                message.error('server error')
        }
    }).catch((reason) => {
        message.error('server error reason:' + reason)
    })
}

export { tokenAuth }
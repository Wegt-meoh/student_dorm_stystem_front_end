import { message } from "antd";
import axios from "axios";
import { getToken, removeToken } from "../utils/handleToken";

function tokenAuth() {
    const token = getToken()
    axios({
        method: 'get',
        url: 'http://localhost:8000/tokenAuth',
        params: { token: token },
        responseType: 'json'
    }).then((result) => {
        const { status, username } = result.data
        switch (status) {
            case '200':
                if (typeof username === 'string') {
                    message.success('hello ' + username)
                    return username
                } else {
                    message.error('data error',)
                }
                break
            case '304':
                removeToken()
                message.error('token out date')
                break
            default:
                message.error('server error')
        }
    }).catch((reason) => {
        message.error('server error reason:' + reason)
    })
}

export { tokenAuth }
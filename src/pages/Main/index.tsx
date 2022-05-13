import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './index.css'
import { tokenAuth } from '../../api/tokenAuth'
import { getToken, removeToken } from '../../utils/handleToken'
import Sider from '../../components/Sider'
import Header from '../../components/Header'
import Content from '../../components/Content'
import axios from 'axios'
import { AjaxResult, HttpStatus, tokenHeaderKeyName } from '../../constant/contant'
import { message } from 'antd'



export default function Main() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    //index auth
    useEffect(() => {
        const token = getToken()
        if (token === undefined) {
            navigate('/app/login')
        } else {
            axios({
                method: 'get',
                url: 'http://localhost:8000/getInfo',
                headers: { [tokenHeaderKeyName]: token },
                responseType: 'json'
            }).then((result) => {
                const code = result.data[AjaxResult.CODE_TAG]
                const msg = result.data[AjaxResult.MSG_TAG]
                const data = result.data[AjaxResult.DATA_TAG]
                switch (code) {
                    case HttpStatus.SUCCESS:
                        console.log(msg)
                        console.log(data)                        
                        navigate('/index')
                        break
                    case HttpStatus.UNAUTHORIZED:
                        removeToken()
                        navigate('/app/login')
                        break
                    case HttpStatus.ERROR:
                        message.error('server error ' + HttpStatus.ERROR, 3)
                        break
                    default:
                        message.error('unknow error', 3)
                }
            }).catch((reason) => {
                message.error('server error reason:' + reason, 3)
            })
        }
    }, [])

    return (
        <div className='index'>
            <Sider />
            <div className='index-main'>
                <Header username={username} />
                <Content children={<Outlet />} />
            </div>
        </div>
    )
}

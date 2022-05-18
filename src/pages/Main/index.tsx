import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './index.css'
import { getToken, removeToken } from '../../utils/handleToken'
import Sider from '../../components/Sider'
import Header from '../../components/Header'
import Content from '../../components/Content'
import { AjaxResult, HttpStatus, AjaxRequest } from '../../constant/contant'
import { message } from 'antd'
import { getInfo } from '../../api/request'
import { SysUser } from '../../utils/customType'

export default function Main() {
    const [sysUser, setSysUser] = useState<SysUser>()

    //get user info
    useEffect(() => {
        getInfo().then((result) => {
            const data = result.data[AjaxResult.DATA_TAG]
            try {
                setSysUser(data)
            } catch (error) {
                message.error('data format error', 2)
            }
        })
    }, [])

    return (
        <div className='main'>
            <Sider />
            <div className='main-body'>
                <Header username={sysUser?.username} />
                <Content children={<Outlet />} />
            </div>
        </div>
    )
}

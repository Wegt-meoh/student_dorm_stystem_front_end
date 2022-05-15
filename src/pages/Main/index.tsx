import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './index.css'
import { tokenAuth } from '../../api/tokenAuth'
import { getToken, removeToken } from '../../utils/handleToken'
import Sider from '../../components/Sider'
import Header from '../../components/Header'
import Content from '../../components/Content'
import axios from 'axios'
import { AjaxResult, HttpStatus, AjaxRequest } from '../../constant/contant'
import { message } from 'antd'
import { getInfo } from '../../api/request'

interface SysDorm{
    dormId:number
    dormNumber:string
    buildingNumber:string
}

interface SysRole{
    roleId:number
    roleName:string
    roleKey:string
}

interface SysUser{
    username:string
    sex:string
    createTime:string
    dorm:SysDorm
    role:SysRole
    studentNumber:string
    updateTime:string
    userId:number
}

export default function Main() {
    const navigate = useNavigate()
    const [sysUser, setSysUser] = useState<SysUser>()

    //get user info
    useEffect(() => {
        const token = getToken()
        if (token === undefined) {
            navigate('/app/login')
        } else {
            getInfo(token).then((result) => {
                const code = result.data[AjaxResult.CODE_TAG]
                const msg = result.data[AjaxResult.MSG_TAG]
                switch (code) {
                    case HttpStatus.SUCCESS:
                        const data = result.data[AjaxResult.DATA_TAG]
                        setSysUser(data)
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
        <div className='main'>
            <Sider />
            <div className='main-body'>
                <Header username={sysUser?.username} />
                <Content children={<Outlet />} />
            </div>
        </div>
    )
}

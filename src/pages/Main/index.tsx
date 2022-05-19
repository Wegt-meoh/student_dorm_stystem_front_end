import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import './index.css'
import Sider from '../../components/Sider'
import Header from '../../components/Header'
import Content from '../../components/Content'
import { AjaxResult } from '../../constant/contant'
import { message } from 'antd'
import { getInfo } from '../../api/request'
import { sessionCache } from '../../utils/cache'

export default function Main() {
    const [main, setMain] = useState<JSX.Element>()

    //get user info
    useEffect(() => {
        getInfo().then((result) => {
            const data = result.data[AjaxResult.DATA_TAG]
            try {
                setMain(<>
                    <Sider />
                    <div className='main-body'>
                        <Header username={data?.username} />
                        <Content children={<Outlet />} />
                    </div>
                </>)
                sessionCache.setJson('loginUser', data)
            } catch (error) {
                message.error('data format error check the server', 2)
            }
        })
    }, [])

    return (
        <div className='main'>
            {main}
        </div>
    )
}

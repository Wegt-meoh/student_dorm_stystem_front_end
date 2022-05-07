import { Layout, message } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'
import Footer from '../../components/Footer'
import { tokenAuth } from '../../api/tokenAuth'
import { getToken } from '../../utils/handleToken'



export default function Index() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!window.localStorage) {
            alert('your broswer do not support local storage')            
        } else {
            const token = getToken()
            if (token === null || token === undefined) {
                window.location.href='/app/login'
            } else {
                tokenAuth()
            }
        }
    }, [])

    return (
        <>
            <Layout>
                <Layout.Sider>
                    sider
                </Layout.Sider>
                <Layout>
                    <Layout.Header className='index-header'>
                        header
                    </Layout.Header>
                    <Layout.Content>
                        content
                    </Layout.Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    )
}

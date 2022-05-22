import React, { useState } from 'react'

import './index.css'
import { Input, Button, message, Form } from 'antd'
import { login } from '../../api/request'
import Footer from '../../components/Footer'
import { AjaxResult, UserConstant } from '../../constant/contant'
import { setToken } from '../../api/handleToken'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function onFinish(values: any) {
        const { studentNumber, password } = values
        setLoading(true)
        login(studentNumber, password).then((result) => {
            const msg: string = result.data[AjaxResult.MSG_TAG]
            const token: string = result.data[AjaxResult.TOKEN_TAG]
            setToken(token)
            message.success(msg, 1)
            navigate('/index')
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <>
            <div className='login-background'>
                <h1>学生宿舍管理系统</h1>
                <div className='login-content'>
                    <h1>用户登入</h1>
                    <Form onFinish={onFinish}>
                        <div className='login-board'>
                            <Form.Item
                                rules={[{ required: true, min: UserConstant.STUDENT_NUMBER_MIN_LENGTH, max: UserConstant.STUDENT_NUMBER_MAX_LENGTH }]}
                                name='studentNumber'>
                                <Input
                                    prefix={<UserOutlined />}
                                    allowClear={true}
                                    style={{ width: '300px' }}
                                    size='large'
                                    maxLength={UserConstant.STUDENT_NUMBER_MAX_LENGTH}
                                    minLength={UserConstant.STUDENT_NUMBER_MIN_LENGTH}
                                    autoComplete='off'
                                    type="text" />
                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true, min: UserConstant.PASSWORD_MIN_LENGTH, max: UserConstant.PASSWORD_MAX_LENGTH }]}
                                name='password'>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    autoComplete='off'
                                    style={{ width: '300px' }}
                                    allowClear={true}
                                    size='large'
                                    minLength={UserConstant.PASSWORD_MIN_LENGTH}
                                    maxLength={UserConstant.PASSWORD_MAX_LENGTH} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size='large'
                                    type='primary'
                                    className='login-button'
                                    loading={loading}
                                    disabled={loading}
                                    htmlType='submit'
                                    children='登入' />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

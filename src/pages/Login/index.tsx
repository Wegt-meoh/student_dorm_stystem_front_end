import React, { useState } from 'react'

import './index.css'
import { Input, Button, message, Form } from 'antd'
import { login } from '../../api/request'
import Footer from '../../components/Footer'
import { AjaxResult, HttpStatus, UserConstant } from '../../constant/contant'
import { setToken } from '../../utils/handleToken'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [studentNumber, setStudentNumber] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleLogin() {
        const hide = message.loading('login...', 0)
        login(studentNumber, password).then((result) => {
            hide()
            const code: number = result.data[AjaxResult.CODE_TAG]
            const msg: string = result.data[AjaxResult.MSG_TAG]
            console.log(result)
            switch (code) {
                case HttpStatus.SUCCESS:
                    const token: string = result.data[AjaxResult.TOKEN_TAG]
                    setToken(token)
                    message.success(msg, 1)
                    navigate('/index')
                    break
                case HttpStatus.UNAUTHORIZED:
                    message.info(msg, 2)
                    break
                case HttpStatus.ERROR:
                    message.error(msg, 2)
                    break
                default:
                    message.error('unknow situation code: ' + code + ', msg: ' + msg, 2)
            }
        }).catch((reason) => {
            hide()
            message.error('reason: ' + reason, 2)
        })
    }

    return (
        <>
            <div className='login-background'>
                <h1>学生宿舍管理系统</h1>
                <div className='login-content'>
                    <h1>用户登入</h1>
                    <Form>
                        <Input.Group size='large' className='login-board'>
                            <Input
                                allowClear={true}
                                maxLength={UserConstant.STUDENT_NUMBER_MAX_LENGTH}
                                minLength={UserConstant.STUDENT_NUMBER_MIN_LENGTH}
                                autoComplete='on'
                                prefix='studentNumber:'
                                type="text"
                                value={studentNumber}
                                onChange={e => setStudentNumber(e.target.value)} />
                            <Input.Password
                                autoComplete='on'
                                allowClear={true}
                                minLength={UserConstant.PASSWORD_MIN_LENGTH}
                                maxLength={UserConstant.PASSWORD_MAX_LENGTH}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                prefix='password:' />
                            <Button size='large' type='primary' className='login-button' onClick={handleLogin}>登入</Button>
                        </Input.Group>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

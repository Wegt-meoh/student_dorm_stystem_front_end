import React, { useState } from 'react'

import './index.css'
import { Input, Button, Radio } from 'antd'
import { login } from '../../api/login'
import Footer from '../../components/Footer'
import { UserConstant } from '../../constant/contant'



export default function Login() {
    const [studentNumber, setStudentNumber] = useState('')
    const [password, setPassword] = useState('')

    function handleClick() {
        login(studentNumber, password)
    }

    return (
        <>
            <div className='login-background'>
                <h1>学生宿舍管理系统</h1>
                <div className='login-content'>
                    <h1>用户登入</h1>
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
                        <Button size='large' type='primary' className='login-button' onClick={handleClick}>登入</Button>
                    </Input.Group>
                </div>
            </div>
            <Footer />
        </>
    )
}

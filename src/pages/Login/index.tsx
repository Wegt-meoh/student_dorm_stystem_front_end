import React, { useState } from 'react'

import './index.css'
import { Input, Button, Radio } from 'antd'
import { login } from '../../api/login'
import Footer from '../../components/Footer'



export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')

    function handleClick() {
        login(username, password, role, true)
    }

    return (
        <>
            <div className='login-background'>
                <h1>学生宿舍管理系统</h1>
                <div className='login-content'>
                    <h1>用户登入</h1>
                    <Input.Group size='large' className='login-board'>
                        <Input allowClear={true}
                            maxLength={32}
                            autoComplete='on'
                            prefix='username:' type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                        <Input.Password
                            autoComplete='on'
                            allowClear={true}
                            maxLength={32}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            prefix='password:' />
                        <Radio.Group className='login-role-radio' defaultValue={role} onChange={e => setRole(e.target.value)}>
                            <Radio value='admin'>管理员</Radio>
                            <Radio value='student'>学生</Radio>
                        </Radio.Group>
                        <Button size='large' type='primary' className='login-button' onClick={handleClick}>登入</Button>
                    </Input.Group>
                </div>
            </div>
            <Footer />
        </>
    )
}

import { Menu } from 'antd';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/antdMenuUtils';

import './index.css'


export default function Sider() {
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['index'])

    const items = [
        getItem(<Link onClick={() => {
            setSelectedKeys(['index'])
        }} to={'/index'}>首页</Link>, 'index', null),
        getItem(<Link onClick={() => {
            setSelectedKeys(['student'])
        }} to={'/student'}>学生信息</Link>, 'student', null),
        getItem(<Link onClick={() => {
            setSelectedKeys(['clean'])
        }} to={'/clean'}>卫生信息</Link>, 'clean'),
        getItem(<Link onClick={() => {
            setSelectedKeys(['maintain'])
        }} to={'/maintain'}>维修信息</Link>, 'maintain'),
    ]

    return (
        <div className='index-sider dark-bg-color'>
            <div className='sider-header' onClick={() => {
                navigate('/index')
                setSelectedKeys(['index'])
            }}>
                学生宿舍管理系统
            </div>
            <Menu theme='dark' items={items} selectedKeys={selectedKeys} />
        </div>
    )
}

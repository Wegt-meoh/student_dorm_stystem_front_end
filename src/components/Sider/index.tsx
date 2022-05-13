import { Menu } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from '../../utils/antdMenuUtils';

import './index.css'


export default function Sider() {
    const navigate = useNavigate()
    const items = [
        getItem(<Link to={'/student'}>学生信息</Link>, '1', null),
        getItem(<Link to={'/hygiene'}>卫生信息</Link>, '2'),
        getItem(<Link to={'/service'}>维修信息</Link>, '3'),
    ]

    return (
        <div className='index-sider dark-bg-color'>
            <div className='sider-header' onClick={() => { navigate('/index') }}>学生宿舍管理系统</div>
            <Menu theme='dark' items={items} />
        </div>
    )
}

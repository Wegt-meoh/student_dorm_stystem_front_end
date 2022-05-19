import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/request';
import { getItem } from '../../utils/antdMenuUtils';
import { removeToken } from '../../api/handleToken';

import './index.css'


interface HeaderProps {
    username?: string
}

export default function Header(props: HeaderProps) {
    const { username = 'unknow' } = props
    const navigate = useNavigate()
    const menu = (<Menu
        items={[
            getItem(<div>个人主页</div>, '1'),
            getItem(<div onClick={logOut}>退出登入</div>, '2')
        ]}
    />)

    function logOut() {
        logout().then(result => {
            message.success('登出成功', 2)
            removeToken()
            navigate('/app/login')            
        })        
    }

    return (
        <div className='index-header'>
            header
            <div className='right-menu'>
                <Dropdown overlay={menu} placement='bottomLeft' trigger={['hover']}>
                    <div style={{ cursor: 'pointer' }}>{username}<DownOutlined /></div>
                </Dropdown>
            </div>
        </div>
    )
}

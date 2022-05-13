import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd'
import React from 'react'
import { getItem } from '../../utils/antdMenuUtils';

import './index.css'



function handleMenuClick() {
    message.info('handleMenuClick', 2)
}

interface HeaderProps{
    username?:string
}

export default function Header(props:HeaderProps) {
    const {
        username='unknow'
    }=props
    const menu = (<Menu
        onClick={handleMenuClick}
        items={[
            getItem(<div>个人主页</div>, '1'),
            getItem(<div>退出登入</div>, '2')
        ]}
    />)


    return (
        <div className='index-header'>
            header
            <div className='right-menu'>
                <Dropdown overlay={menu} placement='bottomLeft' trigger={['hover']}>
                    <div style={{cursor:'pointer'}}>{username}<DownOutlined /></div>
                </Dropdown>
            </div>
        </div>
    )
}

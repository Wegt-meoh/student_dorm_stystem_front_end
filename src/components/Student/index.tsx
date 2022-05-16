import { Button, Modal, Space, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listUser } from '../../api/request'
import { AjaxResult } from '../../constant/contant'
import { SysUser } from '../../utils/customType'
import { getToken } from '../../utils/handleToken'

import './index.css'

interface UserDataItem extends Omit<SysUser, 'role' | 'dorm'> {
  key: React.Key
  roleKey: string
  dormNumber: string
  buildingNumber: string
  action: React.ReactElement
}

export default function Student() {
  const columns = [
    {
      title: '学号',
      key: 'studentNumber',
      dataIndex: 'studentNumber'
    },
    {
      title: '姓名',
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: '宿舍门牌号',
      key: 'dormNumber',
      dataIndex: 'dormNumber'
    },
    {
      title: '宿舍楼编号',
      key: 'buildingNumber',
      dataIndex: 'buildingNumber'
    },
    {
      title: '性别',
      key: 'sex',
      dataIndex: 'sex'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime'
    },
    {
      title: '角色',
      key: 'roleKey',
      dataIndex: 'roleKey'
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action'
    },
  ]
  const [studentData, setStudentData] = useState<Array<UserDataItem>>()
  const [loading, setLoading] = useState(true)
  const [modalVisible,setModalVisible]=useState(false)
  const navigate = useNavigate()

  //list user
  useEffect(() => {
    setLoading(true)
    const token = getToken()
    if (token === undefined) {
      navigate('/app/login')
    } else {
      listUser(token, 1, 2).then(result => {
        const code = result.data[AjaxResult.CODE_TAG]
        const rows: Array<any> = result.data[AjaxResult.ROWS_TAG]
        setStudentData(rows.map((i: SysUser) => {
          let item: UserDataItem = {
            ...i,
            key: i.userId,
            roleKey: i.role?.roleKey,
            buildingNumber: i.dorm?.buildingNumber,
            dormNumber: i.dorm?.dormNumber,
            action: <Space>
              <a>修改</a>
              <a>删除</a>
            </Space>
          }
          return item
        }))
        setLoading(false)
      }).catch(reason => {
        console.log(reason + '')
      })
    }
  }, [])

  return (
    <div>
      <Button type='primary' onClick={()=>{setModalVisible(true)}}>新增</Button>
      <Modal title='新增用户' visible={modalVisible} onCancel={()=>{setModalVisible(false)}}>
        <p>askldfjalksdfj</p>
        <p>askldfjalksdfj</p>
        <p>askldfjalksdfj</p>
      </Modal>
      <Table style={{ minWidth: '1000px' }} columns={columns} dataSource={studentData} loading={loading} />
    </div>
  )
}

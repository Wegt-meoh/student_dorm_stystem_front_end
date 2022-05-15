import { Space, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AjaxRequest, AjaxResult, ServiceUrl } from '../../constant/contant'
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
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const token = getToken()
    if (token === undefined) {
      navigate('/app/login')
    } else {
      axios({
        method: 'get',
        url: 'http://localhost:8000' + ServiceUrl.list,
        headers: { [AjaxRequest.HEADER_TOKEN_KEY]: token }
      }).then(result => {
        const code = result.data[AjaxResult.CODE_TAG]
        const rows: Array<any> = result.data[AjaxResult.ROWS_TAG]
        setStudentData(rows.map((i: SysUser) => {
          let item: UserDataItem = {
            ...i,
            key: i.userId,
            roleKey: i.role?.roleKey,
            buildingNumber: i.dorm?.buildingNumber,
            dormNumber: i.dorm?.dormNumber,
            action:<Space>
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
    <Table columns={columns} dataSource={studentData} loading={loading} />
  )
}

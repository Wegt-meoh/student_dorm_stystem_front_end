import { SyncOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Radio, Space, Table, TablePaginationConfig } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser, listUser } from '../../api/request'
import { AjaxResult } from '../../constant/contant'
import { SysUser } from '../../utils/customType'

import './index.css'

interface UserDataItem extends Omit<SysUser, 'role' | 'dorm'> {
  key: React.Key
  roleKey: string
  dormNumber: string
  buildingNumber: string
  action: React.ReactElement
}

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
    title: '性别',
    key: 'sex',
    dataIndex: 'sex'
  },
  {
    title: '电话号码',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber'
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

const formItemLayout = {
  labelCol: {
    xs: { span: 2 },
    sm: { span: 6 }
  }
}

export default function Student() {
  const [studentData, setStudentData] = useState<Array<UserDataItem>>()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    position: ['topLeft', 'bottomCenter'],
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => { return <span>共{total}条</span> },
    pageSizeOptions: [5, 10, 20],
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  function getUserData(pageNum: number, pageSize: number) {
    setLoading(true)
    listUser(pageNum, pageSize).then(result => {
      const total: number = result.data.total
      const rows: Array<any> = result.data[AjaxResult.ROWS_TAG]
      pagination.total = total
      setStudentData(rows.map((i: SysUser) => {
        let item: UserDataItem = {
          ...i,
          key: i.userId as React.Key,
          roleKey: i.role?.roleKey,
          buildingNumber: i.dorm?.buildingNumber,
          dormNumber: i.dorm?.dormNumber,
          action: <Space>
            <a onClick={() => { console.log(item.userId) }}>修改</a>
            <a>删除</a>
          </Space>
        }
        return item
      }))
    }).finally(() => {
      setLoading(false)
    })
  }

  //list user
  useEffect(() => {
    const { current, pageSize } = pagination
    if (current !== undefined && pageSize !== undefined) {
      getUserData(current, pageSize)
    }
  }, [pagination])

  function onFinish(values: any): void {
    const user: SysUser = {
      ...values,
      dorm: {
        dormId: undefined,
        dormNumber: values.dormNumber,
        buildingNumber: values.buildingNumber
      },
      role: {
        roleId: undefined,
        roleName: undefined,
        roleKey: values.roleKey
      },
    }
    addUser(user).then(result => {
      const msg = result.data[AjaxResult.MSG_TAG]
      message.success('msg: ' + msg)
      const { current, pageSize } = pagination
      if (current !== undefined && pageSize !== undefined) {
        getUserData(current, pageSize)
      }
      setModalVisible(false)
    })
  }

  function onTableChange(pagination: TablePaginationConfig) {
    setPagination({ ...pagination, showTotal: (total) => { return <span>共{total}条</span> } })
  }

  return (
    <div>
      <Space size='middle'>
        <Button type='primary' onClick={() => { setModalVisible(true) }}>新增</Button>
        <Button type='default' onClick={() => {
          const { current, pageSize } = pagination
          if (current !== undefined && pageSize !== undefined) {
            getUserData(current, pageSize)
          }
        }}>
          <SyncOutlined />
        </Button>
      </Space>
      <AddUserModal
        visible={modalVisible}
        onCancel={() => { setModalVisible(false) }}
        onOk={() => { form.submit() }}
        form={form}
        onFinish={onFinish} />
      <Table
        onChange={onTableChange}
        style={{ minWidth: '1000px' }}
        pagination={pagination}
        columns={columns}
        dataSource={studentData}
        loading={loading} />
    </div>
  )
}

function AddUserModal(props: any) {
  const { visible, onCancel, onOk, form, onFinish } = props

  return (
    <Modal
      title='新增用户'
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}>
      <Form form={form} {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          name='studentNumber'
          label='学号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='username'
          label='姓名'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='sex'
          label='性别'>
          <Radio.Group >
            <Space>
              <Radio value='男'>男</Radio>
              <Radio value='女'>女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          label='电话号码'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'>
          <Input.Password autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='dormNumber'
          label='宿舍门牌号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='buildingNumber'
          label='宿舍楼编号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='roleKey'
          label='角色'>
          <Radio.Group >
            <Space>
              <Radio value='admin'>管理员</Radio>
              <Radio value='student'>学生</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

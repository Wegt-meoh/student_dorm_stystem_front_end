import { SyncOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, FormProps, Input, message, Modal, ModalProps, Radio, Space, Table, TablePaginationConfig } from 'antd'
import { Callbacks } from 'rc-field-form/lib/interface'
import React, { useEffect, useState } from 'react'
import { addUser, deleteUser, listUser, updateUser } from '../../api/request'
import { AjaxResult, UserConstant } from '../../constant/contant'
import { SysDorm, SysRole, SysUser } from '../../utils/customType'
import { equalThenAfter } from '../../utils/formUtils'

import './index.css'

type UserFormItem = Omit<SysUser & SysRole & SysDorm, 'role' | 'dorm' | 'roleId' | 'dormId'>

interface UserTableItem extends UserFormItem {
  key: React.Key
  action: React.ReactElement
}

interface FormModalProps<T> extends ModalProps, Pick<FormProps, 'labelCol'> {
  defaultData?: T
  form: FormInstance<T>
  onFinish: Callbacks<T>['onFinish']
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
  const [studentData, setStudentData] = useState<Array<UserTableItem>>()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    position: ['topLeft', 'bottomCenter'],
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => { return <span>共{total}条</span> },
    pageSizeOptions: [5, 10, 20],
  })
  const [addUserModalVisible, setaddUserModalVisible] = useState(false)
  const [updateModalVisible, setUpdateVisible] = useState(false)
  const [addForm] = Form.useForm<UserFormItem>()
  const [updateForm] = Form.useForm<UserFormItem>()
  const [updateModalData, setUpdateModalData] = useState<UserFormItem>()

  function getPagedUserData() {
    const { current, pageSize } = pagination
    if (current === undefined || pageSize === undefined) {
      return
    }
    setLoading(true)
    listUser(current, pageSize).then(result => {
      const total: number = result.data.total
      const rows: Array<SysUser> = result.data[AjaxResult.ROWS_TAG]
      pagination.total = total
      setStudentData(rows.map((i) => {
        const formItem: UserFormItem = {
          ...i,
          roleKey: i.role?.roleKey,
          dormNumber: i.dorm?.dormNumber,
          buildingNumber: i.dorm?.buildingNumber,
          roleName: i.role?.roleName
        }
        const item: UserTableItem = {
          ...formItem,
          key: formItem.userId as number,
          action: <Space>
            <a onClick={() => {
              setUpdateModalData(formItem)
              setUpdateVisible(true)
            }}>修改</a>
            <a onClick={() => {
              if (i.userId !== undefined) {
                delUser(i.userId)
              }
            }}>删除</a>
          </Space>
        }
        return item
      }))
    }).finally(() => {
      setLoading(false)
    })
  }

  function delUser(userId: number) {
    deleteUser(userId).then(result => {
      const msg = result.data[AjaxResult.MSG_TAG]
      message.success(msg, 2)
      getPagedUserData()
    })
  }

  function addUserModalOnFinish(values: UserFormItem): void {
    const { dormNumber, buildingNumber, roleKey } = values
    const user: Partial<SysUser> = {
      ...values,
      dorm: (dormNumber !== undefined && buildingNumber !== undefined) ?
        { dormNumber, buildingNumber } as SysDorm : undefined,
      role: roleKey === undefined ?
        undefined : { roleKey } as SysRole
    }
    setaddUserModalVisible(false)
    addUser(user).then(result => {
      const msg = result.data[AjaxResult.MSG_TAG]
      message.success('msg: ' + msg)
      getPagedUserData()
    })
  }

  function updateUserModalOnFinish(values: UserFormItem): void {
    const roleKey = equalThenAfter(updateModalData?.roleKey, values.roleKey)
    const dormNumber = equalThenAfter(updateModalData?.dormNumber, values.dormNumber)
    const buildingNumber = equalThenAfter(updateModalData?.buildingNumber, values.buildingNumber)
    let user: Partial<SysUser> = {
      userId: updateModalData?.userId,
      username: equalThenAfter(updateModalData?.username, values.username),
      phoneNumber: equalThenAfter(updateModalData?.phoneNumber, values.phoneNumber),
      role: roleKey === undefined ?
        undefined : { roleKey } as SysRole,
      sex: equalThenAfter(updateModalData?.sex, values.sex),
      dorm: (dormNumber !== undefined && buildingNumber !== undefined) ?
        { buildingNumber, dormNumber } as SysDorm : undefined,
    }
    updateUser(user).then(result => {
      const msg = result.data[AjaxResult.MSG_TAG]
      message.success(msg)
      setUpdateVisible(false)
      getPagedUserData()
    })
  }

  useEffect(() => {
    getPagedUserData()
  }, [pagination])

  function onTableChange(pagination: TablePaginationConfig) {
    setPagination({ ...pagination, showTotal: (total) => { return <span>共{total}条</span> } })
  }

  return (
    <>
      <Space size='middle'>
        <Button type='primary' onClick={() => { setaddUserModalVisible(true) }}>新增</Button>
        <Button type='default' icon={<SyncOutlined />} onClick={getPagedUserData} />
      </Space>
      <Table
        onChange={onTableChange}
        style={{ minWidth: '1000px' }}
        pagination={pagination}
        columns={columns}
        dataSource={studentData}
        loading={loading} />
      <AddUserModal
        visible={addUserModalVisible}
        onCancel={() => { setaddUserModalVisible(false) }}
        onOk={addForm.submit}
        form={addForm}
        onFinish={addUserModalOnFinish}
        labelCol={formItemLayout.labelCol} />
      <UpdateUserModal
        visible={updateModalVisible}
        onCancel={() => { setUpdateVisible(false) }}
        onOk={updateForm.submit}
        form={updateForm}
        onFinish={updateUserModalOnFinish}
        defaultData={updateModalData}
        labelCol={formItemLayout.labelCol} />
    </>
  )
}

function UpdateUserModal(props: FormModalProps<UserFormItem>) {
  const { visible, onCancel, onOk, form, onFinish, defaultData, labelCol } = props
  const userData: UserFormItem | undefined = defaultData
  return (
    <Modal
      destroyOnClose={true}
      title='修改用户'
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}>
      <Form
        preserve={false}
        form={form}
        labelCol={labelCol}
        onFinish={onFinish}>
        <Form.Item
          hidden={true}
          name='userId'
          initialValue={userData?.userId}>
          <></>
        </Form.Item>
        <Form.Item
          name='studentNumber'
          initialValue={userData?.studentNumber}
          rules={[{ required: true, min: UserConstant.STUDENT_NUMBER_MIN_LENGTH, max: UserConstant.STUDENT_NUMBER_MAX_LENGTH }]}
          label='学号'>
          <Input type='text' disabled={true} />
        </Form.Item>
        <Form.Item
          name='username'
          initialValue={userData?.username}
          rules={[{ required: true, min: 1, max: 10 }]}
          label='姓名'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='sex'
          label='性别'
          initialValue={userData?.sex}>
          <Radio.Group >
            <Space>
              <Radio value='男'>男</Radio>
              <Radio value='女'>女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          initialValue={userData?.phoneNumber}
          name='phoneNumber'
          rules={[{ required: false, min: 6, max: 11 }]}
          label='电话号码'>
          <Input type='tel' />
        </Form.Item>
        <Form.Item
          rules={[{ required: false, min: 4, max: 16 }]}
          name='password'
          label='新密码'>
          <Input.Password autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='dormNumber'
          initialValue={userData?.dormNumber}
          label='宿舍门牌号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          initialValue={userData?.buildingNumber}
          name='buildingNumber'
          label='宿舍楼编号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='roleKey'
          initialValue={userData?.roleKey}
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

function AddUserModal(props: FormModalProps<UserFormItem>) {
  const { visible, onCancel, onOk, form, onFinish, labelCol } = props

  return (
    <Modal
      title='新增用户'
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}>
      <Form
        form={form}
        labelCol={labelCol}
        onFinish={onFinish}>
        <Form.Item
          name='studentNumber'
          rules={[{ required: true, min: UserConstant.STUDENT_NUMBER_MIN_LENGTH, max: UserConstant.STUDENT_NUMBER_MAX_LENGTH }]}
          label='学号'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='username'
          rules={[{ required: true, min: 1, max: 10 }]}
          label='姓名'>
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='sex'
          initialValue='男'
          label='性别'>
          <Radio.Group>
            <Space>
              <Radio value='男'>男</Radio>
              <Radio value='女'>女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          rules={[{ required: true, min: 6, max: 11 }]}
          label='电话号码'>
          <Input type='tel' />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, min: 4, max: 16 }]}
          initialValue='123456'
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
          <Radio.Group defaultValue='student'>
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

import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

import './index.css'


interface StudentDataType {
  studentName: string
  studentId: string
  dormNumber: string
  buildingNumber: string
}

const response = {
  code: '200',
  data: [
    { studentName: '张三', studentId: 'jkh45j', dormNumber: '310', buildingNumber: '15' },
    { studentName: '小李', studentId: 'jkh45j', dormNumber: '310', buildingNumber: '15' },
    { studentName: '王武', studentId: 'jkh45j', dormNumber: '310', buildingNumber: '15' },
    { studentName: '戴维', studentId: 'jkh45j', dormNumber: '310', buildingNumber: '15' }]
}

export default function Student() {
  const columns = [
    {
      title: '学号',
      key: 'studentId',
      dataIndex: 'studentId'
    },
    {
      title: '学生姓名',
      key: 'studentName',
      dataIndex: 'studentName'
    },
    {
      title: '宿舍编号',
      key: 'dormNumber',
      dataIndex: 'dormNumber'
    },
    {
      title: '宿舍楼编号',
      key: 'buildingNumber',
      dataIndex: 'buildingNumber'
    },
  ]
  const [studentData, setStudentData] = useState<Array<any>>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setStudentData(response.data.map((i, index) => {
        let t: any = { ...i }
        t.key = index
        return t
      }))
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Table columns={columns} dataSource={studentData} loading={loading} />
  )
}

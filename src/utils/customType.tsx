type nullish = undefined | null

interface SysDorm {
    dormId: number
    dormNumber: string
    buildingNumber: string
}

interface SysRole {
    roleId: number
    roleName: string
    roleKey: string
}

interface SysUser {
    username: string
    sex: string
    password: string
    createTime: string
    dorm: SysDorm
    role: SysRole
    phoneNumber: string
    studentNumber: string
    updateTime: string
    userId: number
}

export type { nullish, SysUser, SysRole, SysDorm }
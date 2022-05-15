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
    createTime: string
    dorm: SysDorm
    role: SysRole
    studentNumber: string
    updateTime: string
    userId: number
}

export type { nullish, SysUser, SysRole, SysDorm }
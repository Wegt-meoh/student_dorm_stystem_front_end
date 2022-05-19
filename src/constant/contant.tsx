/**
 * 响应状态码
 * @param SUCCESS 成功
 * @param UNAUTHORIZED 未授权
 * @param ERROR 服务器内部错误
 */
const HttpStatus = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    ERROR: 500
}

/**
 * 请求头键名 HEADER开头的会放在请求头里面，否则在请求体
 * @param HEADER_TOKEN_KEY:string token
 * @param PAGE_NUM:number 当前记录起始索引
 * @param PAGE_SIZE:number 每页显示多少数据
 * @param ORDER_BY_COLUMN:string 排序
 * @param IS_ASC:'desc'|'asc' 正序或者倒序
 * @param REASONABLE:boolean 参数合理化
 */
const AjaxRequest = {
    HEADER_TOKEN_KEY: 'Authorization',
    PAGE_NUM:'pageNum',
    PAGE_SIZE:'pageSize',
    ORDER_BY_COLUMN:'orderByColumn',
    IS_ASC:'isAsc',
    REASONABLE:'reasonable',
    HEADER_USE_TOKEN:'useToken'
}

/**
 * 响应体键名
 * @param CODE_TAG 状态码
 * @param MSG_TAG 消息
 * @param DATA_TAG 返回数据
 * @param TOKEN_TAG token
 * @param ROWS_TAG 返回列表数据
 */
const AjaxResult = {
    CODE_TAG: 'code',
    MSG_TAG: 'msg',
    DATA_TAG: 'data',
    TOKEN_TAG: 'token',
    ROWS_TAG:'rows'
}

const UserConstant = {
    STUDENT_NUMBER_MIN_LENGTH: 2,
    STUDENT_NUMBER_MAX_LENGTH: 20,
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 20
}

/**
 * 后端接口路径名
 * @param login 
 * @param getInfo 获取当前登陆用户的信息
 * @param list 查询用户信息
 */
const ServiceUrl={
    login:'/login',
    getInfo:'/getInfo',
    list:'/system/user/list',
    logout:'/logout',
    addUser:'/system/user/add',
    delUser:'/system/user/del',
}

/**
 * 存放在浏览器cache中的键名
 */
const cacheConstant = {
    TOKEN: 'login_token'
}

export { AjaxRequest, AjaxResult, HttpStatus, UserConstant, cacheConstant,ServiceUrl }
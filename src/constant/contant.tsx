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
 * @param HEADER_TOKEN_KEY token
 */
const AjaxRequest = {
    HEADER_TOKEN_KEY: 'Authorization'
}

/**
 * 响应体键名
 * @param CODE_TAG 状态码
 * @param MSG_TAG 消息
 * @param DATA_TAG 返回数据
 * @param TOKEN_TAG token
 */
const AjaxResult = {
    CODE_TAG: 'code',
    MSG_TAG: 'msg',
    DATA_TAG: 'data',
    TOKEN_TAG: 'token'
}

const UserConstant = {
    STUDENT_NUMBER_MIN_LENGTH: 2,
    STUDENT_NUMBER_MAX_LENGTH: 20,
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 20
}

/**
 * 存放在浏览器cache中的键名
 */
const cacheConstant = {
    TOKEN: 'login_token'
}

export { AjaxRequest, AjaxResult, HttpStatus, UserConstant, cacheConstant }
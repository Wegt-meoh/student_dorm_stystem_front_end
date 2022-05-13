const tokenHeaderKeyName: string = 'Authorization'

const HttpStatus = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    ERROR: 500
}

const AjaxResult = {
    CODE_TAG: 'code',
    MSG_TAG: 'msg',
    DATA_TAG: 'data'
}

const UserConstant = {
    STUDENT_NUMBER_MIN_LENGTH: 2,
    STUDENT_NUMBER_MAX_LENGTH: 20,
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 20
}

export { tokenHeaderKeyName, AjaxResult, HttpStatus ,UserConstant}
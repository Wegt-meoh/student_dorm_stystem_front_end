const tokenKey='login-token'

function getToken() {
    const tokenValue = localStorage.getItem(tokenKey)
    if (tokenValue === null) return undefined
    else return tokenValue
}

function setToken(tokenValue) {
    if(typeof tokenValue==='string') localStorage.setItem(tokenKey, tokenValue)    
}

function removeToken(){
    localStorage.removeItem(tokenKey)
}

export { getToken, setToken ,removeToken}
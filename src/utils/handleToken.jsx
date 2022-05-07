function getToken() {
    const tokenValue = localStorage.getItem('login-token')
    if (tokenValue === null) return undefined
    else return tokenValue
}

function setToken(tokenValue) {
    if(typeof tokenValue==='string') localStorage.setItem('login-token', tokenValue)    
}

function removeToken(){
    localStorage.removeItem('login-token')
}

export { getToken, setToken ,removeToken}
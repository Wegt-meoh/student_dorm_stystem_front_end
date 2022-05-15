import { cacheConstant } from "../constant/contant"
import { sessionCache } from "./cache"
import Cookies from 'js-cookie'

function getToken(): string | undefined {
    const tokenValue = Cookies.get(cacheConstant.TOKEN)
    if (typeof tokenValue === 'string') return tokenValue
    else return undefined
}

function setToken(tokenValue: string) {        
    Cookies.set(cacheConstant.TOKEN, tokenValue)
}

function removeToken(): void {
    Cookies.remove(cacheConstant.TOKEN)
}

export { getToken, setToken, removeToken }
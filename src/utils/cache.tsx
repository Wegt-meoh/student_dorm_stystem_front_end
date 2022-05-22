import { nullish } from "./customType"

const localStorageCache = {
    set(key: string, value: string): void {
        if (localStorage instanceof Object) {
            localStorage.setItem(key, value)
        }
    },
    get(key: string): string | nullish {
        if (localStorage instanceof Object) {
            return localStorage.getItem(key)
        } else {
            return undefined
        }
    },
    setJson(key: string, value: object): void {
        if (localStorage instanceof Object) {
            this.set(key, JSON.stringify(value))
        }
    },
    getJson(key: string): Object | undefined {
        if (localStorage instanceof Object) {
            const value = this.get(key)
            if (typeof value === 'string') {
                let obj: Object
                try {
                    obj = JSON.parse(value)
                    return obj

                } catch (error) {
                    console.log('localStorageCache getJson JSON.parse error')
                    return undefined
                }
            } else {
                return undefined
            }
        }
    },
    remove(key: string): void {
        if (localStorage instanceof Object) {
            localStorage.removeItem(key)
        }
    }
}

const sessionCache = {
    get(key: string): string | nullish {
        if (sessionStorage instanceof Object) {
            return sessionStorage.getItem(key)
        } else {
            return undefined
        }
    },
    set(key: string, value: string): void {
        if (sessionStorage instanceof Object) {
            sessionStorage.setItem(key, value)
        }
    },
    getJson(key: string): Object | nullish {
        if (sessionStorage instanceof Object) {
            const value = this.get(key)
            if (typeof value === 'string') {
                let obj: Object
                try {
                    obj = JSON.parse(value)
                    return obj
                } catch (error) {
                    console.log('sessionCache getJson JSON.parse error key=' + key)
                    return undefined
                }
            } else {
                return undefined
            }
        } else {
            return undefined
        }
    },
    setJson(key: string, value: Object): void {
        if (sessionStorage instanceof Object) {
            this.set(key, JSON.stringify(value))
        }
    },
    remove(key: string): void {
        if (sessionStorage instanceof Object) {
            sessionStorage.removeItem(key)
        }
    }
}

export { localStorageCache, sessionCache }
import {useCallback, useEffect, useState} from "react"

/** user local storage key **/
const storageName = 'userData'

export const useAuth = () => {

    /** token state **/
    const [token, setToken] = useState(null)

    /** user id state **/
    const [userId, setUserId] = useState(null)

    /** login function sets token and user id to localStorage **/
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    /** logout function removes token and login from localStorage **/
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    /** auth headers for http request **/
    const headers = () => {
        return {
            "authorization": `Bearer ${token}`,
            "Content-Type": 'Application/json'
        }
    }

    /** user autologin if localStorage contains user token **/
    useEffect(() => {
        const dataStr = localStorage.getItem(storageName)
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr)
                login(data.token, data.userId)
            }
            catch (e) {
                //TODO do something with user error
            }
        }
    }, [login])

    return { login, logout, token, userId, headers }
}
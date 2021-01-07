import {useCallback, useState, useContext} from 'react'
import {AuthContext} from "../context/AuthContext"

export const useHttp = () => {

    /** loading state **/
    const [loading, setLoading] = useState(false)

    const auth = useContext(AuthContext)

    /** server fetch **/
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        /** set loading state **/
        setLoading(true)

        /** if body exists **/
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        try {
            /** try fetch **/
            const res = await fetch(url, {
                method: method,
                body: body,
                headers: headers
            })

            /** parse data from server **/
            const data = await res.json()

            /** set loading state to false **/
            setLoading(false)

            /** if user has no auth token or it's expired **/
            if (res.status === 401) {
                auth.logout()
                throw new Error("No authorization")
            }

            /** if user has no access **/
            if (res.status === 403)
                throw new Error("Access forbidden")


            /** if status isn`t OK throw error **/
            if (!res.ok)
                throw new Error(data.message || 'something wrong')

            /** return data **/
            return data
        }
        catch (e) {
            /** anyway set loading state to false **/
            setLoading(false)

            throw e
        }
    }, [auth])

    return { loading, request }
}